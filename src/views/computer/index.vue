<template>
   



    <v-card  elevation="2">
            <div style="height: 16px;"></div>

            <v-tabs
                v-model="tab"
                color="#81C784"
                align-tabs="center"
            >
            
            <v-tab value="1"><b>Forex</b></v-tab>
            <v-tab value="2"><b>FXCM</b></v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="1">
                    <MoudlePage3 />
                </v-window-item>
                <v-window-item value="2">
                    <MoudlePage4 />
                </v-window-item>
            </v-window>
            <!-- <div style="height: 28px;"></div> -->
    </v-card>


</template>
<script>
import MoudlePage3 from "./moudle3.vue"
import MoudlePage4 from "./moudle4.vue"



export default {
    components:{
        MoudlePage3,
        MoudlePage4
    },
    data: () => ({ 
        tab: '1',
    }),
}
</script>
  

  