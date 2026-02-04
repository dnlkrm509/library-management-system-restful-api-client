<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = ref({
  title: '',
  author: '',
  publicationYear: '',
  genre: ''
})

const resourceId = route.query.id

onMounted(async () => {
  if (!resourceId) return

  const data = await apiFetch(`/admin/resource/${resourceId}`)
  Object.assign(form.value, data)
})

async function save() {
  const url = resourceId
    ? `/admin/edit-resource/${resourceId}`
    : `/admin/add-resource`

  const method = resourceId ? 'PUT' : 'POST'

  await apiFetch(url, {
    method,
    body: JSON.stringify(form.value)
  })

  router.push('/resources')
}
</script>

<template>
  <NavBar />
  <div class="edit-form">
    <input v-model="form.title" placeholder="Title" />
    <input v-model="form.author" placeholder="Author" />
    <input v-model="form.publicationYear" placeholder="Year" />
    <input v-model="form.genre" placeholder="Genre" />
    <button class="btn" @click="save">
      {{ resourceId ? 'Update Resource' : 'Add Resource' }}
    </button>
  </div>
</template>