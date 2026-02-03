<template>
  <NavBar />

  <main>
    <div class="item-grid">
      <ResourceCard
        v-for="r in resources"
        :key="r._id"
        :resource="r"
        :borrowedResources="borrowedResources"
        @borrow="borrow"
      />
    </div>

    <Pagination
      v-if="pagination"
      :pageData="pagination"
      @change="fetchResources"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import ResourceCard from '@/components/ResourceCard.vue'
import { getResources, borrowResource } from '@/services/shop'

const resources = ref([])
const borrowedResources = ref([])

onMounted(load)

async function load() {
  const data = await getResources()
  resources.value = data.resources
  borrowedResources.value = data.loggedInUser?.borrowedItems?.resources || []
}

async function borrow(id) {
  await borrowResource(id)
  load()
}
</script>