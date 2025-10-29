<template>
  <div id="app" >
    <v-app>

      <a-config-provider >

        <LayoutPage  />

      </a-config-provider>

    </v-app>
  </div>
</template>
<script>

  import LayoutPage from '@/layout/Layout.vue'


  export default {
    components:{
      LayoutPage
    },
    data: () => ({ 
      time:55,
      showNo:false,
      active:false,
      intervalBox:undefined

    }),
    created(){


    },
    beforeDestroy() {
      localStorage.setItem("bufferActive","0")
    },
    methods:{

    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

html{
  overflow: hidden;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
