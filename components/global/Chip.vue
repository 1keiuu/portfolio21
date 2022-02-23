<template>
  <nuxt-link :to="'/articles/categories/' + slug" class="chip__link">
    <div class="chip" :style="`border:1px solid grey`">
      <p class="chip__text" :style="`color:grey`">{{ title }}</p>
    </div>
  </nuxt-link>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
.chip__link {
  text-decoration: none;
  margin-right: 8px;
  margin-bottom: 6px;

  .chip {
    display: flex;
    align-items: center;
    border-radius: 30px;
    padding: 5px 20px;
    height: 30px;

    .chip__text {
      font-size: 10px;
      font-weight: bold;
      margin: 0 !important;
    }
  }
}
</style>
