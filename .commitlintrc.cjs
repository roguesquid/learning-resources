const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let packages = ['devcontainer', 'app'];

// @tip: git branch name = feature/#33   =>    auto get defaultIssues = #33
const issue = execSync('git rev-parse --abbrev-ref HEAD').toString().trim().split('#')[1];

/** @type {import('cz-git').UserConfig} */
module.exports = {
    rules: {
        'body-max-line-length': [2, 'always', 100],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],
        'header-max-length': [2, 'always', 100],
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'type-case': [2, 'always', 'sentence-case'],
        'scope-enum': [2, 'always', [...packages]],
    },
    prompt: {
        alias: { fd: 'docs: Se corrigen errores de tipeo' },
        messages: {
            type: 'Seleccione el tipo de cambio que se desea realizar en este commit:',
            scope: 'Indique el ÁMBITO (SCOPE) del cambio (opcional):',
            customScope: 'Indique el ÁMBITO (SCOPE) de este cambio:',
            subject: 'Escriba una descripción CORTA e IMPERATIVA sobre el cambio:\n',
            body: 'Proporcione una descripción LARGA del cambio (opcional). Use "|" si desea separar en nuevas líneas:\n',
            breaking:
                'Liste los "BREAKING CHANGES" (opcional). Use "|" si desea separar los cambios en nuevas líneas:\n',
            footerPrefixsSelect:
                'Seleccione los tipos de INCIDENCIAS (ISSUES) de la lista de cambios asociados a este cambio (opcional):',
            customFooterPrefixs: 'Introduzca el prefijo de las INCIDENCIAS (ISSUES):',
            footer: 'Enumere cualquier INCIDENCIA (ISSUES) asociada a este cambio. p.ej.: #31, #34:\n',
            confirmCommit: '¿Está seguro que se desean persistir los cambios en el repositorio?',
        },
        types: [
            { value: 'feat', name: 'feat:     ✨  Adición de una nueva característica (feature)', emoji: ':sparkles:' },
            { value: 'fix', name: 'fix:      🐛  Corrección de un bug', emoji: ':bug:' },
            { value: 'docs', name: 'docs:     📝  Cambios realizados sólo en la documentación', emoji: ':memo:' },
            {
                value: 'style',
                name: 'style:    💄  Cambios que no afectan la lógica del código fuente',
                emoji: ':lipstick:',
            },
            {
                value: 'refactor',
                name: 'refactor: ♻️   Refactorización del código: cambios que no corresponden ni a ajustes por bugs ni adición de nuevas características',
                emoji: ':recycle:',
            },
            { value: 'perf', name: 'perf:     ⚡️  Cambios en el código que mejoran el rendimiento', emoji: ':zap:' },
            {
                value: 'test',
                name: 'test:     ✅  Adición de pruebas omitidas en su momento o corrección de las ya existentes',
                emoji: ':white_check_mark:',
            },
            {
                value: 'build',
                name: "build:    📦️  Cambios que afectan el sistema de 'build' o adición de dependencias externas",
                emoji: ':package:',
            },
            {
                value: 'ci',
                name: 'ci:       🎡  Cambios a la configuración de los archivos y scripts asociados a la integración continua (CI)',
                emoji: ':ferris_wheel:',
            },
            {
                value: 'chore',
                name: 'chore:    🔨  Otros cambios que no modifican el código fuente o de prueba (src o test)',
                emoji: ':hammer:',
            },
            { value: 'revert', name: "revert:   ⏪️  Revierte un 'commit' realizado previamente", emoji: ':rewind:' },
        ],
        useEmoji: true,
        emojiAlign: 'center',
        themeColorCode: '',
        scopes: [...packages],
        allowCustomScopes: true,
        allowEmptyScopes: true,
        customScopesAlign: 'bottom',
        customScopesAlias: 'Personalizado',
        emptyScopesAlias: 'Vacío (Sin ÁMBITO/SCOPE)',
        upperCaseSubject: true,
        markBreakingChangeMode: false,
        allowBreakingChanges: ['feat', 'fix'],
        breaklineNumber: 100,
        breaklineChar: '|',
        skipQuestions: [],
        issuePrefixs: [
            {
                value: 'wip',
                name: 'WIP:   Trabajo en proceso (Work in progress) sobre la(s) INCIDENCIA(S) reportada(s).',
            },
            { value: 'closed', name: 'CERRADA:   La(s) INCIDENCIA(S) ha(n) sido procesada(s)' },
        ],
        customIssuePrefixsAlign: !issue ? 'top' : 'bottom',
        emptyIssuePrefixsAlias: 'Ninguno',
        customIssuePrefixsAlias: 'Personalizar',
        allowCustomIssuePrefixs: true,
        allowEmptyIssuePrefixs: true,
        confirmColorize: true,
        maxHeaderLength: 100,
        maxSubjectLength: Infinity,
        minSubjectLength: 0,
        scopeOverrides: undefined,
        defaultBody: '',
        defaultIssues: !issue ? '' : `#${issue}`,
        defaultScope: '',
        defaultSubject: '',
    },
};
