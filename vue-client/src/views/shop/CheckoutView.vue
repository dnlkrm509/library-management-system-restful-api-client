<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiFetch } from '@/services/api'

const route = useRoute()
const router = useRouter()

const summary = ref('Loading...')
let sessionId = null

onMounted(async () => {
  const resourceId = route.query.resourceId
  const token = localStorage.getItem('token')

  if (!token || !resourceId) {
    alert('Missing resource or not logged in.')
    router.push('/resources')
    return
  }

  try {
    const data = await apiFetch(`/checkout?resourceId=${resourceId}&returned=true`)
    summary.value = `Amount to pay: $${(data.total / 100).toFixed(2)}`
    sessionId = data.sessionId
  } catch (err) {
    console.error(err)
    alert('Error loading checkout info.')
    router.push('/borrow')
  }
})

function payNow() {
  const stripe = Stripe('pk_test_51RfkhNG4Zi54PiYY4luOihcrh2KJSbMnL7yHrmNbHUJSBmxhCW2lk3EUjggmIj3T73cimKfhw4GymZ1gbYCphIbQ00oYpOCtl0')

  stripe.redirectToCheckout({ sessionId }).then(result => {
    if (result.error) {
      alert(result.error.message)
    }
  })
}
</script>

<template>
  <h2>Return Checkout</h2>
  <p>{{ summary }}</p>
  <button class="btn" @click="payNow">Pay Now</button>
</template>