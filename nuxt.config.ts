// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "Replicate SAM-2 Clicker",
      link: [
        { rel: "canonical", href: "https://green-screen-creator.vercel.app" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      ],
    },
  },
});
