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

      if(this.intervalBox){
        clearInterval(this.intervalBox)
      }

      this.$nextTick(()=>{
        this.intervalBox = setInterval(()=>{
          const _active=localStorage.getItem("bufferSwitch001")=='true'?true:false
          const _time= Number( localStorage.getItem("bufferNumber001")||"55" )
          const _Minutes=new Date().getMinutes()
          if(_Minutes==Number(_time)){
            if(!this.showNo && _active){
              this.messageFunc()
            }
          }else{
            this.showNo=false
          }
        },10000)
      })
    },
    beforeDestroy() {
      // 组件销毁前清除定时器
      if(this.intervalBox){
        clearInterval(this.intervalBox)
      }
    },
    methods:{
      messageFunc(){
            const _Hours=new Date().getHours()
            this.showNo=true
            Notification.requestPermission().then(function(result) {
                if (result === 'denied') {
                    console.log('用户拒绝');
                    return;
                }
                if (result === 'default') {
                    console.log('用户未授权');
                    return;
                }
                // 同意通知
                new Notification(`小时循环! ${_Hours+1}`,{
                    requireInteraction:true,
                    tag:1,
                    renotify: true,
                    image: require('@/assets/sailboat.png')
                });
            });
        },
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
