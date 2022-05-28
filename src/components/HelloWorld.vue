<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface User {
  id: number,
  name: string
}

const users = ref<User[]>([])
onMounted(async() => {
  const res = await fetch('http://localhost:3000/users').then(async (res) => {
    return await res.json()
  }).catch(e => {
    return "error"
  })
  users.value = res.users
})
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>Hello World</h1>

  <p v-for="(user, index) in users">
    {{ user.name }}
  </p>
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
