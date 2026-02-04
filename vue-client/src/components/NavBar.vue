<template>
  <nav>
    <ul class="list">
      <li><RouterLink to="/resources">Resources</RouterLink></li>
      <li v-if="isAuth"><RouterLink to="/borrow">Borrowed</RouterLink></li>
      <li v-if="isAuth"><RouterLink to="/borrow-history">Borrow History</RouterLink></li>
      <li v-if="isAuth"><RouterLink to="/admin/edit">Add Resource</RouterLink></li>
      <li v-if="isAuth"><RouterLink to="/admin/resources">Admin Resources</RouterLink></li>
    </ul>

    <ul class="list">
      <li v-if="!isAuth"><RouterLink to="/login">Login</RouterLink></li>
      <li v-if="!isAuth"><RouterLink to="/signup">Signup</RouterLink></li>
      <li v-if="isAuth"><button class="btn" @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuth = computed(() => !!localStorage.getItem('token'))

function logout() {
  localStorage.removeItem('token')
  router.push('/resources')
}
</script>