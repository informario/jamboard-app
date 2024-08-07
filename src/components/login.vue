<script setup>
import {ref} from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref("")

const login  = async function (){
  if (username.value === "") {
    window.alert("Please enter a username");
  }
  else {
    localStorage.setItem("username", username.value)
    router.push("/drawing")
  }
}
</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1 class="title">Enter your nickname</h1>
      <input class="input" placeholder="Username" v-model="username">
      <button class="button" @click="login()">Log in</button>
    </div>
  </div>

</template>

<style scoped>
@import '../assets/css/styles0.css';
</style>