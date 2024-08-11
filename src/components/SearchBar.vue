<script setup lang="ts">
import { useTvShowsStore } from '@/stores/showsStore'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

// Stores
const store = useTvShowsStore()
const { searchQuery } = storeToRefs(store)

// Data
const query = ref('')

// Watchers
watch(() => query.value, (nVal: string) => {
  searchQuery.value = nVal
})
</script>

<template>
  <div class="search-bar">
    <input
      v-model="query"
      type="text"
      placeholder="Search TV shows..."
      class="search-bar__input"
    >
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  &__input {
    padding: 1rem;
    border: 0.1rem solid $border-color;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    inline-size: 100%;
  }
}
</style>