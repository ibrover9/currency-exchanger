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
