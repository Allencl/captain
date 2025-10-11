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

    <div style="height: 18px;"></div>
    <v-card
      max-width="800"
      elevation="2"
    >
      <v-card-text>

        <div style="height: 16px;"></div>
        <v-icon style="font-size: 33px;margin-bottom: 22px;color: #FFB74D;">mdi-bullhorn</v-icon>


        <v-row :gutters="18">
          <v-col cols="8">
            <v-select
              v-model="valueAudio"
              :items="itemsAudio"
              label="音频"
              chips
              multiple
              rounded
              clearable

            ></v-select>
          </v-col>
          <v-col cols="4">
            <a-input-number 
              v-model:value="valueNumberText" 
              prefix="🕗"
              :min="1" 
              size="large"
              :precision="0"
              :step="5"
              style="width:120px;position: relative;top:-2px;"
            />

            <v-btn 
              icon="mdi-plus" 
              color="#81C784"
              style="position:relative;top:3px;left:26px;color:#fff;"
              @click="playAllAudio"
            ></v-btn>

          </v-col>

        </v-row>

        <div>


          <v-chip-group>

            <a-popconfirm
              v-for="(item,j) in chipList"
              :key="j"
              title="确认删除?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="closeTagHandle(item)"
            >
              <v-chip :style="{ backgroundColor:'#4ea352', color:'white' }">
                {{ item.text }}
                <span style="background: #FFB74D;padding: 2px 8px;border-radius: 12px;margin-left: 8px;">{{ item.time }}分钟</span>
              </v-chip>
            </a-popconfirm>

          </v-chip-group>
        </div>


      </v-card-text>
    </v-card>




</template>
<script>

  import moment from 'moment'
  import { message } from 'ant-design-vue';

  export default {
    data: () => ({

      valueNumberText: 5,
      isopen: false,
      nowMinutes:"",  

      bufferText:"",  // 

      // chip 数组
      chipList:[],
    
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
      ],

      // 播放音频
      valueAudio: [],
      itemsAudio: [],

    }),
    created(){

      const that=this

      const acrive = localStorage.getItem("bufferActive")
      this.isopen= acrive=="1" ?true:false


      this.$nextTick(()=>{

        this.getAllAudio()

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
    beforeDestroy() {

      //清除interval定时器
      if(window.IntervalItemRight1){
        clearInterval(window.IntervalItemRight1)
      }

    },
    methods:{
      test1(){
        // const { ipcRenderer } = window.require('electron');   
        // var str = moment().format('YYYY/MM/DD HH:mm:ss');   

        // ipcRenderer.send("notificationFunc",{
        //   time:str
        // });
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
          if( [29,59].includes(minutes) ){

            if( _hours >=8 ){

              // 消息推送
              if( (acrive=='1') ){

                var str223 = moment().format('YYYY/MM/DD HH:mm');   
                var str = String(str223)


                if( that.bufferText!=str ){

                  setTimeout(()=>{

                    that.bufferText=str
                    
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

          }

        },10000)

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

      },
      // 获取所有音频
      getAllAudio(){

        const audioContext = require.context('@/audio', false, /\.(mp3|wav|ogg)$/)

        // 获取所有文件名（带扩展名）
        const filenames = audioContext.keys().map(key => {
          // key 格式如：'./提示音.mp3'
          return key.substring(2) // 去掉 './'
        })

        const _list=filenames.map(o=>{

          let _text=""
          switch (o) {

            case "黄金.wav":
              _text="a黄金.wav"
              break;
            case "白银.wav":
              _text="b白银.wav"
              break;

            case "纳斯达克.wav":
              _text="c纳斯达克.wav"
              break;
            case "标普500.wav":
              _text="d标普500.wav"
              break; 

            case "英镑兑美元.wav":
              _text="e英镑兑美元.wav"
              break;    
            case "欧元兑美元.wav":
              _text="f欧元兑美元.wav"
              break;   

            case "美元兑日元.wav":
              _text="g美元兑日元.wav"
              break;  
            case "欧元兑日元.wav":
              _text="h欧元兑日元.wav"
              break;    

            case "美铜.wav":
              _text="i美铜.wav"
              break; 
            case "恒生科技指数.wav":
              _text="j恒生科技指数.wav"
              break; 

            case "日经225.wav":
              _text="k日经225.wav"
              break; 

          
            default:
              break;
          }

          return _text
        })
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
        .map(k=>{
          return k.substring(1);
        })


        this.$nextTick(()=>{
          this.itemsAudio=_list||[]
        })


      },
      // 播放单个音频，返回 Promise
      playAudio(src) {
        return new Promise((resolve, reject) => {
          const audio = new Audio(src)
          audio.onended = () => resolve()
          audio.onerror = (e) => reject(e)
          audio.play().catch(reject)
        })
      },
      // 播放 所有音频
      async playAllAudio(){

        setTimeout(()=>{

          this.$nextTick(()=>{


            if( !this.valueAudio.length ){
              message.error("未选择音频！");
              return
            }

            if( Number(this.valueNumberText)<1  ){
              message.error("时间必须大于1分钟！");
              return
            }

            const _json={
              id: `ids${new Date().getTime()}`,
              time: this.valueNumberText,
              text: this.valueAudio.join(","),
              value: this.valueAudio
            }


            this.chipList=  this.chipList.concat([_json])


            this.$nextTick(()=>{

              setTimeout(()=>{

                if( this.chipList.filter(o=>o.id==_json.id).length ){
                  this.setTimeAudio(_json.value,_json.id)
                }else{
                  //console.log("已经被删了")
                }

              },(1000*60*_json.time) )

            })


          })

        },1000)

      },
      // 定时器 播放
      async setTimeAudio(list=[],id){


        for (const key of list) {

          try {
            const audioUrl = require(`@/audio/${key}`)
            await this.playAudio(audioUrl)
            
            setTimeout(()=>{
              this.closeTagHandle({
                id:id
              })
            },1000)

          } catch (error) {
            message.error(`[@/audio/${key}]播放失败`);
          }

        }

      },
      // 删除 音频 tags
      closeTagHandle(item){
        setTimeout(()=>{
          this.chipList=this.chipList.filter(o=>o.id!=item.id)
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