const path = require('path')
const name = '物流'

module.exports = {
  publicPath: '/',
  // publicPath:
  //   process.env.NODE_ENV === 'production'
  //     ? '/vue-typescript-admin-template/'
  //     : '/', // TODO: Remember to change this to fit your need
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    port: 8080,
    open: false,
    // overlay: {
    // warnings: false,
    // errors: true,
    // },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  }
}
