<template>
  <div class="captain-layout">
    <div class="layout-left-menu" style="padding-top: 12px;padding-left:8px;padding-right: 12px;padding-bottom:8px;">
      <MoudleMenuPage />
    </div>
    <div class="layout-content">
      <!-- <router-view /> -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name"  />
        </keep-alive>
      </router-view>
    </div>

  </div>
</template>
  
<script>

  import MoudleMenuPage from "./Menu.vue"

  export default {
    components:{
      MoudleMenuPage
    },
    data: () => ({
      
      isopen: false,

    }),
    created(){

    },
    methods:{

    }
  }
</script>
<style lang="scss">
.captain-layout{
  position: relative;
  padding-left: 200px;

  .layout-left-menu{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
  }

  .layout-content{
    padding: 12px 12px 120px 12px;
    height: 100vh;
    overflow: auto;
    background-color: #fff;

  }
}
</style>
  