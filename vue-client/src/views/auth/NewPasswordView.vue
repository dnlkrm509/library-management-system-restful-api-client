<template>
  <NavBar />

  <main class="new-password-form">
    <input v-model="password" type="password" placeholder="New Password" />
    <button class="btn" @click="submit">Change Password</button>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { setNewPassword } from '@/services/auth'

const route = useRoute()
const router = useRouter()
const password = ref('')

async function submit() {
  await setNewPassword(
    route.query.userId,
    route.query.token,
    password.value
  )
  router.push('/login')
}
</script>