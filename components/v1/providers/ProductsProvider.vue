<template>
  <div class="provider">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import ProductsStoreKey from '@/components/v1/storeKeys/ProductsStoreKey'
import ProductsStore from '~/store/products'

export default defineComponent({
  setup(_props, _context) {
    provide(ProductsStoreKey, ProductsStore())
    return {}
  },
})
</script>
<style lang="scss" scoped>
.provider {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
