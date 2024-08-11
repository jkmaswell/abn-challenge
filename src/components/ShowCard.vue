<script setup lang="ts">
import type { Show } from '@/types/show'
import { defineProps } from 'vue'

interface Props {
  show: Show;
}

const props = defineProps<Props>()
</script>

<template>
  <div class="show-card">
    <img
      v-if="props.show.image?.medium"
      :src="props.show.image?.medium"
      :alt="props.show.name"
      class="show-card__image"
    >
    <div class="show-card__content">
      <h3 class="show-card__title">
        {{ props.show.name }}
      </h3>
      <p class="show-card__rating">
        Rating: {{ props.show.rating.average }}
      </p>
      <RouterLink
        :to="`/show/${props.show.id}`"
        class="show-card__link"
      >
        View Details
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.show-card {
  overflow: hidden;
  border: 0.1rem solid $border-color;
  border-radius: 0.8rem;
  box-shadow: 0 0.5rem 1rem rgba($shadow-color, 10%);
  inline-size: 100%;
  max-inline-size: 20rem;
  min-inline-size: 20rem;

  &__image {
    block-size: auto;
    inline-size: 100%;
  }

  &__content {
    padding: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.6rem;
  }

  &__rating {
    color: $rating-color;
    font-size: 1.4rem;
  }

  &__link {
    color: $primary-color;
    font-weight: bold;
    text-decoration: none;
  }
}
</style>