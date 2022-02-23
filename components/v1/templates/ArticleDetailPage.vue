<template>
  <div class="article-detail">
    <div class="article-detail__inner">
      <div class="article-detail__content">
        <nuxt-content :document="article" />
      </div>
      <ContentPagination :next="next" :prev="prev" />
    </div>

    <ContentsTable :article="article" />
    <ReadingTimeCard :reading-time="readingTime" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, onMounted } from '@vue/composition-api'
import { IContentDocument } from '@nuxt/content/types/content'
import ContentPagination from '@/components/v1/organisms/ContentPagination.vue'
import ContentsTable from '@/components/v1/organisms/ContentsTable.vue'
import ReadingTimeCard from '@/components/v1/molecules/ReadingTimeCard.vue'
export default defineComponent({
  name: 'ChipGroup',
  components: {
    ContentPagination,
    ContentsTable,
    ReadingTimeCard,
  },
  props: {
    article: { type: Object as PropType<IContentDocument> },
    prev: { type: Object as PropType<IContentDocument> },
    next: { type: Object as PropType<IContentDocument> },
  },
  setup(props) {
    const readingTime = props.article?.readingTime
      ? props.article?.readingTime
      : 0

    onMounted(() => {
      const readingTimeSp = document.getElementById('readingTimeSp')
      if (!readingTimeSp) return
      readingTimeSp.textContent = Math.round(readingTime / 1000) + 'min'
    })

    return { readingTime }
  },
})
</script>
<style scoped lang="scss">
.article-detail {
  display: flex;
  justify-content: center;
  margin-top: 80px;

  .article-detail__inner {
    width: 70%;

    .article-detail__content {
      background: white;
      padding: 5vh 100px 5vw;
    }
  }
}

::v-deep .nuxt-content {
  h1,
  h2,
  h3,
  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 19px;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
  }

  li {
    font-size: 18px;
    margin-top: 12px;
  }

  p {
    font-size: 17px;
    line-height: 36px;
    margin: 30px 0;
  }

  .img__wrapper {
    display: flex;
    justify-content: center;
    margin: 40px 0;

    img {
      width: 85%;
      border-radius: 10px;
    }
  }

  blockquote {
    display: flex;
    margin: 30px 0;

    p {
      padding: 8px 12px;
      background: #fafafa;
      margin: 0;
    }

    &::before {
      content: '';
      border-left: 5px solid lightgrey;
    }
  }

  .info {
    margin-bottom: 40px;

    p {
      margin: 0;
    }

    .info__inner {
      display: flex;
      justify-content: space-between;
      position: relative;

      .created-date {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: fit-content;

        p {
          margin-left: 8px;
          color: grey;
        }
      }
    }
  }

  .reading-time {
    &.--sp {
      display: none;
    }
  }

  .thumbnail__wrapper {
    .thumbnail {
      border-radius: 10px;
      width: 100%;
      height: auto;
      margin: 0;
    }
  }

  .sns-link__group {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  @include sp {
    h1,
    h2,
    h3,
    h4 {
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      line-height: 30px;
      margin-bottom: 10px;
    }

    a {
      font-size: 16px;
    }

    .created-date {
      position: absolute;
      top: 100%;
    }
  }
}

@include tab {
  .article-detail {
    .article-detail__inner {
      width: 95%;

      .article-detail__content {
        padding: 10px 16px;
      }
    }

    .contents-table {
      display: none;
    }

    .reading-time__card {
      display: none;
    }
  }

  ::v-deep .nuxt-content {
    .info {
      margin-bottom: 20px;

      .reading-time {
        justify-content: flex-end;

        &.--sp {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          p {
            margin-left: 4px;
            margin-bottom: 0;
            color: #333;
          }
        }
      }
    }

    .created-date {
      position: absolute;
      top: 100%;
    }
  }
}
</style>
