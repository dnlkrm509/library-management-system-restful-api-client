<template>
  <NavBar />

  <main class="login-form">
    <div class="input-div">
      <label>Email</label>
      <input v-model="email" type="email" />
    </div>

    <div class="input-div">
      <label>Password</label>
      <input v-model="password" type="password" />
    </div>

    <button class="btn" @click="submit">Login</button>

    <div class="centered">
      <RouterLink to="/reset">Reset Password</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { login } from '@/services/auth'

const router = useRouter()
const email = ref('')
const password = ref('')

async function submit() {
  const data = await login(email.value, password.value)
  localStorage.setItem('token', data.token)
  router.push('/resources')
}
</script>