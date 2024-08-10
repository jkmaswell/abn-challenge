import ShowCard from '@/components/ShowCard.vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { RouterLinkMock } from './mocks/RouterLinkMock'

describe('ShowCard.vue', () => {
  let wrapper: ReturnType<typeof mount>
  
  beforeEach(() => {
    const show = {
      id: 1,
      name: 'Test Show',
      image: { medium: 'https://example.com/image.jpg' },
      rating: { average: 8.5 },
    }

    wrapper = mount(ShowCard, {
      props: { show },
      global: {
        components: {
          RouterLink: RouterLinkMock,
        },
      },
    })

  })
  it('renders the show name, image, and rating correctly', () => {
    expect(wrapper.find('.show-card__title').text()).toBe('Test Show')
    expect(wrapper.find('.show-card__rating').text()).toBe('Rating: 8.5')
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/image.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('Test Show')
  })

  it('generates the correct link to the show details page', () => {
    const routerLink = wrapper.findComponent(RouterLinkMock)

    expect(routerLink.attributes('href')).toBe('/show/1')
  })

  it('handles missing image or rating gracefully', () => {
    const show = {
      id: 1,
      name: 'No Image Show',
      image: null,
      rating: { average: null },
    }

    wrapper = mount(ShowCard, {
      props: { show },
      global: {
        components: {
          RouterLink: RouterLinkMock,
        },
      },
    })

    const img = wrapper.find('img')

    expect(img.exists()).toBe(false) // No image element should be rendered

    const rating = wrapper.find('.show-card__rating')

    expect(rating.text()).toBe('Rating:')
  })
})