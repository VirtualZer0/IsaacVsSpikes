module.exports = {
  publicPath: process.env.DEPLOY_URL,

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: undefined,
      localeDir: undefined,
      enableLegacy: undefined,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    },
  },

  configureWebpack: {
    experiments: {
      topLevelAwait: true
    },
  }
}

console.log(`Deploy point: ${process.env.DEPLOY_URL}`);
