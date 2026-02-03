<template>
  <section class="pagination" v-if="pageData">
    <a
      v-if="showFirst"
      href="#"
      @click.prevent="change(1)"
    >
      1
    </a>

    <a
      v-if="pageData.hasPreviousPage"
      href="#"
      @click.prevent="change(pageData.previousPage)"
    >
      {{ pageData.previousPage }}
    </a>

    <a class="active">
      {{ pageData.currentPage }}
    </a>

    <a
      v-if="pageData.hasNextPage"
      href="#"
      @click.prevent="change(pageData.nextPage)"
    >
      {{ pageData.nextPage }}
    </a>

    <a
      v-if="showLast"
      href="#"
      @click.prevent="change(pageData.lastPage)"
    >
      {{ pageData.lastPage }}
    </a>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pageData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['change'])

const showFirst = computed(() =>
  props.pageData.currentPage !== 1 &&
  props.pageData.previousPage !== 1
)

const showLast = computed(() =>
  props.pageData.currentPage !== props.pageData.lastPage &&
  props.pageData.nextPage !== props.pageData.lastPage
)

function change(page) {
  emit('change', page)
}
</script>