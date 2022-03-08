module.exports = {
  publicPath: process.env.DEPLOY_URL,

  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableLegacy: undefined,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
}

console.log(`Deploy point: ${process.env.DEPLOY_URL}`);
