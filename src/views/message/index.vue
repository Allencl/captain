<template>

    <v-card max-width="763">
        <v-card-text style="position: relative;">
            <p class="text-h6 text--primary">
                <v-icon style="font-size: 18px;margin-bottom:4px;margin-right: 6px;">mdi-bell-badge</v-icon>
                1小时循环提醒 
            </p>
            <v-row>
                <v-col cols="4">
                    <v-text-field 
                        v-model="time"
                        density="compact"
                        variant="solo-inverted"
                        clearable
                        type="number"
                        @update:modelValue="changeNumber"
                    >
                        <template v-slot:label>
                            <span>
                                <strong style="color:#FF3D00">时间（分钟）</strong>
                                <v-icon icon="mdi-align-horizontal-right"></v-icon>
                            </span>
                        </template>
                </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-switch
              v-model="active"
              color="success"
              hide-details
              @update:modelValue="changeSwitch"
            ></v-switch>
                </v-col>
            </v-row>




        </v-card-text>
      </v-card>

</template>
<script>

export default {
    components:{

    },
    data: () => ({ 
        time:55,
        showNo:false,
        active:false,
        intervalBox:undefined
    }),
    created(){

        this.active=localStorage.getItem("bufferSwitch001")=='true'?true:false
        this.time= Number( localStorage.getItem("bufferNumber001")||"55" )

    },
    methods:{
        changeSwitch(value){
            localStorage.setItem("bufferSwitch001",String(value))
        },
        changeNumber(value){
            if(value){ 
                localStorage.setItem("bufferNumber001",String(value.trim()))
            }
        }
    }
}
</script>
  

  