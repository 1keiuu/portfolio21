import { IContentDocument } from '@nuxt/content/types/content'

declare type Article = {
  id: Number
  thumbnail: string
  title: string
  description: string
  slug: string
  createdDate: string
  categories: string[]
  // eslint-disable-next-line camelcase
  category_ids: Number[]
}

declare type ArticleContent = IContentDocument & {}

declare type ArticleCategoryItem = {
  title: string
  count: number
  url: string
}

declare type Category = {
  id?: number
  title: string
  slug?: string
  count?: Number
  url?: string
}

declare type CategoryContent = IContentDocument & {
  categories: Category[]
}
