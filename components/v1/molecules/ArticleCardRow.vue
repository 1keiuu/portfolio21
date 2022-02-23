<template>
  <div class="card">
    <img
      class="thumbnail"
      :src="content.thumbnail"
      alt="thumbnail"
      width="380px"
      height="200px"
    />
    <div class="inner">
      <p class="title">{{ content.title }}</p>
      <p class="created-at">{{ content.createdDate }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { IContentDocument } from '@nuxt/content/types/content'

export default defineComponent({
  props: {
    content: { type: Object as PropType<IContentDocument> },
  },
})
</script>
<style scoped lang="scss">
.card {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 20px rgba(89, 89, 89, 0.16);
  &:hover {
    .inner {
      .title {
        color: rgba(0, 0, 0, 0.737);
      }
    }

    .thumbnail {
      filter: opacity(0.7);
      transition: 0.4s;
    }
  }
  .thumbnail {
    height: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .inner {
    padding: 25px 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      color: black;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .created-at {
      color: grey;
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
}

@include sp {
  .card {
    flex-direction: column;
    width: 100%;

    .thumbnail {
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0;
      width: 100%;
    }
  }
}
</style>
