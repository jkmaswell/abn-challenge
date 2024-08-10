import SearchBar from '@/components/SearchBar.vue'
import { useTvShowsStore } from '@/stores/showsStore'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/store/tvShowsStore', () => ({
  useTvShowsStore: () => ({
    searchQuery: '',
  }),
}))

describe('SearchBar.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders input element correctly', () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input[type="text"]')

    expect(input.exists()).toBe(true)
  })

  it('binds input value to query', async () => {
    const store = useTvShowsStore()
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input[type="text"]')
    
    await input.setValue('Breaking Bad')
    expect(wrapper.vm.query).toBe('Breaking Bad')
    expect(store.searchQuery).toBe('Breaking Bad')
  })

  it('updates store searchQuery when input value changes', async () => {
    const store = useTvShowsStore()
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input[type="text"]')

    await input.setValue('Friends')
    expect(store.searchQuery).toBe('Friends')
  })

  it('matches snapshot', () => {
    const wrapper = mount(SearchBar)

    expect(wrapper.html()).toMatchSnapshot()
  })
})