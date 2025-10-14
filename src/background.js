'use strict'

import { app, protocol, BrowserWindow, ipcMain,Notification } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require("path");


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1390,
    height: 833,
    autoHideMenuBar:true,   // 隐藏菜单

    // icon:  process.env.BASE_URL + '/public/favicon.ico', // 设置图标路径
    webPreferences: {

      webSecurity: false,  // 

      nodeIntegration: true,  // 开启nodec环境
      contextIsolation: false
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }


  // 图标闪烁
  ipcMain.on('flashFrameFunction', (event,option={}) => {
    win.flashFrame(true); // 开始闪烁图标
  })  


  // 消息通知
  ipcMain.on('notificationFunc', (event,option={}) => {

    new Notification({
      icon: path.join(__dirname, isDevelopment ? '../src/assets/image.png' : './image.png'  ), // icon
      title: "captain-"+option.time,
      body: option.time
    }).show()

  })


  // 获取App path
  ipcMain.on('getAppPathFunc', (event,option={}) => {

      let _list33=[]

      for (let index = 0; index < option.filePath.length; index++) {

        if(isDevelopment){

          _list33.push( option.filePath[index] )

        }else{

          // 拼接 public/map3/a.wav 在打包后的实际路径
          const audioPath = path.join(__dirname, './'+ option.filePath[index]  ) 
          _list33.push( audioPath )
        }

      }
    
      win.webContents.send('reply-from-main', {
        pathList:_list33,
        idKey: option.idKey
      });
      


  })


}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
