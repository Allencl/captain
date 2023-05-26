<template>
    <div style="padding: 100px 200px;text-align: center;">
        <v-img
            :src="image"
        ></v-img>
    </div>

</template>
  
<script>
export default {
    data: () => ({ 
        image: require("@/assets/404.png")
    }),
}
</script>
  

  