import childProcess from 'node:child_process';
import { existsSync, mkdirSync, open, readFile, writeFileSync } from 'node:fs';
import { parse, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import * as envFile from 'envfile';
import YAML from 'yaml';

const TYPES = {
    ENV: 'env',
    JSON: 'json',
    YAML: 'yaml',
};

const ENVIRONMENTS = {
    LOCAL: 'local',
    DEV: 'development',
    STAGING: 'staging',
    QA: 'qa',
    PROD: 'production',
};

const WITH_ENV = {
    IN_FILE: 'in-file',
    IN_DIR: 'in-dir',
    IN_BOTH: 'in-both',
    NONE: 'none',
};

const FORMATS = {
    CAMEL_CASE: 'camel',
    SNAKE_CASE: 'snake',
    UPPER_SNAKE_CASE: 'upper-snake',
    KEBAB_CASE: 'kebab',
    PASCAL_CASE: 'pascal',
};

const CASES = {
    UPPER_CASE: 'uppercase',
    LOWER_CASE: 'lowercase',
    DEFAULT: 'default',
};

function main() {
    try {
        const args = resolveArgs();

        console.log(
            `Generating build info... \x1b[32m[${
                args.withEnv
                    ? 'ENV: \x1b[1m' + (process.env['NODE_ENV'] ?? ENVIRONMENTS.LOCAL) + '\x1b[0m\x1b[32m | '
                    : ''
            }MODE: \x1b[1m${args.type}\x1b[0m\x1b[32m]\x1b[0m`,
        );

        readSourceFile(args);
    } catch (err) {
        console.log(borderBottom());
        console.error(err);
    }
}

function resolveFilename(directory, filename, withEnv, env) {
    filename =
        withEnv === WITH_ENV.IN_FILE || withEnv === WITH_ENV.IN_BOTH
            ? `${parse(filename).name}.${env}${parse(filename).ext}`
            : filename;

    return resolve(directory, withEnv === WITH_ENV.IN_DIR || withEnv === WITH_ENV.IN_BOTH ? env : '', filename);
}

function readSourceFile(args) {
    args.file = resolveFilename(args.directory, args.filename, args.withEnv, args.env);

    open(args.file, (err, _fdesc) => {
        if (err) {
            writeFile(args);
        }

        readFile(args.file, { encoding: 'utf8', flag: 'a+' }, async (error, data) => {
            let contents = null;

            if (error) {
                console.log(borderBottom());
                throw error;
            }

            switch (args.type) {
                case TYPES.YAML:
                    contents = await getMetadata(args, YAML.parse(data));
                    break;
                case TYPES.JSON:
                    contents = await getMetadata(args, JSON.parse(data));
                    break;
                case TYPES.ENV:
                default:
                    contents = await getMetadata(args, envFile.parse(data));
                    break;
            }

            writeFile(args, contents);
        });
    });
}

async function getMetadata(args, content) {
    const buildInfo = await generateBuildInfo(args);

    showBuildInfo(buildInfo);

    Object.entries(buildInfo).map(([key, value]) => {
        const parsedKey = setVarName(`${args.prefix}${key}`, args.type, args.format, args.case);
        content[parsedKey] = value;
    });

    return content;
}

function writeFile(args, contents) {
    console.log(
        `Writing build info ${
            args.type === TYPES.ENV ? 'as .env file' : args.type === TYPES.JSON ? 'in JSON format' : 'in YAML format'
        }...`,
    );

    if (!existsSync(parse(args.file).dir)) {
        mkdirSync(parse(args.file).dir, { recursive: true });
    }

    writeFileSync(
        args.file,
        args.type === TYPES.ENV
            ? contents
                ? envFile.stringify(contents)
                : ''
            : args.type === TYPES.JSON
              ? JSON.stringify(contents ?? {}, null, 4)
              : YAML.stringify(contents ?? {}),
        { encoding: 'utf8', flag: 'w' },
    );

    console.log(`Successfully written build info in \x1b[1m\x1b[35m${args.file}\x1b[0m\n`);
}

async function generateBuildInfo(args) {
    const { default: pkgInfo } = await import(resolve(args.pkg), { assert: { type: 'json' } });

    return {
        name: pkgInfo.name,
        displayName: pkgInfo.displayName,
        description: pkgInfo.description,
        version: pkgInfo.version,
        timestamp: new Date().toISOString(),
        id: childProcess.execSync('git rev-parse --short HEAD').toString().trim(),
        env: args.env,
        debug: args.env === ENVIRONMENTS.LOCAL || args.env === ENVIRONMENTS.DEV,
    };
}

function showBuildInfo(buildInfo) {
    console.log(
        '\n\x1b[33m╭─┤\x1b[1m\x1b[36m BUILD INFO \x1b[0m\x1b[33m├─────────────────────────────────────────────────────────────────────────────────────────────────\n\x1b[33m│\x1b[0m',
    );

    Object.entries(buildInfo).forEach(([key, value]) => {
        console.log(`\x1b[33m│\x1b[0m \x1b[1m\x1b[36m${key}:\x1b[0m \x1b[34m${value}\x1b[0m`);
    });

    console.log(borderBottom());
}

function resolveArgs() {
    const { values } = parseArgs({
        options: {
            // Nombre del archivo donde se escribirá la metainformación. De manera predeterminada: .env
            filename: {
                type: 'string',
                short: 'f',
                default: '.env',
            },
            // Directorio de destino donde se escribirá el archivo de metainformación. Si se combina con --with-env,
            // agrega el ambiente indicado (o NODE_ENV si no se específicó ningún ambiente, o "local", en caso que no
            // se haya establecido tampoco NODE_ENV en la máquina donde se genere la metainformación) al directorio de
            // destino.
            directory: {
                type: 'string',
                short: 'd',
                default: './',
            },
            // Indica el ambiente para el cual se generará la metainformación: --env local. Si no se establece, se
            // intentará tomar NODE_ENV, o en caso de no estar definida la variable de ambiente en la máquina donde se
            // está generando la metainformación se usará: "local".
            env: {
                type: 'string',
                default: process.env.NODE_ENV ?? ENVIRONMENTS.LOCAL,
            },
            // Tipo de archivo de salida: .env | .json | .yaml
            type: {
                type: 'string',
                short: 't',
                default: TYPES.ENV,
            },
            // Agrega el ambiente a la ruta de destino donde se escribirá la metainformación. Por ejemplo, ruta sin
            // ambiente: /config && ambiente=development... --with-env true || -E true => /config/development/...
            'with-env': {
                type: 'string',
                short: 'E',
                default: WITH_ENV.NONE,
            },
            // Ruta y nombre del archivo de metainformación del proyecto (por defecto ./package.json).
            pkg: {
                type: 'string',
                short: 'P',
                default: './package.json',
            },
            // Se agrega un prefijo al nombre de las variables: -p build__ && nombre=valor => build__nombre=valor.
            prefix: {
                type: 'string',
                short: 'p',
                default: '',
            },
            // Indica si se deben escribir las variables en mayúscula. De manera predeterminada, se deja sin cambios.
            case: {
                type: 'string',
                short: 'c',
                default: CASES.DEFAULT,
            },
            // Tipo de convención para el nombre de las variables: camelCase | snake_case | kebab-case | PascalCase
            // De no especificarse, se toma snake_case si el tipo de salida es .env o camelCase en cualquier otro caso.
            format: {
                type: 'string',
                short: 'F',
                default: undefined,
            },
        },
    });

    return Object.fromEntries(
        Object.entries(values).map(([key, value]) => {
            let entry;

            switch (key) {
                case 'prefix':
                case 'directory':
                case 'file':
                    entry = [key, value];
                    break;
                case 'with-env':
                    entry = ['withEnv', value];
                    break;
                default:
                    entry = [key, value.toLowerCase()];
                    break;
            }

            return entry;
        }),
    );
}

/**
 * Establece el nombre de la variable, de acuerdo a los parámetros de entrada (configuración).
 * @param {string} name - Nombre de la variable.
 * @param {string} type - Indica el ambiente para el cual se está generando el nombre de la variable.
 * @param {string:CAMEL_CASE|SNAKE_CASE|KEBAB_CASE|PASCAL_CASE} nameCase - Formato del nombre de la variable
 * @param {string:UPPER_CASE|LOWER_CASE|DEFAULT} [uppercase=false] - Indica si el nombre de la variable debe pasarse a mayúsculas
 * @returns {Promise<string>} - El nombre de la variable, transformado, de acuerdo a los parámetros de entrada.
 */
function setVarName(name, type, nameCase, upperOrLowerCase = CASES.DEFAULT) {
    switch (nameCase) {
        case FORMATS.CAMEL_CASE:
            name = toCamelCase(name);
            break;
        case FORMATS.KEBAB_CASE:
            name = toKebabCase(name);
            break;
        case FORMATS.SNAKE_CASE:
            name = toSnakeCase(name);
            break;
        case FORMATS.PASCAL_CASE:
            name = toPascalCase(name);
            break;
        case FORMATS.UPPER_SNAKE_CASE:
            name = toSnakeCase(name).toUpperCase();
        // eslint-disable-next-line no-fallthrough
        default:
            if (type === TYPES.ENV) {
                name = toSnakeCase(name).toUpperCase();
            } else {
                name = toCamelCase(name);
            }
            break;
    }

    switch (upperOrLowerCase) {
        case CASES.UPPER_CASE:
            name = name.toUpperCase();
            break;
        case CASES.LOWER_CASE:
            name = name.toLowerCase();
            break;
        default:
            break;
    }

    return name;
}

/**
 * Convierte una cadena de caracteres en formato snake_case.
 *
 * @param {string} str - La cadena de caracteres a convertir.
 * @returns {string} - La cadena de caracteres convertida a formato snake_case.
 */
function toSnakeCase(str) {
    return (
        str &&
        str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((s) => s.toLowerCase())
            .join('_')
    );
}

/**
 * Convierte una cadena de caracteres en formato kebab-case.
 *
 * @param {string} str - La cadena de caracteres a convertir.
 * @returns {string} - La cadena de caracteres convertida a formato kebab-case.
 */
function toKebabCase(str) {
    return (
        str &&
        str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((s) => s.toLowerCase())
            .join('-')
    );
}

/**
 * Convierte una cadena de caracteres en formato camelCase.
 *
 * @param {string} str - La cadena de caracteres a convertir.
 * @returns {string} - La cadena de caracteres convertida a formato camelCase.
 */
function toCamelCase(str) {
    str = str
        // .toLowerCase() // 20230610: Se comenta para que no se convierta a minúsculas.
        .replace(/\s(.)/g, function ($1) {
            return $1.toUpperCase();
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });

    return str;
}

/**
 * Convierte una cadena de caracteres en formato PascalCase.
 *
 * @param {string} str - La cadena de caracteres a convertir.
 * @returns {string} - La cadena de caracteres convertida a formato PascalCase.
 */
function toPascalCase(str) {
    str = str.replace(/([A-Z])/g, '$1');
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function borderBottom() {
    return '\x1b[33m╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────\x1b[0m\n';
}

main();
