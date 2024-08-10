import GenreList from '@/components/GenreList.vue'
import { TvShowsStore, useTvShowsStore } from '@/stores/showsStore'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RouterLinkMock } from './mocks/RouterLinkMock'
import { ShowCardMock } from './mocks/ShowCardMock'

describe('GenreList.vue', () => {
  let wrapper: ReturnType<typeof mount>
  let store: TvShowsStore

  beforeEach(async () => {
    setActivePinia(createPinia())

    store = useTvShowsStore() as TvShowsStore

    store.shows = [
      { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 7.5 }, image: { original: '', medium: '' }, summary: '' },
    ]

    vi.spyOn(store, 'loadShows')

    wrapper = mount(GenreList, {
      global: {
        components: {
          RouterLink: RouterLinkMock,
        },
      },
    })
    await flushPromises()
  })

  it('renders genres correctly', () => {
    const genreTitles = wrapper.findAll('.genre-list__title').map(el => el.text())

    expect(genreTitles).toEqual(['Drama'])
  })

  it('renders ShowCard components for each show in a genre', () => {
    const showCards = wrapper.findAllComponents(ShowCardMock)

    expect(showCards.length).toBe(1)  // Only one show in the 'Drama' genre
    expect(showCards[0].props('show').name).toBe('Show 1')
  })

  it('calls loadShows on mount', () => {
    expect(store.loadShows).toHaveBeenCalled()
  })

  it('does not render ShowCard components for genres with no shows', () => {
    const comedySection = wrapper.findAllComponents(ShowCardMock).filter(card => card.props('show').genres.includes('Comedy'))

    expect(comedySection.length).toBe(0)  // No shows for 'Comedy' genre
  })
})