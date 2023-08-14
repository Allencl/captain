<template>
    <h1>FORX</h1>
    <a-row :gutter="16">
        <a-col class="gutter-row" :span="6">
            <v-card>
                <a-table :columns="columns" :data-source="data" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'value'">
                            <span :style="`color:${record.valueColor?record.valueColor:'#000'}`">
                                {{ record.value }}
                            </span>
                        </template>
                    </template>
                </a-table>
            </v-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <v-card>
                <a-table :columns="columns2" :data-source="data2" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'value'">
                            <span :style="`color:${record.valueColor?record.valueColor:'#000'}`">
                                {{ record.value }}
                            </span>
                        </template>
                    </template>
                </a-table>
            </v-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <v-card>
                <a-table :columns="columns3" :data-source="data3" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'value'">
                            <span :style="`color:${record.valueColor?record.valueColor:'#000'}`">
                                {{ record.value }}
                            </span>
                        </template>
                    </template>
                </a-table>
            </v-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <v-card>
                <a-table :columns="columns4" :data-source="data4" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'value'">
                            <span :style="`color:${record.valueColor?record.valueColor:'#000'}`">
                                {{ record.value }}
                            </span>
                        </template>
                    </template>
                </a-table>
            </v-card>
        </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 32px;">
        <a-col class="gutter-row" :span="6">
            <v-card>
                <a-table :columns="columns5" :data-source="data5" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'value'">
                            <span :style="`color:${record.valueColor?record.valueColor:'#000'}`">
                                {{ record.value }}
                            </span>
                        </template>
                    </template>
                </a-table>
            </v-card>
        </a-col>
    </a-row>


</template>
<script>

export default {
    data: () => ({ 
        columns:[
            {
                title: '品种',
                dataIndex: 'type',
                key: 'type',
                width:200
            },
            {
                title: '点数值',
                dataIndex: 'value',
                key: 'value',
                width:160
            },

  
        ],

        data:[
            {
                type: '纳斯达克100',   
                value:"1手 # 1点1美元"
            },
            {
                type: '标普500',   
                value:"1手 # 1点1美元"
            },
            {
                type: '道琼斯',   
                value:"1手 # 1点1美元"
            },
            {
                type: '罗素2000',   
                value:"1手 # 1点1美元"
            },
            {
                type: '-',   
                value:"-"    
            },
            {
                type: '英国100',   
                value:"1手 # 1点1美元"
            },
            {
                type: '德国40',   
                value:"1手 # 1点1美元"
            },
            {
                type: '法国40',   
                value:"1手 # 1点1美元"
            },
            {
                type: '欧盟50',   
                value:"1手 # 1点1美元"
            },
            {
                type: '-',   
                value:"-"    
            },
            {
                type: '澳洲200',   
                value:"1手 # 1点1美元"
            },
            {
                type: '中国A50',   
                value:"1手 # 1点1美元"
            },
            {
                type: '恒生指数',   
                value:"1手 # 1点0.1美元",
                valueColor:'red'
            },
            {
                type: '日经225',   
                value:"140手 # 1点1美元",
                valueColor:'red'
            },
        ],


        columns2:[
            {
                title: '品种',
                dataIndex: 'type',
                key: 'type',
                width:200
            },
            {
                title: '点数值',
                dataIndex: 'value',
                key: 'value',
                width:160
            },

  
        ],
        data2:[
            {
                type: '黄金',   
                value:"1手 # 1点1美元"
            },
            {
                type: '白银',   
                value:"1手 # 0.01点0.01美元",
                valueColor:'red'
            },
            {
                type: '-',   
                value:"-"
            },
            {
                type: '美国原油',   
                value:"1手 # 1点1美元"
            },
            {
                type: '-',   
                value:"-"
            },
            {
                type: '美铜',   
                value:"1手 # 1点1美元"
            },
        ],


        columns3:[
            {
                title: '品种',
                dataIndex: 'type',
                key: 'type',
                width:200
            },
            {
                title: '点数值',
                dataIndex: 'value',
                key: 'value',
                width:160
            },

  
        ],
        data3:[
            {
                type: 'GBPJPY',   
                value:"1手 # 0.001点1美元"
            },
            {
                type: 'EURJPY',   
                value:"1手 # 0.001点1美元"
            },
            {
                type: 'USDJPY',   
                value:"1手 # 0.001点1美元"
            },
            {
                type: 'AUDJPY',   
                value:"1手 # 0.001点1美元"
            },
            {
                type: 'CADJPY',   
                value:"1手 # 0.001点1美元"
            },
            {
                type: 'CHFJPY',   
                value:"1手 # 0.001点1美元"
            },
            {
                type: 'NZDJPY',   
                value:"1手 # 0.001点1美元"
            },
        ],


        columns4:[
            {
                title: '品种',
                dataIndex: 'type',
                key: 'type',
                width:200
            },
            {
                title: '点数值',
                dataIndex: 'value',
                key: 'value',
                width:160
            },

  
        ],
        data4:[
            {
                type: 'GBPUSD',   
                value:"1手 # 0.00001点1美元"
            },
            {
                type: 'EURUSD',   
                value:"1手 # 0.00001点1美元"
            },
            {
                type: 'AUDUSD',   
                value:"1手 # 0.00001点1美元"
            },
            {
                type: 'NZDUSD',   
                value:"1手 # 0.00001点1美元"
            },
            {
                type: 'USDCAD',   
                value:"1手 # 0.00001点1美元"
            },
            {
                type: 'USDCHF',   
                value:"1手 # 0.00001点1美元"
            },
            {
                type: 'USDJPY',   
                value:"1手 # 0.001点1美元",
                valueColor:'red'

            },
        ],


        columns5:[
            {
                title: '品种',
                dataIndex: 'type',
                key: 'type',
                width:200
            },
            {
                title: '点数值',
                dataIndex: 'value',
                key: 'value',
                width:160
            },

  
        ],
        data5:[
            {
                type: '苹果',   
                value:"10手 # 1点10美元"
            },
            {
                type: '亚马逊',   
                value:"10手 # 1点10美元"
            },
            {
                type: '奈飞',   
                value:"10手 # 1点10美元"
            },
            {
                type: '微软',   
                value:"10手 # 1点10美元"
            },
            {
                type: '特斯拉',   
                value:"10手 # 1点10美元"
            },
            {
                type: '特斯拉',   
                value:"10手 # 1点10美元"
            },
            {
                type: '英特尔',   
                value:"10手 # 1点10美元"
            },
        ],
    }),
}
</script>
  

  