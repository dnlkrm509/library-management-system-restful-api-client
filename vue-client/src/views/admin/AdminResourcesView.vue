<script setup>
import { onMounted, ref } from 'vue'
import { apiFetch } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const resources = ref([])

onMounted(async () => {
  const data = await apiFetch('/admin/resources')
  resources.value = data.resources
})

function edit(id) {
  router.push(`/admin/edit-resource?id=${id}`)
}

async function remove(id) {
  await apiFetch(`/admin/resource/${id}`, { method: 'DELETE' })
  resources.value = resources.value.filter(r => r._id !== id)
}
</script>

<template>
  <NavBar />
  <div class="item-grid">
    <div v-for="r in resources" :key="r._id" class="item">
      <h3>{{ r.title }}</h3>
      <p><strong>Author:</strong> {{ r.author }}</p>
      <p><strong>Year:</strong> {{ r.publicationYear }}</p>
      <p><strong>Genre:</strong> {{ r.genre }}</p>
      <div class="buttons">
        <button class="btn" @click="edit(r._id)">Edit</button>
        <button class="btn" @click="remove(r._id)">Delete</button>
      </div>
    </div>
  </div>
</template>