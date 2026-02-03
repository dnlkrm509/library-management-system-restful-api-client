<template>
  <div class="item">
    <h3>{{ resource.title }}</h3>
    <p><strong>Author:</strong> {{ resource.author }}</p>
    <p><strong>Year:</strong> {{ resource.publicationYear }}</p>
    <p><strong>Genre:</strong> {{ resource.genre }}</p>

    <div class="buttons">
      <RouterLink class="btn" :to="`/resources/${resource._id}`">Details</RouterLink>

      <button
        v-if="canBorrow"
        class="btn"
        @click="$emit('borrow', resource._id)"
      >
        Borrow
      </button>

      <RouterLink
        v-if="canReturn"
        class="btn"
        :to="`/checkout?resourceId=${resource._id}`"
      >
        Return
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resource: Object,
  borrowedResources: Array
})

const borrowed = props.borrowedResources?.some(
  r => r.resourceId === props.resource._id
)

const canBorrow = !borrowed && props.resource.availableStatus
const canReturn = borrowed && !props.resource.availableStatus
</script>