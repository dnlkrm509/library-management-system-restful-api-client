<template>
  <NavBar />

  <div class="item-grid">
    <div v-for="r in resources" :key="r._id" class="item">
      <h3>{{ r.title }}</h3>
      <p>Due Date: {{ r.dueDate || 'N/A' }}</p>
      <RouterLink class="btn" :to="`/checkout?resourceId=${r._id}`">Return</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { getBorrowed } from '@/services/shop'

const resources = ref([])

onMounted(async () => {
  const data = await getBorrowed()
  resources.value = data.resources
})
</script>