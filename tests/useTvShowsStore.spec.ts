import { ShowModel } from '@/models/ShowModel'
import { useTvShowsStore } from '@/stores/showsStore'
import type { Show } from '@/types/show'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/models/ShowModel')

describe('useTvShowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads shows and sorts them by rating', async () => {
    const mockShows: Show[] = [
      { id: 1, name: 'Show 1', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.0 }, summary: '' },
      { id: 2, name: 'Show 2', genres: ['Comedy'], image: { medium: 'http://example.com/image2.jpg', original: 'http://example.com/image4.jpg' }, rating: { average: 9.5 }, summary: '' },
    ]
  
    vi.spyOn(ShowModel, 'fetchShows').mockResolvedValue(mockShows)
    
    const store = useTvShowsStore()

    await store.loadShows()

    const shows = store.shows

    expect(shows).toHaveLength(2)
    expect(shows[0].name).toBe('Show 2')
    expect(shows[1].name).toBe('Show 1')
  })

  it('computes unique genres correctly', async () => {
    const mockShows: Show[] = [
      { id: 1, name: 'Show 1', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.0 }, summary: '' },
      { id: 2, name: 'Show 2', genres: ['Comedy'], image: { medium: 'http://example.com/image2.jpg', original: 'http://example.com/image4.jpg' }, rating: { average: 9.5 }, summary: '' },
    ]
  
    vi.spyOn(ShowModel, 'fetchShows').mockResolvedValue(mockShows)
    
    const store = useTvShowsStore()

    await store.loadShows()

    const genres = store.genres

    expect(genres).toEqual(['Comedy', 'Drama'])
  })

  it('computes shows by genre correctly', async () => {
    const mockShows: Show[] = [
      { id: 1, name: 'Show 1', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.0 }, summary: '' },
      { id: 2, name: 'Show 2', genres: ['Comedy'], image: { medium: 'http://example.com/image2.jpg', original: 'http://example.com/image4.jpg' }, rating: { average: 9.5 }, summary: '' },
      { id: 3, name: 'Show 3', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.5 }, summary: '' },
    ]
    
    vi.spyOn(ShowModel, 'fetchShows').mockResolvedValue(mockShows)

    const store = useTvShowsStore()

    await store.loadShows()

    const dramaShows = store.showsByGenre('Drama')

    expect(dramaShows).toHaveLength(2)
    expect(dramaShows[0].name).toBe('Show 3')
    expect(dramaShows[1].name).toBe('Show 1')
  })

  it('filters shows by search query correctly', async () => {
    const mockShows: Show[] = [
      { id: 1, name: 'Test Show 1', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.0 }, summary: '' },
      { id: 2, name: 'Show 2', genres: ['Comedy'], image: { medium: 'http://example.com/image2.jpg', original: 'http://example.com/image4.jpg' }, rating: { average: 9.5 }, summary: '' },
      { id: 3, name: 'Test Show 3', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.5 }, summary: '' },
    ]
    
    vi.spyOn(ShowModel, 'fetchShows').mockResolvedValue(mockShows)
    
    const store = useTvShowsStore()

    await store.loadShows()
    store.searchQuery = 'Test'

    const filteredShows = store.filteredShows

    expect(filteredShows).toHaveLength(2)
    expect(filteredShows[0].name).toBe('Test Show 3')
    expect(filteredShows[1].name).toBe('Test Show 1')
  })

  it('handles empty search query gracefully', async () => {
    const mockShows: Show[] = [
      { id: 1, name: 'Show 1', genres: ['Drama'], image: { medium: 'http://example.com/image1.jpg', original: 'http://example.com/image3.jpg' }, rating: { average: 8.0 }, summary: '' },
      { id: 2, name: 'Show 2', genres: ['Comedy'], image: { medium: 'http://example.com/image2.jpg', original: 'http://example.com/image4.jpg' }, rating: { average: 9.5 }, summary: '' },
    ]
  
    vi.spyOn(ShowModel, 'fetchShows').mockResolvedValue(mockShows)
    
    const store = useTvShowsStore()

    await store.loadShows()
    store.searchQuery = ''

    const filteredShows = store.filteredShows

    expect(filteredShows).toHaveLength(2)
    expect(filteredShows[0].name).toBe('Show 2')
    expect(filteredShows[1].name).toBe('Show 1')
  })
})