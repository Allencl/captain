<template>

    <v-card class="computer-card-1">
      <v-card-text style="position: relative;">
        <p class="text-h6 text--primary">
            <v-icon style="font-size: 18px;margin-bottom:4px;margin-right: 6px;color: #81C784;">mdi-desktop-classic</v-icon>
            <b>Forex</b> 

            <a-input-number v-model:value="money" @change="changeMoney" :min="10" :max="10000" style="margin-left:32px;" />
            <a-tag color="#81C784" style="margin-left: 22px">
                <template #icon>
                    <v-icon icon="mdi-bird"></v-icon>
                </template>
                <b style="font-size: 12px;padding-left: 8px;">{{ rate }}倍</b>
            </a-tag>
        </p>


      </v-card-text>

      <div style="padding: 0px 16px;">

        <a-table :columns="columns" :data-source="data" :pagination="false" size="small">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'close'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#FF5722" icon="mdi-close-outline"></v-icon>
                </template>
                <template v-if="column.key === 'priceStart'">
                    <strong style="color: #8BC34A;">{{ column.title }}</strong>
                </template>
                <template v-if="column.key === 'priceOver'">
                    <strong style="color: #FF5722;">{{ column.title }}</strong>
                </template>


                <template v-if="column.key === 'count'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#FFC107" icon="mdi-cards"></v-icon>
                </template>

                
                <template v-if="column.key === 'number'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#8BC34A" icon="mdi-database"></v-icon>
                </template>

                <template v-if="column.key === 'profit'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#00BCD4" icon="mdi-currency-usd"></v-icon>
                </template>
                <template v-if="column.key === 'computer'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#81C784" icon="mdi-desktop-classic"></v-icon>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'count'">
                    <b style="color: #FF6D00;">{{ record.count?`${record.count} 点`:'' }}</b>
                </template>
                <template v-if="column.key === 'number'">
                    <b style="color: #558B2F;">{{ record.number?`${record.number} 手`:'' }}</b>
                </template>
                <template v-if="column.key === 'type'">
                    <b>{{ record.title }}</b>
                </template>
                <template v-if="column.key === 'priceStart' && record.type!='line'">
                    <a-input-number style="width:130px;" v-model:value="record.valuePriceStart" :precision="record._precision" />
                </template>
                <template v-if="column.key === 'priceOver' && record.type!='line'">
                    <a-input-number style="width:130px;" v-model:value="record.valuePriceOver" :precision="record._precision" />
                </template>

                <template v-if="column.key === 'computer'">
                    <v-btn v-if="record.type!='line'" @click="(val)=> this.valueChange(record)" density="compact" color="#81C784" style="color:#fff" icon="mdi-desktop-classic"></v-btn>
                    <v-icon v-if="record.direction=='buy'" color="#8BC34A" icon="mdi-arrow-up-thin" size="28"></v-icon>
                    <v-icon v-if="record.direction=='sell'" color="#FF5722" icon="mdi-arrow-down-thin" size="28"></v-icon>
                </template> 

            </template>
        </a-table>




      </div>
    </v-card>

</template>
<script>
import { defineComponent, h } from 'vue'
import BigNumber from "bignumber.js";


export default defineComponent({
    data: (_this) => ({ 

        money:20,   // 止损资金
        rate:10,     // 收益比例

        // 配置列
        columns:[
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width:100
            },
            {
                title: '开',
                dataIndex: 'priceStart',
                key: 'priceStart',
                width:120
            },
            {
                title: '止',
                dataIndex: 'priceOver',
                key: 'priceOver',
                width:120
            },
            {
                title: '点数',
                dataIndex: 'count',
                key: 'count',
                width:120
            },
            {
                title: '手数',
                dataIndex: 'number',
                key: 'number',
                width:100
            },
            {
                title: '止盈',
                dataIndex: 'profit',
                key: 'profit',
                width:110
            },

            {
                title: 'Count',
                dataIndex: 'computer',
                key: 'computer',
                width:100

            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
          

            },
        ],

        // 数据
        data:[
            // { type:"line", remark:"-"},
            {
                type: 'XAUUSD',    // 类型
                title:"黄金",         // 标题
                _precision:0,   //  小数位数
                valuePriceStart: 1950,   // 开始价
                valuePriceOver: 1940,   //  结束价
                remark:"1手 1个点 1USD",  // 备注
            },
            {
                type: 'XAGUSD',    // 类型
                title:"白银",         // 标题
                _precision:3,   //  小数位数
                valuePriceStart: 23.145,   // 开始价
                valuePriceOver: 23.023,   //  结束价
                remark:"1手 0.001个点 0.001USD",  // 备注
            },
            { type:"line", remark:"-"},


            {
                type: 'NA100',    // 类型
                title:"纳斯达克100",         // 标题
                _precision:0,   //  小数位数
                valuePriceStart: 15010,   // 开始价
                valuePriceOver: 15000,   //  结束价
                remark:"1手 1个点 1USD",  // 备注
            },
            {
                 type: 'SPX500',    // 类型
                 title:"标普500",         // 标题
                 _precision:0,   //  小数位数
                 valuePriceStart: 4480,   // 开始价
                 valuePriceOver: 4470,   //  结束价
                 remark:"1手 1个点 1USD",  // 备注
            },
            // {
            //     type: 'US30',    // 类型
            //     title:"道琼斯",         // 标题
            //     _precision:0,   //  小数位数
            //      valuePriceStart: 35210,   // 开始价
            //      valuePriceOver: 35200,   //  结束价
            //     remark:"1手 1个点 1USD",  // 备注
            // },
            // {
            //     type: 'US2000',    // 类型
            //     title:"罗素2000",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 1920,   // 开始价
            //     valuePriceOver: 1910,   //  结束价
            //     remark:"1手 1个点 1USD",  // 备注
            // },
            // { type:"line", remark:"-"},
            // {
            //     type: 'GER40',    // 类型
            //     title:"德国40",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 15810,   // 开始价
            //     valuePriceOver: 15800,   //  结束价
            //     remark:"1手 1个点 1USD",  // 备注
            // },
            // {
            //     type: 'FH40',    // 类型
            //     title:"法国40",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 7210,   // 开始价
            //     valuePriceOver: 7200,   //  结束价
            //     remark:"1手 1个点 1USD",  // 备注
            // },
            // {
            //     type: 'UK100',    // 类型
            //     title:"英国100",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 7520,   // 开始价
            //     valuePriceOver: 7500,   //  结束价
            //     remark:"1手 1个点 1USD 有偏差",  // 备注
            // },
            // {
            //     type: 'aus200',    // 类型
            //     title:"澳洲指数",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 7320,   // 开始价
            //     valuePriceOver: 7300,   //  结束价
            //     remark:"1手 1个点 1USD 有偏差",  // 备注
            // },
            // {
            //     type: 'jp225',    // 类型
            //     title:"日经指数",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 31787,   // 开始价
            //     valuePriceOver: 31930,   //  结束价
            //     remark:"1手 1个点 1USD 有偏差",  // 备注
            // },

            { type:"line", remark:"-"},
            // {
            //     type: 'CH50',    // 类型
            //     title:"中国50",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 13120,   // 开始价
            //     valuePriceOver: 13100,   //  结束价
            //     remark:"1手 1个点 1USD",  // 备注
            // },
            // {
            //     type: 'HK33',    // 类型
            //     title:"恒生指数",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 19190,   // 开始价
            //     valuePriceOver: 19295,   //  结束价
            //     remark:"1手 1个点 0.1USD 有偏差",  // 备注
            // },
            // { type:"line", remark:"-"},


            // { type:"line", remark:"-"},
            {
                type: 'GBPUSD',    // 类型
                title:"英镑-美元",         // 标题
                _precision:5,   //  小数位数
                valuePriceStart: 1.27181,   // 开始价
                valuePriceOver: 1.26970,   //  结束价
                remark:"1手 0.00001个点 1USD",  // 备注
            },
            {
                type: 'EURUSD',    // 类型
                title:"欧元-美元",         // 标题
                _precision:5,   //  小数位数
                valuePriceStart: 1.08437,   // 开始价
                valuePriceOver: 1.08076,   //  结束价
                remark:"1手 0.00001个点 1USD",  // 备注
            },
            { type:"line", remark:"-"},
            // {
            //     type: 'GBPJPY',    // 类型
            //     title:"英镑-日元",         // 标题
            //     _precision:3,   //  小数位数
            //     valuePriceStart: 185.026,   // 开始价
            //     valuePriceOver: 184.140,   //  结束价
            //     remark:"1手 0.001个点 1USD 有偏差",  // 备注
            // },
            {
                type: 'EURJPY',    // 类型
                title:"欧元-日元",         // 标题
                _precision:3,   //  小数位数
                valuePriceStart: 158.430,   // 开始价
                valuePriceOver: 158.120,   //  结束价
                remark:"1手 0.001个点 1USD 有偏差",  // 备注
            },
            {
                type: 'USDJPY',    // 类型
                title:"美元-日元",         // 标题
                _precision:3,   //  小数位数
                valuePriceStart: 148.350,   // 开始价
                valuePriceOver: 146.350,   //  结束价
                remark:"1手 0.001个点 1USD 有偏差",  // 备注
            },
            // {
            //     type: 'AUDCAD',    // 类型
            //     title:"澳元-加元",         // 标题
            //     _precision:5,   //  小数位数
            //     valuePriceStart: 0.87273,   // 开始价
            //     valuePriceOver: 0.87115,   //  结束价
            //     remark:"1手 0.00001个点 1USD",  // 备注
            // },
            // {
            //     type: 'NADCHF',    // 类型
            //     title:"纽元-法郎",         // 标题
            //     _precision:5,   //  小数位数
            //     valuePriceStart: 0.52453,   // 开始价
            //     valuePriceOver: 0.52324,   //  结束价
            //     remark:"1手 0.00001个点 1USD",  // 备注
            // },
            { type:"line", remark:"-"},
            {
                type: 'copper',    // 类型
                title:"铜",         // 标题
                _precision:0,   //  小数位数
                valuePriceStart: 380.00,   // 开始价
                valuePriceOver: 370.00,   //  结束价
                remark:"1手 1个点 1USD",  // 备注
            },
            // { type:"line", remark:"-"},


            // {
            //     type: 'USDX',    // 类型
            //     title:"美元指数",         // 标题
            //     _precision:0,   //  小数位数
            //     valuePriceStart: 10470,   // 开始价
            //     valuePriceOver: 10490,   //  结束价
            //     remark:"1手 1个点 1USD",  // 备注
            // },

            // {
            //     type: 'USOil',    // 类型
            //     title:"美国原油",         // 标题
            //     _precision:1,   //  小数位数
            //     valuePriceStart: 7391.0,   // 开始价
            //     valuePriceOver: 7349.0,   //  结束价
            //     remark:"1手 1个点 1USD",  // 备注
            // },

            
        ]


    }),
    created(){
        const _value=localStorage.getItem("page_computer_money")||10
        this.money=_value


        // 缓存的数据
        this.$nextTick(()=>{
            if(localStorage.getItem("bufferDataList")){
                this.data= JSON.parse( localStorage.getItem("bufferDataList")  )
            }
        })
    },
    methods:{
        // close change 111
        valueChange(record){
            const {money,rate}=this
            const {type,valuePriceStart,valuePriceOver}=record

            const _valuePriceStart=new BigNumber(valuePriceStart)
            const _valuePriceOver=new BigNumber(valuePriceOver)
            const _count2= ( _valuePriceStart.minus(_valuePriceOver) ).absoluteValue().toNumber()

            // 纳斯达克100   标普500  道琼斯 罗素2000 德国40 法国40 英国100 澳洲指数 中国50 黄金 美铜 美元指数
            if( ["NA100","SPX500","US30","US2000","GER40","FH40","UK100","aus200","CH50","XAUUSD","copper","USDX"].includes(type) ){
                var _count=_count2
                var _profit=new BigNumber(_count).multipliedBy(rate).toNumber()  // 止盈
                record.number= new BigNumber(money).dividedBy(_count).toNumber().toFixed(1)   // 手数
                record.count=_count  // 点数
 
                // 多 | 空
                if(_valuePriceStart>_valuePriceOver){
                    record.direction='buy'   
                    record.profit= new BigNumber(_valuePriceStart).plus(_profit).toNumber()   // 止盈
                }else{
                    record.direction='sell'
                    record.profit= new BigNumber(_valuePriceStart).minus(_profit).toNumber()  // 止盈
                }
            }

            // 恒生指数
            // if( ["HK33"].includes(type) ){
            //     var _count=_count2
            //     var _profit=new BigNumber(_count).multipliedBy(rate).toNumber()  // 止盈
            //     record.number= new BigNumber(money).dividedBy(_count).multipliedBy(10).toNumber().toFixed(1)   // 手数
            //     record.count=_count  // 点数

            //     // 多 | 空
            //     if(_valuePriceStart>_valuePriceOver){
            //         record.direction='buy'   
            //         record.profit= new BigNumber(_valuePriceStart).plus(_profit).toNumber()   // 止盈
            //     }else{
            //         record.direction='sell'
            //         record.profit= new BigNumber(_valuePriceStart).minus(_profit).toNumber()  // 止盈
            //     }
            // }

            // 英镑美元 欧元美元 澳元加元 纽元法郎
            if( ["GBPUSD","EURUSD","AUDCAD","NADCHF"].includes(type) ){
                var _count=_count2.toFixed(5)
                var _profit=new BigNumber(_count).multipliedBy(rate).toNumber()  // 止盈
                record.number= new BigNumber(money).dividedBy(_count).dividedBy(100000).toNumber().toFixed(2)   // 手数
                record.count=_count  // 点数

                // 多 | 空
                if(_valuePriceStart>_valuePriceOver){
                    record.direction='buy'   
                    record.profit= new BigNumber(_valuePriceStart).plus(_profit).toNumber()   // 止盈
                }else{
                    record.direction='sell'
                    record.profit= new BigNumber(_valuePriceStart).minus(_profit).toNumber()  // 止盈
                }
            }

            // 英镑日元 欧元日元 美元日元
            if( ["EURJPY","GBPJPY","USDJPY"].includes(type) ){
                var _count=_count2.toFixed(3)
                var _profit=new BigNumber(_count).multipliedBy(rate).toNumber()  // 止盈
                record.number= new BigNumber(money).dividedBy(_count).dividedBy(1000).toNumber().toFixed(2)   // 手数
                record.count=_count   // 点数

                // 多 | 空
                if(_valuePriceStart>_valuePriceOver){
                    record.direction='buy'   
                    record.profit= new BigNumber(_valuePriceStart).plus(_profit).toNumber()   // 止盈
                }else{
                    record.direction='sell'
                    record.profit= new BigNumber(_valuePriceStart).minus(_profit).toNumber()  // 止盈
                }
            }

            // 白银
            if( ["XAGUSD"].includes(type) ){
                var _count=_count2.toFixed(3)
                var _profit=new BigNumber(_count).multipliedBy(rate).toNumber()  // 止盈
                record.number= new BigNumber(money).dividedBy(_count).toNumber().toFixed(2)   // 手数
                record.count=_count   // 点数

                // 多 | 空
                if(_valuePriceStart>_valuePriceOver){
                    record.direction='buy'   
                    record.profit= new BigNumber(_valuePriceStart).plus(_profit).toNumber()   // 止盈
                }else{
                    record.direction='sell'
                    record.profit= new BigNumber(_valuePriceStart).minus(_profit).toNumber()  // 止盈
                }
            }
            

            // 缓存数据
            this.$nextTick(()=>{
                localStorage.setItem("bufferDataList", JSON.stringify(this.data) )
            })

            
        },
        // 
        changeMoney(value){
            localStorage.setItem("page_computer_money",value)
        }
    }
})
</script>
<style>
.computer-card-1{

}
</style>

  