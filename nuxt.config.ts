// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Replicate SAM-2 Clicker',
      link: [
        { rel: 'canonical', href: 'https://green-screen-creator.vercel.app' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ],
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        {
          name: 'viewport',
          content:
            'width=device-width,height=device-height,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0,viewport-fit=cover'
        },
        {
          name: 'description',
          content: 'SAM-2 image/video segmentation clicker app.'
        },
        {
          name: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'og:url',
          property: 'og:url',
          content: 'https://replicate-sam-2-clicker.vercel.app'
        },
        {
          name: 'og:site_name',
          property: 'og:site_name',
          content: 'replicate-sam-2-clicker.vercel.app'
        },
        {
          name: 'og:title',
          property: 'og:title',
          content: 'Replicate SAM-2 Clicker'
        },
        {
          name: 'og:description',
          property: 'og:description',
          content: 'SAM-2 image/video segmentation clicker app.'
        },
        {
          name: 'og:image',
          property: 'og:image',
          content: 'https://replicate-sam-2-clicker.vercel.app/cover.jpg'
        }
      ]
    }
  }
})
