// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@pinia/nuxt',
        'nuxt-server-utils',
        '@sidebase/nuxt-auth',
    ],
    tailwindcss: {
        cssPath: '~/assets/css/main.css'
    },
    runtimeConfig: {
        MONGO_URI: process.env.MONGO_URI,
        authSecret: process.env.AUTH_SECRET,
    },
    nitro: {
        plugins: [
            '@/server/db/index.ts'
        ],
    },
    build: {
        transpile: ['@headlessui/vue', 'vue-toastification', '@headlessui/tailwindcss'],
    },
    auth: {
        baseURL: process.env.AUTH_ORIGIN,
        provider: {
          type: "authjs",
        },
      },
})
