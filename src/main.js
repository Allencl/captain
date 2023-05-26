// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'
import store from './store'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



// style
import '@/styles/index.less'
import {ThemeColors} from '@/config.js'



// theme
const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    primary: ThemeColors,
  }
}



const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      }
    }
})

import antDesignVue from 'ant-design-vue';
import 'ant-design-vue/dist/antd.variable.min.css'

import { ConfigProvider } from 'ant-design-vue';

ConfigProvider.config({
  theme: {
    primaryColor: ThemeColors,
  },
});

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"



const toastOptions={
  maxToasts: 5,
}

import VueApexCharts from "vue3-apexcharts"

const app=createApp(App)
.use(store)
.use(router)
.use(vuetify)
.use(Toast,toastOptions)
.use(antDesignVue)
.use(VueApexCharts)


// mitt
import mitt from "mitt"
const emitter = mitt()
app.config.globalProperties.$emitter = emitter




app.mount('#app')

