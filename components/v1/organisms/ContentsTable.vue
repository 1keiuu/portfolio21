<template>
  <div class="contents-table">
    <Card>
      <h4>目次</h4>
      <ul ref="linkGroupRef">
        <li
          v-for="link of toc"
          :key="link.id"
          :class="{ '--disabled': link.depth !== 2 }"
          class="link-item"
        >
          <NuxtLink
            v-if="link.depth == 2"
            v-scroll-to="{
              el: `#${link.id}`,
              onStart: changeActiveLink,
            }"
            to="#"
            >{{ link.text }}</NuxtLink
          >
          <p v-else>{{ `・${link.text}` }}</p>
        </li>
      </ul>
    </Card>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api'
import { IContentDocument } from '@nuxt/content/types/content'
import Card from '@/components/v1/molecules/Card.vue'

export default defineComponent({
  props: {
    article: { type: Object as PropType<IContentDocument> },
  },
  components: {
    Card,
  },
  setup(props, _context) {
    const linkGroupRef = ref<HTMLElement>()
    const changeActiveLink = (clickedLink: HTMLElement) => {
      if (!linkGroupRef.value) return
      for (let i = 0; i < linkGroupRef.value?.children?.length; i++) {
        const link = linkGroupRef.value?.children[i]
        const targetLink = link.children[0]
        targetLink.classList.remove('--active')
        if (clickedLink.id === targetLink.textContent) {
          targetLink.classList.add('--active')
        }
      }
    }
    const toc = props.article?.toc ? props.article?.toc : []
    return { linkGroupRef, changeActiveLink, toc }
  },
})
</script>
<style scoped lang="scss">
.contents-table {
  position: fixed;
  right: 50px;
  top: 180px;
  width: 15%;

  h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }

  ul {
    padding-left: 30px;

    li {
      list-style: circle;
      margin-bottom: 3px;
      font-weight: bold;
      color: grey;
      font-size: 12px;

      a {
        text-decoration: none;
        color: grey;

        &.--active {
          font-weight: bold;
          color: $primary;
        }
      }

      &.--disabled {
        list-style-type: none;
        font-weight: unset;

        a {
          cursor: text;
        }
      }
    }
  }
}
</style>
