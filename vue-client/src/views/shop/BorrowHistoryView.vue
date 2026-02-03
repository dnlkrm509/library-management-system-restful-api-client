<template>
  <NavBar />

  <div v-for="record in records" :key="record._id">
    <h3>#{{ record._id }}</h3>

    <div class="item-grid">
      <div v-for="r in record.resources" :key="r._id" class="item">
        <h4>{{ r.title }}</h4>
        <p>Returned: {{ r.returnedDate }}</p>
      </div>
    </div>

    <button class="btn" @click="download(record._id)">Invoice</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { getBorrowHistory } from '@/services/shop'

const records = ref([])

onMounted(async () => {
  const data = await getBorrowHistory()
  records.value = data.returneds
})

function download(id) {
  window.location.href = `http://localhost:8080/borrow-history/${id}`
}
</script>