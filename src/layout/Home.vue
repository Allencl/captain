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
</template>
<script>

  import moment from 'moment'


  export default {
    data: () => ({
      isopen: false,
      nowMinutes:"",  
    }),
    created(){

      const that=this

      const acrive = localStorage.getItem("bufferActive")
      this.isopen= acrive=="1" ?true:false


      this.$nextTick(()=>{
        if(this.isopen){
          this.initFunc()
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
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>