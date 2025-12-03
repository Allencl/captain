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
  },
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: "./",
      builderOptions:{
        // productName:"SINOBOOM112",    // 项目名（exe 文件的前缀名)
        nsis: {
          // oneClick: false, // 是否一键安装
          // allowToChangeInstallationDirectory: true, //是否允许修改安装目录
          uninstallerIcon: "./public/logo.ico",//卸载时图标
        },
        win:{
          // version: '1.2.3',      // 版本号
          // artifactName: '${productName}-${platform}-${arch}-11.22.55.${ext}',
          icon: './public/logo.ico',   // 安装时的图标
          target: "nsis"

        }
      },
    }
  }
})
