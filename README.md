# learning-resources

Catálogo de Recursos de Aprendizaje del Centro de Estudios en Línea (CEL) de la Universidad Católica Andrés Bello (UCAB).

# Buscador de Recursos de Aprendizaje

Este proyecto es un buscador de recursos de aprendizaje interactivo, desarrollado con **SvelteKit**, **JavaScript** y **TypeScript**. Permite a los usuarios buscar, filtrar y visualizar descripciones detalladas de diversos recursos educativos. Aunque actualmente funciona como una aplicación web independiente, el objetivo es transformarlo en un plugin de WordPress utilizando el adaptador estático de SvelteKit.

**Dependencia de la API de WordPress:** Esta aplicación consume los recursos de aprendizaje directamente desde la API de WordPress. Durante el desarrollo y las pruebas, se ha utilizado una instancia de WordPress ejecutándose en un contenedor Docker local que tiene configurado tanto los Custom Post Type como las Custom Taxonomies requeridas para funcionar.

---

## Características

* **Búsqueda de Recursos:** Encuentra recursos específicos utilizando una barra de búsqueda intuitiva.
* **Filtrado Avanzado:** Refina los resultados de búsqueda aplicando diversos filtros.
* **Detalles del Recurso:** Al seleccionar un recurso, se muestra una descripción completa y detallada del mismo.
* **Desarrollado con SvelteKit:** Aprovecha la reactividad y el rendimiento de SvelteKit para una experiencia de usuario fluida.
* **TypeScript:** Garantiza un código más robusto y fácil de mantener.
* **Integración con API de WordPress:** Obtiene los recursos de aprendizaje directamente desde una instancia de WordPress.

---

## Próximos Pasos

La meta principal de este proyecto es su conversión a un plugin de WordPress. Esto se logrará mediante la compilación de la aplicación SvelteKit a archivos estáticos utilizando el adaptador estático de SvelteKit, lo que permitirá su integración en el ecosistema de WordPress.

---

## Configuración y Ejecución

Para poner en marcha este proyecto, sigue los siguientes pasos:

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) (o npm/yarn si lo prefieres, pero pnpm es el gestor de paquetes preferido para este proyecto).

Además, para que la aplicación funcione correctamente, **necesitas una instancia de WordPress ejecutándose y accesible**. Durante el desarrollo, se ha utilizado **Docker** para levantar un entorno de WordPress local.

### Configuración de la API de WordPress

La aplicación está configurada para consumir la API de WordPress desde `http://localhost:8000`. Esta URL corresponde a la dirección base de una instancia de WordPress ejecutándose en un contenedor Docker local.

**Pasos para configurar WordPress localmente (con Docker):**

1.  Asegúrate de tener [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.
2.  (Opcional, pero recomendado) Si no tienes un `docker-compose.yml` para WordPress, puedes crear uno simple:
    ```yaml
    # docker-compose.yml
    version: '3.8'
    services:
      wordpress:
        image: wordpress:latest
        ports:
          - "8000:80"
        environment:
          WORDPRESS_DB_HOST: db
          WORDPRESS_DB_USER: wordpress
          WORDPRESS_DB_PASSWORD: wordpress
          WORDPRESS_DB_NAME: wordpress
        volumes:
          - ./wp-content:/var/www/html/wp-content
      db:
        image: mysql:5.7
        environment:
          MYSQL_ROOT_PASSWORD: wordpress
          MYSQL_DATABASE: wordpress
          MYSQL_USER: wordpress
          MYSQL_PASSWORD: wordpress
        volumes:
          - db_data:/var/lib/mysql

    volumes:
      db_data:
    ```
3.  Levanta el contenedor de WordPress:
    ```bash
    docker-compose up -d
    ```
    Esto iniciará WordPress en `http://localhost:8000`. Asegúrate de que los recursos de aprendizaje que la aplicación espera consumir estén creados y disponibles en tu instancia de WordPress.

### Instalación del Proyecto

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/roguesquid/learning-resources
    cd learning-resources
    ```
2.  Instala las dependencias:
    ```bash
    pnpm install
    ```

### Scripts Disponibles

Aquí tienes los comandos que puedes utilizar para desarrollar y construir la aplicación:

* **`pnpm dev`**: Inicia el servidor de desarrollo. La aplicación estará disponible en `http://localhost:5173` (o el puerto que se indique en la consola). **Asegúrate de que tu instancia de WordPress esté ejecutándose en `http://localhost:8000` para que la aplicación pueda consumir los datos.** Este comando también genera información de compilación necesaria.
    ```bash
    pnpm dev
    ```
---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor, sigue estos pasos:

1.  Haz un "fork" de este repositorio.
2.  Crea una nueva rama para tus cambios (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y asegúrate de que el código pase las pruebas de linting y formato (`pnpm lint` y `pnpm format`).
4.  Haz "commit" de tus cambios (`pnpm commit`).
5.  Sube tu rama (`git push origin feature/nueva-funcionalidad`).
6.  Abre un "pull request" explicando tus cambios.

---
