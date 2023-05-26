<template>

    <v-card max-width="763">
      <v-card-text style="position: relative;">
        <p class="text-h6 text--primary">
            <v-icon style="font-size: 18px;margin-bottom:4px;margin-right: 6px;">mdi-align-vertical-distribute</v-icon>
            Profit 
        </p>

            <v-btn
                style="position: absolute;top: 10px;right: 16px;"
                variant="outlined"
                color="teal"
                @click="submit"
            >submit</v-btn>
      </v-card-text>

      <div style="padding: 0px 16px;">
        <v-form ref="form">
            <v-row>
                <v-col cols="2">
                    <v-select
                        v-model="select"
                        :items="items"
                        label="ratio"
                        variant="solo-inverted"
                        density="compact"
                        @update:modelValue="selectChange"
                    ></v-select>
                </v-col>
                <v-col cols="4">
                    <v-text-field 
                        v-model="priceStart"
                        density="compact"
                        variant="solo-inverted"
                        clearable
                        type="number"
                        :rules=" [v => !!v || 'price start is required',]"
                        required
                    >
                        <template v-slot:label>
                            <span>
                                <strong style="color:#2E7D32">price start</strong>
                                <v-icon icon="mdi-align-horizontal-left"></v-icon>
                            </span>
                        </template>
                </v-text-field>
                    

                </v-col>
                <v-col cols="4">
                    <v-text-field 
                        v-model="priceOver"
                        density="compact"
                        variant="solo-inverted"
                        clearable
                        type="number"
                        :rules=" [v => !!v || 'price over is required',]"
                        required
                    >
                        <template v-slot:label>
                            <span>
                                <strong style="color:#FF3D00">price over</strong>
                                <v-icon icon="mdi-align-horizontal-right"></v-icon>
                            </span>
                        </template>
                </v-text-field>
                    

                </v-col>
            </v-row>


        </v-form>




      </div>
    </v-card>

</template>
<script>
import { Modal } from 'ant-design-vue'
import { defineComponent, h } from 'vue'
export default defineComponent({
    data: () => ({ 



        select: null,
        priceStart:undefined,
        priceOver: undefined,

        items: [
            '5',
            '6',
            '7',
            '8',
            '9',
            '10'
        ],
    }),
    created(){
        this.initHandle()
    },
    methods:{
        initHandle(){
            this.select=localStorage.getItem("bufferComputerRatio")||'7'
        },
        selectChange(value){
            localStorage.setItem("bufferComputerRatio",String(value))
        },
        async submit(){
            const { valid } = await this.$refs.form.validate()
            const {select,priceStart,priceOver}=this

            this.dialog=false
            this.textResult=""

            if(valid){
                const _priceStart=Number(priceStart)
                const _priceOver=Number(priceOver)
             
                const _len=(priceStart.toString().split(".")[1]||'').length
                const _priceAbs=(Math.abs(_priceStart-_priceOver))*Number(select)
                const _priceAbs2=_len?_priceAbs.toFixed(_len):_priceAbs
                
                // 多头
                if(_priceStart>_priceOver){

                    const _result3=Number(_priceAbs2)+Number(_priceStart)

                    Modal.success({
                        title: 'Result',
                        content: h('h1', _result3),
                    });
                }


                // 空头
                if(_priceStart<_priceOver){

                    const _result55=Number(_priceStart)-Number(_priceAbs2)

                    Modal.success({
                        title: 'Result',
                        content: h('h1', _result55),
                    });
                }
 

            }
        }
    }
})
</script>
  

  