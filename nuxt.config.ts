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
  content: {
    markdown: {
      remarkPlugins: {
        "remark-math": {},
      },
      rehypePlugins: ["rehype-katex"],
    },
    highlight: {
      theme: {
        default: "one-light",
        dark: "one-dark-pro",
        sepia: "monokai",
      },
      langs: [
        "json",
        "js",
        "ts",
        "html",
        "css",
        "vue",
        "shell",
        "mdc",
        "md",
        "yaml",
        "c",
        "c++",
        "java",
        "kotlin",
        "cmake",
        "go",
        "lua",
        "py",
        "bash",
      ],
    },
  },
});
