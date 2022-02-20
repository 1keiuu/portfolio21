<template>
  <div class="provider">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import ArticlesStoreKey from '@/components/v1/storeKeys/ArticlesStoreKey'
import ArticleStore from '~/store/articles'

export default defineComponent({
  setup(_props, _context) {
    provide(ArticlesStoreKey, ArticleStore())
    return {}
  },
})
</script>
<style lang="scss" scoped>
.provider {
  widows: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
