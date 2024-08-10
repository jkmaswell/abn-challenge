import SearchResults from '@/components/SearchResults.vue'
import { TvShowsStore, useTvShowsStore } from '@/stores/showsStore'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { RouterLinkMock } from './mocks/RouterLinkMock'
import { ShowCardMock } from './mocks/ShowCardMock'

describe('SearchResults.vue', () => {
  let wrapper: ReturnType<typeof mount>
  let store: TvShowsStore

  beforeEach(() => {
    setActivePinia(createPinia())

    store = useTvShowsStore() as TvShowsStore

    store.shows = [
      { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 7.5 }, image: { original: '', medium: '' }, summary: '' },
    ]

    wrapper = mount(SearchResults, {
      global: {
        components: {
          RouterLink: RouterLinkMock,
        },
      },
    })
  })

  it('renders "No results found" message when filteredShows is empty', async () => {
    store.searchQuery = 'abc'

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('No results found.')
    expect(wrapper.find('.search-results__list').exists()).toBe(false)
  })

  it('renders ShowCard components when filteredShows has data', async () => {
    store.searchQuery = 'Show'

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.search-results__empty').exists()).toBe(false)

    const showCardComponents = wrapper.findAllComponents(ShowCardMock)

    expect(showCardComponents).toHaveLength(1)
  })
})