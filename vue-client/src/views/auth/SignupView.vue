<template>
  <NavBar />

  <main class="signup-form">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
    <button class="btn" @click="submit">Signup</button>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { signup } from '@/services/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

async function submit() {
  await signup(email.value, password.value, confirmPassword.value)
  router.push('/login')
}
</script>