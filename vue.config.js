const { defineConfig } = require('@vue/cli-service')

const timeStamp = new Date().getTime()

module.exports = defineConfig({
  publicPath:"./",  // apk 打包
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack:{
    output: {
      filename: `js/js[name].${timeStamp}.js`,
      chunkFilename: `js/chunk.[id].${timeStamp}.js`,
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    extract: {
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/chunk.[id].${timeStamp}.css`,
    }
  }
})
