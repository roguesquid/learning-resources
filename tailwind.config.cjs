/** @type {import('tailwindcss').Config}*/
const config = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}',
    ],
    plugins: [require('flowbite/plugin'), require('tailwind-scrollbar')],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FFF5F2',
                    100: '#FFF1EE',
                    200: '#FFE4DE',
                    300: '#FFD5CC',
                    400: '#FFBCAD',
                    500: '#FE795D',
                    600: '#EF562F',
                    700: '#EB4F27',
                    800: '#CC4522',
                    900: '#A5371B',
                },
            },
        },
    },
};

module.exports = config;
