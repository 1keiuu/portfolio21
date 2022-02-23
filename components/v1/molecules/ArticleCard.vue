<template>
  <article class="article-card">
    <nuxt-link :to="'/articles/' + article.slug" class="article-card__inner">
      <img
        :src="article.thumbnail"
        class="thumbnail"
        alt="thumbnail"
        width="100%"
        height="auto"
      />
      <div class="card__inner">
        <div class="card__upper">
          <p class="createdAt">{{ article.createdDate }}</p>
          <div v-if="article.readingTime" class="reading-time__wrapper">
            <Icon iconname="clock" :size="14" />
            <p class="reading-time">
              {{ Math.round(article.readingTime / 1000) }}min
            </p>
          </div>
        </div>
        <h4 class="title">
          {{
            article.title.length > 29
              ? `${article.title.substring(0, 29)}…`
              : article.title
          }}
        </h4>
      </div>
    </nuxt-link>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { Article } from '~/@types/Article'
export default defineComponent({
  props: {
    article: {
      type: Object as PropType<Article>,
      default: {},
    },
  },
})
</script>
<style scoped lang="scss">
.article-card {
  padding: 0 1%;
  margin-top: 50px;
  width: calc(100% / 3);

  @include tab {
    width: calc(100% / 2);
  }

  @include sp {
    width: calc(100% / 1);
  }

  &:hover {
    .card__inner {
      .title {
        color: rgba(0, 0, 0, 0.737);
      }
    }

    .thumbnail {
      filter: opacity(0.7);
      transition: 0.4s;
    }
  }

  .article-card__inner {
    text-decoration: none;
    box-shadow: 0 0 20px rgba(89, 89, 89, 0.16);
    display: block;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .thumbnail {
      width: 100%;
      min-height: 140px;
      display: block;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .card__inner {
      padding: 25px 25px;
      min-height: 140px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background: white;

      .card__upper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;

        .createdAt {
          font-size: 14px;
          color: grey;
        }

        .reading-time__wrapper {
          display: flex;
          align-items: center;

          .reading-time {
            margin-left: 3px;
            font-size: 14px;
            color: grey;
          }
        }
      }

      .title {
        color: black;
      }
    }
  }
}
</style>
