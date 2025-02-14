<template>
    <v-card
      width="200"
      class="captain-menu-card"
      elevation="2"
    >

      <v-list
        :lines="false"
        density="compact"
        nav
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          active-color="#81C784"
          @click="itemHandle(item)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
 
    </v-card>
</template>
<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'home', icon: 'mdi-home-assistant' ,path:'/home' },
        { text: 'computer', icon: 'mdi-desktop-classic', path:"/computer" },
        // { text: '消息', icon: 'mdi-bell-badge', path:"/message" },
        // { text: 'FORX', icon: 'mdi-airplane', path:"/forx" },


        // { text: 'Shared with me', icon: 'mdi-account-multiple' },
        // { text: 'Starred', icon: 'mdi-star' },
        // { text: 'Recent', icon: 'mdi-history' },
        // { text: 'Offline', icon: 'mdi-check-circle' },
        // { text: 'Uploads', icon: 'mdi-upload' },
        // { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
    }),
    methods:{
        itemHandle(option){
            this.$router.push(option.path)
        }
    }
  }
</script>
<style lang="less">
.captain-menu-card{
    border-radius: 0px;
    height: 100%;
    .v-navigation-drawer {
        padding: 0px;
        border-right-style: dashed;
        border-radius: 0px;
        height: 100vh;
    }
}

</style>