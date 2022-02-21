<template>
  <ArticlesProvider>
    <ArticlePage
      :articles="articles"
      :categories="categories"
      :title="title"
      :qiita-articles="qiitaArticlesArray"
    />
  </ArticlesProvider>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import firebase from 'firebase'
import { Context } from '@nuxt/types'
import ArticlePage from '@/components/v1/templates/ArticlePage.vue'
import ArticlesProvider from '@/components/v1/providers/ArticlesProvider.vue'
import { Article, Category, CategoryContent } from '~/@types/Article'
import { QiitaArticle, QiitaArticleAPIResponse } from '~/@types/Ogp'
export default defineComponent({
  components: {
    ArticlePage,
    ArticlesProvider,
  },
  async asyncData({ params, $content, $axios }: Context) {
    const articles = await $content('articles')
      .sortBy('createdDate', 'desc')
      .limit(7)
      .fetch()
    const categories: Category[] = []
    const categoryIds: Number[] = []
    const categoriesJson = await $content('categories').fetch<CategoryContent>()
    let title = ''
    articles.forEach((article: Article) => {
      if (article.category_ids) {
        article.category_ids.forEach((categoryId: Number) => {
          categoryIds.push(categoryId)
        })
      }
    })
    if (!Array.isArray(categoriesJson)) {
      categoriesJson.categories?.forEach((category: Category) => {
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
    }

    const articlesFromQiitaAPI = await $axios
      .get('https://qiita.com/api/v2/authenticated_user/items', {
        headers: {
          Authorization: `Bearer ${process.env.QIITA_API_KEY}`,
        },
      })
      .then(async (res) => {
        return await res.data
      })
      .catch((e) => {
        console.error(e)
      })
    const qiitaArticlesArray = reactive<QiitaArticle[]>([])

    // NOTE: データが既にDBに存在しているものについてもpostしている
    const createQiitaRecordToDB = async () => {
      await articlesFromQiitaAPI.forEach(
        (latestQiitaArticle: QiitaArticleAPIResponse) => {
          $axios
            .post(
              'https://asia-northeast1-portfolio21-56e7e.cloudfunctions.net/getOgpInfo',
              { url: latestQiitaArticle.url },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then(async (res) => {
              const qiitaArticle = {
                // qiitaAPIから取得した値
                id: latestQiitaArticle.id,
                url: latestQiitaArticle.url,
                likesCount: latestQiitaArticle.likes_count,
                createdAt: latestQiitaArticle.created_at,
                tags: latestQiitaArticle.tags.map((tag: { name: string }) => {
                  return tag.name
                }),
                // OGP情報取得functionsから取得した値
                title: latestQiitaArticle.title,
                description: res.data.ogp.description,
                image: res.data.ogp.image,
              }

              try {
                await firebase
                  .firestore()
                  .collection('qiita_articles')
                  .doc(qiitaArticle.id)
                  .update(qiitaArticle)
              } catch (e) {
                const target = Object.assign({ isActive: true }, qiitaArticle)
                await firebase
                  .firestore()
                  .collection('qiita_articles')
                  .doc(qiitaArticle.id)
                  .set(target)
              }
            })
            .catch((e) => console.error(e))
        }
      )
    }
    createQiitaRecordToDB()

    await firebase
      .firestore()
      .collection('qiita_articles')
      .where('isActive', '==', true)
      .limit(6)
      .get()
      .then(async (querySnapshot) => {
        await querySnapshot.forEach(async (doc: any) => {
          await qiitaArticlesArray.push(doc.data() as QiitaArticle)
        })
      })

    return { articles, categories, title, qiitaArticlesArray }
  },
})
</script>
