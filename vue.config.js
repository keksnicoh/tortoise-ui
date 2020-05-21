const webpack = require('webpack');
const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    resolve: {
      alias: {
        src: resolveSrc('src'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.TORTOISE_UI_PROXY_TARGET,
        changeOrigin: true,
        logLevel: process.env.TORTOISE_UI_PROXY_LOG_LEVEL,
        pathRewrite: { "^/api": "/" },
        auth: process.env.TORTOISE_UI_PROXY_AUTH
      }
    }
  }
}
