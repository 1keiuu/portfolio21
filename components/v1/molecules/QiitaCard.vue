<template>
  <a
    v-if="qiita.isActive"
    :href="qiita.url"
    class="qiita-card__link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="qiita-card">
      <img :src="qiita.image" class="thumbnail" width="100%" height="auto" />
      <div class="inner">
        <div class="upper">
          <p class="created-at">{{ createdAt }}</p>
          <div class="likes-count__wrapper">
            <Icon icon-name="heart" color="#FF846B" :size="16" />
            <p class="likes-count__text">{{ qiita.likesCount }}</p>
          </div>
        </div>
        <p class="title">{{ qiita.title }}</p>
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import Icon from '@/components/v1/atoms/Icon.vue'
import { QiitaArticle } from '~/@types/Ogp'
export default defineComponent({
  components: { Icon },
  props: {
    qiita: {
      type: Object as PropType<QiitaArticle>,
      default: {},
    },
  },
  setup(props, context) {
    const createdAt = computed(() => {
      return context.root.$dayjs(props.qiita.createdAt).format('YYYY-MM-DD')
    })

    return { createdAt }
  },
})
</script>
<style scoped lang="scss">
.qiita-card__link {
  text-decoration: none;
  color: black;
  display: block;
  padding: 0 2%;
  width: calc(100% / 3);

  @include tab {
    width: calc(100% / 2);
  }

  @include sp {
    width: calc(100% / 1);
  }

  &:hover {
    .thumbnail {
      filter: opacity(0.7);
      transition: 0.4s;
    }
  }

  .qiita-card {
    background: white;
    border-radius: 8px;
    width: 100%;
    box-shadow: 0 0 20px rgba(89, 89, 89, 0.16);

    .thumbnail {
      width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .inner {
      min-height: 100px;
      padding: 25px;
      position: relative;

      .title {
        font-size: 14px;
      }

      .upper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        .created-at {
          color: grey;
        }

        .likes-count__wrapper {
          display: flex;
          align-items: center;

          .likes-count__text {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
