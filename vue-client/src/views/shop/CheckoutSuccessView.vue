<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiFetch } from '@/services/api'

const route = useRoute()
const router = useRouter()

const message = ref('Processing...')

onMounted(async () => {
  const resourceId = route.query.resourceId
  const returned = route.query.returned
  const token = localStorage.getItem('token')

  if (!token || !resourceId) {
    message.value = 'Invalid checkout session.'
    return
  }

  try {
    await apiFetch(`/checkout/success?resourceId=${resourceId}&returned=${returned}`)
    message.value = 'Your resource has been returned successfully.'
  } catch (err) {
    console.error(err)
    message.value = 'Error completing checkout.'
  }
})
</script>

<template>
  <h1>Thank you!</h1>
  <p>{{ message }}</p>
  <router-link to="/resources">Back to Resources</router-link>
</template>