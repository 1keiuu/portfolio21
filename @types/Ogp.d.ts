declare type OGP = {
  title?: string
  description?: string
  url?: string
  image?: string
}

declare type QiitaArticleAPIResponse = {
  id: string
  url: string
  title: string
  tags: { name: string }[]
  // eslint-disable-next-line camelcase
  likes_count?: number
  // eslint-disable-next-line camelcase
  created_at?: string
}

declare type QiitaArticle = OGP & {
  id?: string
  likesCount?: number
  createdAt?: string
  isActive: boolean
  tags?: string[]
}
