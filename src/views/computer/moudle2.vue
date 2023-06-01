<template>

    <v-card class="computer-card-1">
      <v-card-text style="position: relative;">
        <p class="text-h6 text--primary">
            <v-icon style="font-size: 18px;margin-bottom:4px;margin-right: 6px;">mdi-desktop-classic</v-icon>
            FXCM 
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
                <template v-if="column.key === 'profitRatio'">
                    <span>{{ column.title }}</span>
                </template>
                <template v-if="column.key === 'profitPrice'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#8BC34A" icon="mdi-emoticon-cool"></v-icon>
                </template>
                <template v-if="column.key === 'profit'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#00BCD4" icon="mdi-currency-usd"></v-icon>
                </template>
                <template v-if="column.key === 'amount'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#FFC107" icon="mdi-database"></v-icon>
                </template>
                <template v-if="column.key === 'computer'">
                    <strong>{{ column.title }}</strong>
                    <v-icon color="#00BCD4" icon="mdi-desktop-classic"></v-icon>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'close'">
                    <a-input-number style="width:130px;" @change="(val)=> this.valueChange(val,record) " v-model:value="record.valueClose" :min="5" :max="1000" :step="5" />
                </template>
                <template v-if="column.key === 'priceStart'">
                    <a-input-number style="width:130px;" @change="(val)=> this.valueChange(val,record) " v-model:value="record.valuePriceStart" :precision="record._precision" :step="record.step" />
                </template>
                <template v-if="column.key === 'priceOver'">
                    <a-input-number style="width:130px;" @change="(val)=> this.valueChange(val,record) " v-model:value="record.valuePriceOver" :precision="record._precision"  :step="record.step" />
                </template>
                <template v-if="column.key === 'profitRatio'">
                    <a-input-number style="width:80px;" @change="(val)=> this.valueChange(val,record) " v-model:value="record.profitRatio" :min="7" :max="100" :step="1" />
                </template>
                <template v-if="column.key === 'amount'">
                    <strong style="color: #FFC107;">{{ record.amount }}</strong>
                </template>
                <template v-if="column.key === 'profitPrice'">
                    <strong style="color: #8BC34A;">{{ record.profitPrice }}</strong>
                </template>
                <template v-if="column.key === 'profit'">
                    <strong style="color: #00BCD4;">{{ record.profit }}</strong>
                </template> 
                <template v-if="column.key === 'computer'">
                    <v-btn @click="(val)=> this.valueChange(val,record) " density="compact" color="#00BCD4" style="color:#fff" icon="mdi-desktop-classic"></v-btn>
                </template> 
            </template>
        </a-table>




      </div>
    </v-card>

</template>
<script>
import { defineComponent, h } from 'vue'
export default defineComponent({
    data: () => ({ 


        columns:[
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width:100
            },
            {
                title: 'Close',
                dataIndex: 'close',
                key: 'close',
                width:160
            },
            {
                title: 'Price Start',
                dataIndex: 'priceStart',
                key: 'priceStart',
                width:160
            },
            {
                title: 'Price Over',
                dataIndex: 'priceOver',
                key: 'priceOver',
                width:160
            },
            {
                title: 'Profit Ratio',
                dataIndex: 'profitRatio',
                key: 'profitRatio',
                width:130
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                width:120
            },
            {
                title: 'Profit Price',
                dataIndex: 'profitPrice',
                key: 'profitPrice',
                width:130
            },
            {
                title: 'Profit',
                dataIndex: 'profit',
                key: 'profit',
                width:130
            },
            {
                title: 'Computer',
                dataIndex: 'computer',
                key: 'computer',
            },
        ],

        data:[
            {
                type: 'XAU',    // 类型
                _baseMultiple:1,   // 倍数
                _precision:2,   // 精度
                step:1,        // 步数
                valueClose:10,    // close 
                valuePriceStart:1990.00,   // start
                valuePriceOver:1980.00,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,

            },
            {
                type: 'XAG',    // 类型
                _baseMultiple:1,   // 倍数
                _precision:3,   // 精度
                step:0.001,        // 步数
                valueClose:10,    // close 
                valuePriceStart:23.350,   // start
                valuePriceOver:23.190,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'USOii',    // 类型
                _baseMultiple:10,   // 倍数
                _precision:3,   // 精度
                step:0.001,        // 步数
                valueClose:10,    // close 
                valuePriceStart:67.814,   // start
                valuePriceOver:67.360,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'NA100',    // 类型
                _baseMultiple:0.1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:14246.38,   // start
                valuePriceOver:14206.88,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'spx500',    // 类型
                _baseMultiple:1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:4140.35,   // start
                valuePriceOver:4130.35,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'us30',    // 类型
                _baseMultiple:0.1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:33622.50,   // start
                valuePriceOver:33569.50,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'us2000',    // 类型
                _baseMultiple:1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:1755.16,   // start
                valuePriceOver:1746.16,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'ger30',    // 类型
                _baseMultiple:0.1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:15799.68,   // start
                valuePriceOver:15778.84,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'eustx50',    // 类型
                _baseMultiple:0.1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:4319.95,   // start
                valuePriceOver:4300.84,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'fra40',    // 类型
                _baseMultiple:0.1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:7367.39,   // start
                valuePriceOver:7372.77,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'uk100',    // 类型
                _baseMultiple:0.1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:7755.60,   // start
                valuePriceOver:7730.60,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'jpn225',    // 类型
                _baseMultiple:0.01,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:29093.30,   // start
                valuePriceOver:29063.30,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            },
            {
                type: 'hkg33',    // 类型
                _baseMultiple:0.1,   // 倍数
                _precision:2,   // 精度
                step:0.01,        // 步数
                valueClose:10,    // close 
                valuePriceStart:19430.80,   // start
                valuePriceOver:19410.80,   // over
                profitRatio:7,  // 比例
                profitPrice:0,
                profit:0,
                amount:0,
            }
        ]


    }),
    created(){

    },
    methods:{
        // close change
        valueChange(val,record){
            if(val){
                this.computerFunc(record)
            }
        },
        // computer
        computerFunc(record){
            const {type}=record

            this.computerXAU(type,record)
            // switch (type) {
            //     case 'XAU':
            //         this.computerXAU('XAU',record)
            //         break;
            //         case 'XAG':
            //     this.computerXAU('XAG',record)
            //         break;
                    
            //     default:
            //         break;
            // }
         
        },
        // XAUUSD  GOLD
        computerXAU(active,record){
            const {valuePriceStart,valuePriceOver,valueClose,profitRatio,_precision,_baseMultiple}=record
            const _count=Math.abs( Number(valuePriceStart)- Number(valuePriceOver) )
            
            const _amount=Number(valueClose/(_count)/_baseMultiple).toFixed(3)
            const _profitPrice=Number(_count*profitRatio).toFixed(_precision) 
       
            this.data.map(o=>{
                if(o.type==active){
                    o.amount=_amount
                    o.profitPrice=((Number(valuePriceStart)>Number(valuePriceOver))?(Number(valuePriceStart)+Number(_profitPrice)):(Number(valuePriceStart)-Number(_profitPrice))).toFixed(_precision) 
                    o.profit=Number(Number(_profitPrice)*_amount*_baseMultiple).toFixed(0) 
                }
            })

        }
    }
})
</script>
<style>
.computer-card-1{

}
</style>

  