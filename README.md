# learning-resources

Catálogo de Recursos de Aprendizaje del Centro de Estudios en Línea (CEL) de la Universidad Católica Andrés Bello (UCAB).

# Buscador de Recursos de Aprendizaje

Este proyecto es un buscador de recursos de aprendizaje interactivo, desarrollado con **SvelteKit**, **JavaScript** y **TypeScript**. Permite a los usuarios buscar, filtrar y visualizar descripciones detalladas de diversos recursos educativos. Aunque actualmente funciona como una aplicación web independiente, el objetivo es transformarlo en un plugin de WordPress utilizando el adaptador estático de SvelteKit.

---

## Características

* **Búsqueda de Recursos:** Encuentra recursos específicos utilizando una barra de búsqueda intuitiva.
* **Filtrado Avanzado:** Refina los resultados de búsqueda aplicando diversos filtros.
* **Detalles del Recurso:** Al seleccionar un recurso, se muestra una descripción completa y detallada del mismo.

---

## Próximos Pasos

La meta principal de este proyecto es su conversión a un plugin de WordPress. Esto se logrará mediante la compilación de la aplicación SvelteKit a archivos estáticos utilizando el adaptador estático de SvelteKit, lo que permitirá su integración en el ecosistema de WordPress.

---

## Configuración y Ejecución

Para poner en marcha este proyecto, sigue los siguientes pasos:

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) (o npm/yarn si lo prefieres, pero pnpm es el gestor de paquetes preferido para este proyecto).

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```
2.  Instala las dependencias:
    ```bash
    pnpm install
    ```

### Scripts Disponibles

Aquí tienes los comandos que puedes utilizar para desarrollar y construir la aplicación:

* **`pnpm dev`**: Inicia el servidor de desarrollo. La aplicación estará disponible en `http://localhost:5173` (o el puerto que se indique en la consola). Este comando también genera información de compilación necesaria.
    ```bash
    pnpm dev
    ```
* **`pnpm build`**: Compila la aplicación para producción. Los archivos estáticos se generarán en la carpeta `build/` (o la configurada en `svelte.config.js`). Este es el comando clave para preparar la aplicación para el despliegue como plugin de WordPress.
    ```bash
    pnpm build
    ```
---
