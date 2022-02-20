<template>
  <ArticlesProvider>
    <ArticlePage
      :articles="filteredArticles"
      :categories="categories"
      :title="title"
      page-type="categories"
    />
  </ArticlesProvider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Context } from '@nuxt/types'
import ArticlePage from '@/components/v1/templates/ArticlePage.vue'
import ArticlesProvider from '@/components/v1/providers/ArticlesProvider.vue'
import {
  Article,
  ArticleContent,
  Category,
  CategoryContent,
} from '~/@types/Article'

export default defineComponent({
  components: {
    ArticlePage,
    ArticlesProvider,
  },
  async asyncData({ params, $content }: Context) {
    const categories: Category[] = []
    const categoryIds: Number[] = []
    const categoriesJson = await $content('categories').fetch<CategoryContent>()
    let title = ''
    const articles = await $content('articles')
      .sortBy('createdDate', 'desc')
      .fetch()
    if (Array.isArray(categoriesJson)) return {}

    const targetCategory = categoriesJson?.categories.find(
      (category: Category) => {
        return category.slug === params.slug
      }
    )

    const filteredArticles = articles.filter((article: Article) => {
      let id = 0
      if (targetCategory?.id) {
        id = targetCategory?.id
      }
      return article.category_ids.includes(id)
    })

    articles.forEach((article: ArticleContent) => {
      if (article.category_ids) {
        article.category_ids.forEach((categoryId: Number) => {
          categoryIds.push(categoryId)
        })
      }
    })
    categoriesJson?.categories?.forEach((category: Category) => {
      const count = categoryIds.filter((categoryId: Number) => {
        return category.id === categoryId
      }).length
      if (count === 0) return
      if (params.slug === category.slug) {
        title = category.title
      }
      categories.push({
        title: category.title,
        count,
        url: `/articles/categories/${category.slug}`,
      })
    })

    return { filteredArticles, categories, title }
  },
})
</script>
