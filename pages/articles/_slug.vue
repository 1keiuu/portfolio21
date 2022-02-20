<template>
  <ArticleDetailPage :article="article" :prev="prev" :next="next" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Context } from '@nuxt/types'
import generateArticleOgp from '../../plugins/generateArticleOgp'
import ArticleDetailPage from '@/components/v1/templates/ArticleDetailPage.vue'
import { Article } from '~/@types/Article'
export type OGP = {
  title: string
  description: string
  url: string
  image: string
}

export default defineComponent({
  components: { ArticleDetailPage },
  async asyncData({ params, $content }: Context) {
    const article = await $content('articles', params.slug).fetch()
    const [prev, next]: any = await $content('articles')
      .surround(params.slug)
      .fetch()
    // FIX: typeがカオス
    const fixedArticle = article as unknown as Article
    const ogpInfo: OGP = {
      title: fixedArticle.title,
      description: "1keiuu's Blog",
      url: 'https://portfolio21-56e7e.web.app/articles',
      image: '',
    }
    // await $axios
    //   .post(
    //     'https://us-central1-portfolio21-56e7e.cloudfunctions.net/createOgpImageAndSave',
    //     {
    //       title: fixedArticle.title,
    //       slug: fixedArticle.slug,
    //       name: '@1keiuu',
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data)
    //     ogpInfo.image = res.data.url
    //     ogpInfo.description = fixedArticle.description
    //     ogpInfo.title = fixedArticle.title
    //   })
    //   .catch((e) => console.error(e))
    ogpInfo.image = generateArticleOgp(fixedArticle.title)
    ogpInfo.description = fixedArticle.description
    ogpInfo.title = fixedArticle.title

    return { article, prev, next, ogpInfo }
  },
  head() {
    return {
      title: (this.article as Article).title,
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: (this.ogpInfo as OGP).description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.SITE_URL}/articles/${
            (this.article as Article).slug
          }`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: (this.ogpInfo as OGP).image,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: (this.ogpInfo as OGP).title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: (this.ogpInfo as OGP).description,
        },
      ],
    }
  },
})
</script>
