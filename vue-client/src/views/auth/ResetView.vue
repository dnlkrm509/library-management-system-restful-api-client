<template>
  <NavBar />

  <main class="reset-form">
    <input v-model="email" placeholder="Email" />
    <button class="btn" @click="submit">Reset</button>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { resetPassword } from '@/services/auth'

const router = useRouter()
const email = ref('')

async function submit() {
  await resetPassword(email.value)
  router.push('/resources')
}
</script>