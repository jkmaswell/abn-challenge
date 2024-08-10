<script setup lang="ts">
import { useTvShowsStore } from '@/stores/showsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import ShowCard from './ShowCard.vue'

// Stores
const store = useTvShowsStore()
const { genres } = storeToRefs(store)

// Methods
const showsByGenre = (genre: string) => store.showsByGenre(genre)

// Hooks
onMounted(async () => {
  await store.loadShows()
})
</script>

<template>
  <div class="genre-list">
    <div
      v-for="genre in genres"
      :key="genre"
      class="genre-list__genre"
    >
      <h2 class="genre-list__title">
        {{ genre }}
      </h2>
      <div class="genre-list__shows">
        <ShowCard
          v-for="show in showsByGenre(genre)"
          :key="show.id"
          :show="show"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.genre-list {
  &__genre {
    margin-block-end: 2rem;
  }

  &__title {
    font-size: 2rem;
    margin-block-end: 1.5rem;
  }

  &__shows {
    display: flex;
    flex-wrap: nowrap;
    gap: 1.5rem;
    overflow-x: auto;
    padding-block: 0.5rem;
    padding-inline: 0;
  }
}
</style>