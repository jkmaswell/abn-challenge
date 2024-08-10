<script setup lang="ts">
import { useTvShowsStore } from '@/stores/showsStore'
import { storeToRefs } from 'pinia'
import ShowCard from './ShowCard.vue'

// Stores
const store = useTvShowsStore()

const { filteredShows } = storeToRefs(store)
</script>

<template>
  <div class="search-results">
    <h2 class="search-results__title">
      Results
    </h2>
      
    <div
      v-if="filteredShows.length === 0"
      class="search-results__empty"
    >
      No results found.
    </div>
    <div
      v-else
      class="search-results__list"
    >
      <ShowCard
        v-for="show in filteredShows"
        :key="show.id"
        :show="show"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-results {
  &__empty {
    color: $secondary-color;
    font-size: 1.6rem;
    margin-block-start: 2rem;
    text-align: center;
  }

  &__title {
    font-size: 2rem;
    margin-block-end: 1.5rem;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
}
</style>