<template>
  <div class="article-card__group">
    <div class="inner">
      <ArticleCard
        v-for="(article, i) in articlesForDisplay"
        :key="`article${i}`"
        :article="article"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import ArticleCard from '@/components/v1/molecules/ArticleCard.vue'
import { Article } from '~/@types/Article'

export default defineComponent({
  components: {
    ArticleCard,
  },
  props: {
    articles: {
      type: Array as PropType<Article[]>,
      default: [],
    },
  },
  setup(props) {
    const articlesForDisplay = props.articles.slice(1, 7)

    return { articlesForDisplay }
  },
})
</script>
<style scoped lang="scss">
.article-card__group {
  display: flex;
  justify-content: center;

  .inner {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
