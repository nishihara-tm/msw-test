<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import axios from 'axios'
import { User } from '../model'

const users = ref<User[]>([])
watchEffect(async() => {
  const res = await axios('http://localhost:3000/users')
  users.value = res.data.users
})
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>Hello World</h1>
  <p>{{ msg }}</p>

  <p v-for="(user, index) in users">
    {{ user.name }}
  </p>
  <button type="button" @click="count++">increment</button>
  <p>count is: {{ count }}</p>
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
