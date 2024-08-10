import { defineComponent } from 'vue'

// Mock ShowCard component
export const ShowCardMock = defineComponent({
  name: 'ShowCard',
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
  template: `<div class="mock-show-card">{{ show.name }}</div>`,
})