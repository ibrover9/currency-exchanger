// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   devtools: { enabled: true }
// })
export default {
  devtools: { enabled: true },
  build: {
    loaders: {
      scss: {
        implementation: require("sass"),
      },
    },
  },
  css: ["~/assets/main.scss"],
};
