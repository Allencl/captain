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


            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'close'">
                    <a-input-number style="width:130px;" @change="(val)=> this.closeChange(val,record) " v-model:value="record.valueClose" :min="5" :max="1000" :step="5" />
                </template>
                <template v-if="column.key === 'priceStart'">
                    <a-input-number style="width:130px;" @change="(val)=> this.closeChange(val,record) " v-model:value="record.valuePriceStart" :precision="record._precision" />
                </template>
                <template v-if="column.key === 'priceOver'">
                    <a-input-number style="width:130px;" @change="(val)=> this.closeChange(val,record) " v-model:value="record.valuePriceOver" :precision="record._precision" />
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
                title: 'Close1',
                dataIndex: 'close1',
                key: 'close1',
            },
        ],

        data:[
            {
                type: 'XAU',
                _precision:2,   // 精度
                valueClose:10,    // close 
                valuePriceStart:1990.00,   // start
                valuePriceOver:1980.00,   // over
            }
        ]


    }),
    created(){

    },
    methods:{
        // close change
        closeChange(val,record){
            if(val){
                this.computerFunc(record)
            }
        },
        // computer
        computerFunc(record){
            const {type}=record

            switch (type) {
                case 'XAU':
                    this.computerXAU(record)
                    break;
            
                default:
                    break;
            }
         
        },
        // XAUUSD  GOLD
        computerXAU(record){
            console.log(record)
        }
    }
})
</script>
<style>
.computer-card-1{

}
</style>

  