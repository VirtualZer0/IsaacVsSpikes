module.exports = {
  publicPath: process.env.DEPLOY_URL,

  css: {
    loaderOptions: {
      css: {
        url: false,
      },
      sass: {
        additionalData: '@import "@/assets/styles/vars.scss";',
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: undefined,
      enableLegacy: undefined,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },

  configureWebpack: {
    experiments: {
      topLevelAwait: true,
    },
  },

  pwa: {
    name: 'Isaac VS Spikes',
  },
};

console.log(`Deploy point: ${process.env.DEPLOY_URL}`);
