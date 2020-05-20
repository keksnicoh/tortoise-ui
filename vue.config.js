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
        target: "http://vps-ea1b2f2f.vps.ovh.net:8081/",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
      }
    }
  }
}