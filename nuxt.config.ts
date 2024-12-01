// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt", "@nuxt/content", "@nuxt/icon"],
  ssr: false,
  srcDir: "src/",
  icon: {
    provider: "server",
    customCollections: [
      {
        prefix: "my",
        dir: "./src/assets/icons",
      },
    ],
  },
});
