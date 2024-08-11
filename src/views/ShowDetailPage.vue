<script setup lang="ts">
import { ShowModel } from '@/models/ShowModel'
import type { Show } from '@/types/show'
import { onMounted, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'

// Composables 
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }
const router = useRouter()

// Data
const show = ref<Show | null>(null)

// Hooks
onMounted(async () => {
  try {
    show.value = await ShowModel.fetchShowById(Number(route.params.id))
  } catch (error) {
    router.push('/home')
  }
})
</script>

<template>
  <div class="show-detail-page container">
    <div class="show-detail-page__content">
      <div class="show-detail-page__image-container">
        <img
          :src="show?.image?.original"
          :alt="show?.name"
          class="show-detail-page__image"
        >
      </div>
      <div class="show-detail-page__info">
        <h1 class="show-detail-page__title">
          {{ show?.name }}
        </h1>
        <div class="show-detail-page__rating">
          <span class="show-detail-page__rating-label">Rating:</span>
          <span class="show-detail-page__rating-value">{{ show?.rating?.average || 'N/A' }}</span>
        </div>
        <div class="show-detail-page__genres">
          <span class="show-detail-page__genres-label">Genres:</span>
          <ul class="show-detail-page__genres-list">
            <li
              v-for="genre in show?.genres"
              :key="genre"
              class="show-detail-page__genre"
            >
              {{ genre }}
            </li>
          </ul>
        </div>
        <div class="show-detail-page__summary">
          <h2 class="show-detail-page__summary-title">
            Summary:
          </h2>
          <div
            class="show-detail-page__summary-content"
            v-html="show?.summary"
          />
        </div>
        <RouterLink
          to="/"
          class="show-detail-page__back-link"
        >
          Back to Dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.show-detail-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  &__content {
    display: flex;
    overflow: hidden;
    flex-direction: row;
    padding: 2rem;
    border-radius: 0.8rem;
    background: $content-color;
    box-shadow: 0 0 1rem rgba($shadow-color, 10%);
    gap: 2rem;

    @media (width <= 37.5rem) {
      flex-direction: column;
    }
  }

  &__image-container {
    overflow: hidden;
    flex: 1;
    max-inline-size: 18.75rem;
    
    @media (width <= 37.5rem) {
      max-inline-size: 100%;
    }
  }

  &__image {
    border-radius: 0.8rem;
    block-size: auto;
    inline-size: 100%;
    object-fit: cover;
  }

  &__info {
    display: flex;
    flex: 2;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__title {
    margin: 0;
    color: $title-color;
    font-size: 2.4rem;
  }

  &__rating {
    display: flex;
    align-items: center;
    color: $rating-color;
    font-size: 1.6rem;
    gap: 0.5rem;

    &-label {
      font-weight: bold;
    }

    &-value {
      font-weight: normal;
    }
  }

  &__genres {
    display: flex;
    flex-direction: column;
    color: $rating-color;
    font-size: 1.6rem;
    gap: 0.5rem;

    &-label {
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      gap: 0.5rem;
      list-style-type: none;
    }

    &-genre {
      border-radius: 0.4rem;
      background: $genre-color;
      padding-block: 0.5rem;
      padding-inline: 1rem;
    }
  }

  &__summary {
    color: $title-color;
    font-size: 1.6rem;

    &-title {
      font-size: 1.8rem;
      margin-block-end: 1rem;
    }

    &-content {
      line-height: 1.6;
    }
  }

  &__back-link {
    color: $primary-color;
    font-size: 1.6rem;
    font-weight: bold;
    margin-block-start: 2rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>