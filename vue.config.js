module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/sass/style.scss";',
      },
    },
  }
}