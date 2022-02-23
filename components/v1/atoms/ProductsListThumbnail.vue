<template>
  <nuxt-link
    class="link"
    :to="{ name: 'products-slug', params: { slug: product.slug } }"
  >
    <div class="thumbnail" :class="{ '--active': isActive }">
      <img :src="url" alt="thumbnail" width="100%" height="auto" />
      <div />
    </div>
  </nuxt-link>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    url: { type: String, required: true },
    product: { type: Object, required: true },
  },
  setup(props) {
    const isActive = ref(false)
    return { isActive }
  },
})
</script>
<style scoped lang="scss">
.link {
  display: block;
  width: 33.3%;
  height: 250px;
}
.thumbnail {
  opacity: 1;
  width: 100%;
  height: 100%;
  filter: grayscale(100%) brightness(80%);
  transition: 0.7s;
  cursor: pointer;
  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  &:hover {
    filter: grayscale(0%) brightness(100%);
    transition: 0.7s;
  }
  &.--active {
    opacity: 1;
    transition: 0.8s;
    animation: fadeIn;
    animation-duration: 0.8s;
  }
}

@keyframes fadeIn {
  0% {
    transform: translateY(100px);
  }

  100% {
    transform: translateY(0);
  }
}

@include tab {
  .link {
    width: 100%;
  }
}
</style>
