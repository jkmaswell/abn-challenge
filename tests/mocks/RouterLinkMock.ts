import { defineComponent, h } from 'vue'

// Mock RouterLink component
export const RouterLinkMock = defineComponent({
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => h('a', { href: typeof props.to === 'string' ? props.to : props.to.path }, slots.default && slots.default())
  },
})