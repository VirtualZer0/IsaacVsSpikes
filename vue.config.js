module.exports = {
  publicPath: '/',

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/vars.scss";'
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
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
  },

  pwa: {
    name: 'Isaac VS Spikes'
  }
}

console.log(`Deploy point: /`);
