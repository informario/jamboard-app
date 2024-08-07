<script async setup>
  import {awake} from "@/services/api.js"

  import {  onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();



  onMounted(async () => {
    await awake()
    router.push('/drawing');
  });
</script>

<template>

  <div class="login">
    <div class="login-box">
      <h1 class="title">waiting for spinup</h1>
      <img class="image" src="/src/components/icons/loading-thinking.gif" alt="Loading..">
      <p>please hold on until my free instance of render starts</p>
    </div>
  </div>

</template>




<style scoped>
  @import '../assets/css/styles0.css';
  .image{
    width:100px;
    height:100px;
  }
  body{
    margin:200px;
  }


</style>