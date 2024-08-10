<script setup lang="ts">
import GenreList from '@/components/GenreList.vue'
import SearchBar from '@/components/SearchBar.vue'
import SearchResults from '@/components/SearchResults.vue'
import { useTvShowsStore } from '@/stores/showsStore'
import { computed } from 'vue'

// Computed
const store = useTvShowsStore()

const hasQuery = computed(() => store.searchQuery.trim().length > 0)
</script>

<template>
  <div class="dashboard">
    <SearchBar />
    <SearchResults v-if="hasQuery" />
    <GenreList v-else />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
</style>