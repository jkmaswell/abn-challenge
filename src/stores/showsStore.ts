import { ShowModel } from '@/models/ShowModel'
import type { Show } from '@/types/show'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTvShowsStore = defineStore('tvShows', () => {
  // State
  const shows = ref<Show[]>([])
  const searchQuery = ref('')

  // Actions
  const loadShows = async () => {
    const allShows = await ShowModel.fetchShows()

    shows.value = sortShowsByRating(allShows)
  }

  // Getters
  const genres = computed(() => {
    const allGenres = shows.value.flatMap(show => show.genres)
    
    return [...new Set(allGenres)]
  })

  const showsByGenre = computed(() => (genre: string) => sortShowsByRating(shows.value.filter(show => show.genres.includes(genre))))

  const filteredShows = computed(() => sortShowsByRating(
    shows.value.filter(show =>
      show.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  ))

  const sortShowsByRating = (shows: Show[]): Show[] => {
    return [...shows].sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
  }

  return {
    shows,
    searchQuery,
    loadShows,
    genres,
    showsByGenre,
    filteredShows,
  }
})

export type TvShowsStore = ReturnType<typeof useTvShowsStore>;