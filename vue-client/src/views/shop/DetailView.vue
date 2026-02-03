<template>
  <NavBar />

  <div class="item-grid">
    <ResourceCard
      v-if="resource"
      :resource="resource"
      :borrowedResources="borrowedResources"
      @borrow="borrow"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import ResourceCard from '@/components/ResourceCard.vue'
import { getResource, borrowResource } from '@/services/shop'

const route = useRoute()
const router = useRouter()

const resource = ref(null)
const borrowedResources = ref([])

onMounted(async () => {
  const data = await getResource(route.params.id)
  resource.value = data.resource
  borrowedResources.value = data.loggedInUser?.borrowedItems?.resources || []
})

async function borrow(id) {
  await borrowResource(id)
  router.push('/borrow')
}
</script>