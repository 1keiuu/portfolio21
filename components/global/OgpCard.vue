<template>
  <div class="ogp-card__wrapper">
    <a
      :class="{ '--disabled': !ogps[ogpindex].url }"
      :href="ogps[ogpindex].url"
      target="_blank"
      rel="noopener noreferrer"
      class="ogp-card__link"
    >
      <div class="ogp-card">
        <img
          v-lazy-load
          :src="ogps[ogpindex].image ? ogps[ogpindex].image : '/lazy.webp'"
          class="image"
          alt="ogp thumbnail"
          height="200px"
          width="200px"
        />
        <div class="ogp-card__inner">
          <h3 class="ogp-card__title">{{ ogps[ogpindex].title }}</h3>
          <p v-show="ogps[ogpindex].description" class="ogp-card__description">
            {{ ogps[ogpindex].description }}
          </p>
        </div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    ogpindex: { type: Number },
    ogps: { type: Array },
  },
})
</script>
<style scoped lang="scss">
.ogp-card__wrapper {
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;

  .ogp-card__link {
    text-decoration: none;
    color: #333;
    display: block;
    width: 100%;

    &.--disabled {
      pointer-events: none;
    }

    &:hover {
      box-shadow: 0 0 20px rgba(173, 173, 173, 0.285);
    }

    .ogp-card {
      display: flex;
      height: 150px;
      border: 1px solid #efefef;
      border-radius: 3px;

      .image {
        height: 150px;
        width: 150px;
        object-fit: contain;
        margin: 0;
      }

      .ogp-card__inner {
        height: 100%;
        padding: 8px 12px;
        overflow: hidden;

        .ogp-card__title {
          line-height: initial;
          margin-bottom: 10px;
        }

        .ogp-card__description {
          font-size: 13px;
          line-height: 1.1;
          color: grey;
          margin-bottom: 0;
        }
      }
    }
  }
}

@include tab {
  .ogp-card__wrapper {
    .ogp-card__link {
      width: 60%;

      .ogp-card {
        display: table;
        width: 100%;

        .image {
          height: 200px;
          width: 100%;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }

        .ogp-card__inner {
          .ogp-card__title {
            font-size: 13px;
          }

          .ogp-card__description {
            font-size: 11px;
          }
        }
      }
    }
  }
}

@include sp {
  .ogp-card__wrapper {
    .ogp-card__link {
      width: 95%;
    }
  }
}
</style>
