<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue';

interface User {
  id: number,
  name: string
}

const users = ref<User[]>([])
if(process.env.NODE_ENV === 'development') {
  import('./mocks/browser').then(async module => {
    await module.worker.start()
    const res = await axios.get('/users')
    console.log(res)
    users.value = res.data.users
  })
}
</script>

<template>
  <div>Hello World</div>
  <p v-for="(user, index) in users">
    {{ user.name }}
  </p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
