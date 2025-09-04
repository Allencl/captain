<template>
    <v-card
      max-width="800"
      elevation="2"
    >
      <v-card-text>
        <div style="height: 16px;"></div>
        <v-icon style="font-size: 33px;margin-bottom: 22px;color: #81C784;">mdi-sail-boat</v-icon>
        <!-- <p class="text-h4 text--primary">
          oh captain my captain
        </p> -->

        <h1 style="color: rgba(0, 0, 0, .87);font-size: 22px;font-family: Roboto, sans-serif;line-height: 1.5;"> oh captain my captain </h1>


        <div @click="changeFunc" style="cursor: pointer;z-index:11;right:18px;top:32px;position: absolute;text-align: center;display: inline-block;">
          <div v-if="!isopen" style="display: inline-block;width:80px;height:80px;background-color:#CFD8DC;line-height: 80px;border-radius:100%;">
            <span style="font-size: 22px;font-family: Roboto, sans-serif;line-height: 80px;color: #fff;">关闭</span>
          </div>
          <div v-if="isopen" style="display: inline-block;width:80px;height:80px;background-color:#81C784;line-height: 80px;border-radius:100%;">
            <span style="font-size: 22px;font-family: Roboto, sans-serif;line-height:80px;color: #fff;">打开</span>
          </div>
        </div>

      
        <!-- <h1 @click="test1">测试1</h1>  -->

      </v-card-text>
    </v-card>

    <!-- <div style="margin-top: 12px;"></div>
    <v-card
      max-width="800"
      elevation="2"
    >

      <div class="btn-box-1123" style="padding: 18px 16px;">

        <div v-for="(o,i) in btnActiveList" :key="i" :class="`li-223 color-${o.active}`">
          <p @click="topClickFunc('text',o)">{{ o.lable }}</p>
          <v-icon
            @click="topClickFunc('top',o)"
            class="icon-up"
            icon="mdi-arrow-top-right-thick"
          ></v-icon>
          <v-icon
            @click="topClickFunc('bottom',o)"
            class="icon-down"
            icon="mdi-arrow-bottom-right-thick"
          ></v-icon>
        </div>

      </div>

    </v-card> -->



</template>
<script>

  import moment from 'moment'


  export default {
    data: () => ({
      isopen: false,
      nowMinutes:"",  


    
      // 按钮组
      btnActiveList:[
        {
          lable:"NQ", 
          active:"0"
        },
        {
          lable:"Gold", 
          active:"0"
        },
        {
          lable:"USD", 
          active:"0"
        },
        {
          lable:"JPY", 
          active:"0"
        },
        {
          lable:"铜", 
          active:"0"
        }
      ]

    }),
    created(){

      const that=this

      const acrive = localStorage.getItem("bufferActive")
      this.isopen= acrive=="1" ?true:false


      this.$nextTick(()=>{
        if(this.isopen){
          this.initFunc()
        }

        // 按钮初始化
        const _bufferBtnList6=JSON.parse( (localStorage.getItem("bufferBtnList6")||'[]') )
        if(_bufferBtnList6.length){
          this.btnActiveList=_bufferBtnList6
        }
      })

    },
    methods:{
      test1(){
        const { ipcRenderer } = window.require('electron');   
        var str = moment().format('YYYY/MM/DD HH:mm:ss');   

        // const now = new Date();



        ipcRenderer.send("notificationFunc",{
          time:str
        });
      },
      // 按钮切换 上
      topClickFunc(active,item){

        let _list6=JSON.parse( JSON.stringify(this.btnActiveList) )
        let _newList=[]

        switch (active) {
          case "top":
            _newList=_list6.map(o=>{
              if( o.lable == item.lable ){
                o.active="1"
              }

              return o
            })
            break;

          case "bottom":
            _newList=_list6.map(o=>{
              if( o.lable == item.lable ){
                o.active="2"
              }

              return o
            })
            break;

          case "text":
            _newList=_list6.map(o=>{
              if( o.lable == item.lable ){
                o.active="0"
              }

              return o
            })
            break;

        
          default:
            break;
        }


        this.$nextTick(()=>{
          this.btnActiveList=_newList
          localStorage.setItem("bufferBtnList6", JSON.stringify(_newList) )
        })

      },

      initFunc(){

        const that=this
        const { ipcRenderer } = window.require('electron');   


        //清除interval定时器
        if(window.IntervalItemRight1){
          clearInterval(window.IntervalItemRight1)
        }


        window.IntervalItemRight1=setInterval(()=>{

          const now = new Date();
          const minutes = now.getMinutes();
          const _hours = now.getHours();
          const acrive = localStorage.getItem("bufferActive")

          
          // if( [13,28,43,58].includes(minutes) ){
          if( [28,58].includes(minutes) ){

            if( _hours >=8 ){

              // 消息推送
              if( (acrive=='1') ){

                var str = moment().format('YYYY/MM/DD HH:mm:ss');   

                setTimeout(()=>{

         
                  
                  // 发消息
                  ipcRenderer.send("notificationFunc",{
                    time:str
                  });

                  // 图标闪烁
                  ipcRenderer.send("flashFrameFunction",{
                    active:true
                  });

                },200)

              }

            }

          }

        },30000)

      },
      changeFunc(){

        setTimeout(()=>{

          this.isopen = !this.isopen

          this.$nextTick(()=>{

            localStorage.setItem("bufferActive", this.isopen?'1':'0' )

            if( this.isopen ){
              
              setTimeout(()=>{
                this.initFunc()
              },200)

            }else{

              //清除interval定时器
              if(window.IntervalItemRight1){
                clearInterval(window.IntervalItemRight1)
              }

            }


          })

        },200)

      }
    }
  }
</script>
<style lang="scss">
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.box-1123 .v-btn{
  margin-right: 22px;
}

.btn-box-1123{

  .li-223{
    position: relative;
    display: inline-block;
    width: 120px;
    height: 80px;
    margin-right: 16px;

    box-shadow: 0 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, .2)), 0 4px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, .14)), 0 1px 10px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, .12)) !important;
    border-radius: 6px;

    background-color: #F5F5F5;

    &.color-1{

      background-color: rgba(76,175,80,0.6);

      p{
        color: #fff;
      }

      .icon-up{
        color: rgba(76,175,80,1);
      }

    }


    &.color-2{

      background-color: rgba(255,152,0,0.6);
      p{
        color: #fff;
      }

      .icon-down{
        color: rgba(255,152,0,1);
      }

    }

    p{
      font-size: 22px;
      font-family: sans-serif;
      font-weight: 600;
      padding-left: 12px;
      padding-top: 24px;
      color: #424242;
      cursor: pointer;
    }

    .icon-up{
      position: absolute;
      top: 6px;
      right: 4px;
      z-index: 9;
      font-size: 32px;
      cursor: pointer;
      color: #BDBDBD;
    }

    .icon-down{
      position: absolute;
      bottom: 6px;
      right: 4px;
      z-index: 9;
      font-size: 32px;
      cursor: pointer;
      color: #BDBDBD;

    }
  }

}

</style>