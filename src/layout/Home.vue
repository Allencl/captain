<template>

    <v-card
      max-width="1100"
      elevation="2"
    >
      <v-card-text>
        <div style="height: 16px;"></div>

        <div>
          <v-icon style="font-size: 33px;margin-bottom: 22px;color: #81C784;">mdi-sail-boat</v-icon>
          <h1 style="position: relative;top:-6px;padding-left: 26px;display: inline-block;color: rgba(0, 0, 0, .87);font-size: 22px;font-family: Roboto, sans-serif;line-height: 1.5;"> oh captain my captain </h1>
        </div>

        <div style="cursor: pointer;z-index:11;right:108px;top:20px;position: absolute;" title="签到" >
          <v-btn 
            icon="mdi-sail-boat" 
            size="x-large"
            variant="tonal"
            :color=" qiandaoAction? '#5865f2':'#78909C'"
            @click="qiandaoHandle"
          ></v-btn>
        </div>

        <div @click="changeFunc" :title="isopen?'闹钟开':'闹钟关'" style="cursor: pointer;z-index:11;right:18px;top:20px;position: absolute;text-align: center;display: inline-block;">


          <v-btn 
            v-if="!isopen"
            icon="mdi-close" 
            size="x-large"
            variant="tonal"
            color="#78909C"
          ></v-btn>



          <v-btn 
            v-if="isopen"
            icon="mdi-check-all" 
            size="x-large"
            variant="tonal"
            color="#2E7D32"
          ></v-btn>


        </div>

      

      </v-card-text>
    </v-card>

    <div style="height: 12px;"></div>
    <v-card
      max-width="1100"
      elevation="2"
    >
      <v-card-text>

        <div style="height: 16px;"></div>

        <div>
          <v-icon style="font-size: 33px;margin-bottom: 22px;color: #FFB74D;">mdi-bullhorn</v-icon>
          <h1 style="position: relative;top:-6px;padding-left: 26px;display: inline-block;color: rgba(0, 0, 0, .87);font-size: 20px;font-family: Roboto, sans-serif;line-height: 1.5;">预警</h1>
        </div>


        <v-row :gutters="8">

          <v-col cols="8">
 


            <a-select
              v-model:value="valueAudio"
              mode="tags"
              style="width: 100%"
              placeholder="音频"
              size="large"
              bordered
              :maxTagCount="4"
              clearable
              :listHeight="369"
            >
              <a-select-option v-for="(o,i) in itemsAudio" :key="i" :value="o">{{ o }}</a-select-option>
            </a-select>


          </v-col>
          <v-col cols="4">
            <a-input-number 
              v-model:value="valueNumberText" 
              prefix="🕗"
              :min="1" 
              size="large"
              :precision="0"
              :step="5"
              style="width:100px;position: relative;top:-11px;"
            />

            <v-btn 
              icon="mdi-plus" 
              color="#81C784"
              style="position:relative;top:-5px;left:6px;color:#fff;"
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

    <div style="height: 12px;"></div>
    <v-card
      max-width="1100"
      elevation="2"
      style="max-height:483px;"
    >
      <v-card-text>

        <div>
          <v-icon style="font-size: 33px;margin-bottom: 22px;color:#AB47BC;">mdi-trending-up</v-icon>
          <h1 style="position: relative;top:-6px;padding-left: 26px;display: inline-block;color: rgba(0, 0, 0, .87);font-size: 20px;font-family: Roboto, sans-serif;line-height: 1.5;">细嗅蔷薇</h1>
        </div>

        <img style="width: 100%;max-height: 364px;" :src="Image111" >
      
      </v-card-text>
    </v-card>

</template>
<script>

  import moment from 'moment'
  import { message } from 'ant-design-vue'


  export default {
    data: () => ({

      Image111: require("@/assets/png111.png"),


      qiandaoAction:false,  // 签到

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
      itemsAudio: [

        "白银.wav",
        "黄金.wav",

        "标普500.wav",
        "纳斯达克.wav",

        "英镑兑美元.wav",
        "欧元兑美元.wav",

        "英镑兑日元.wav",
        "欧元兑日元.wav",

      ],

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
    mounted() {
      // 1. 获取 ipcRenderer
      const { ipcRenderer } = window.require('electron');

      // 2. 定义回调函数（必须挂到 this 上，确保引用一致）
      this.handleReply = (event, data) => {
        this.forEachHandle(data)
        // 你的业务逻辑
      };

      // 3. 注册监听器
      ipcRenderer.on('reply-from-main', this.handleReply);


      const acrive = localStorage.getItem("bufferActive")
      this.isopen= acrive=="1" ?true:false

    },
    beforeDestroy() {

        //清除interval定时器
        if(window.IntervalItemRight1){
          clearInterval(window.IntervalItemRight1)
        }

        // 4. 移除监听器（关键！）
        const { ipcRenderer } = window.require('electron');
        if (this.handleReply) {
          ipcRenderer.removeListener('reply-from-main', this.handleReply);
        }



    },
    methods:{
      // 循环播放
      async forEachHandle(option={}){

        const _list6=option.pathList
        const _ids=option.idKey


        for (const key of _list6 ) {

          try {

            // 播放 音频
            await this.playAudio(key)
            // message.success(`audio: ${key}播放！`);

            // 删除 tags
            if(_ids){
              setTimeout(()=>{
                this.closeTagHandle({
                  id: _ids
                })
              },1000)
            }


          } catch (error) {

            message.error(`[@/audio/${key}]播放失败`);

            // 删除 tags
            if(_ids){
              setTimeout(()=>{
                this.closeTagHandle({
                  id: _ids
                })
              },1000)
            }

          }

        }

      },
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
          const acrive = that.isopen
          const _getDay=now.getDay()
          
          // if( [4,9,14,19,24,29,34,39,44,49,54,59].includes(minutes) ){
          // if( [14,29,44,59].includes(minutes) ){
          if( [9,19,29,39,49,59].includes(minutes) ){

            if( (_hours >=8) && (_getDay!=0) && (_getDay!=6) ){

              // 消息推送
              if( acrive ){

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

                    // 播放声音
                    that.playBuguAudio()

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
                this.valueAudio=[]
                this.valueNumberText=1
              },300)
            })


            this.$nextTick(()=>{

              setTimeout(()=>{

                if( this.chipList.filter(o=>o.id==_json.id).length ){

                  
                  // 语音
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

        const { ipcRenderer } = window.require('electron');   

        ipcRenderer.send("getAppPathFunc",{
          filePath: ["map3/a.wav"].concat( list.map(o=> `audio/${o}` ) ),
          idKey:id
        });

      },
      // 删除 音频 tags
      closeTagHandle(item){
        setTimeout(()=>{
          this.chipList=this.chipList.filter(o=>o.id!=item.id)
        },200)
      },
      // 播放 bugu
      async playBuguAudio(){

        const { ipcRenderer } = window.require('electron');   

        ipcRenderer.send("getAppPathFunc",{
          filePath: ["map3/b.wav"],
          idKey:""
        });

      },
      // 签到
      async qiandaoHandle(){

        var str223 = moment().format('YYYY-MM-DD HH:mm');   
        var str = String(str223)

        message.success(`captain ${str}`);

        this.qiandaoAction=true

        this.playBuguAudio()


      },
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