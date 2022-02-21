<template>
  <div class="product-detail__page">
    <div class="product-detail__inner">
      <div class="upper">
        <h1 class="title">
          {{ product.title }}
        </h1>
        <p class="created-date">{{ product.createdDate }}</p>
      </div>
      <div class="carousel__wrapper">
        <swiper
          ref="swiperRef"
          :options="swiperOptions"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            v-for="(content, i) in product.contents"
            :key="'slide' + i"
          >
            <div class="swiper-slide__inner">
              <img
                :src="content.image.url"
                class="swiper-slide__img"
                alt="content image"
                width="100%"
                height="100%"
              />
            </div>
          </swiper-slide>
        </swiper>
        <ThumbnailPagination
          :thumbnails="
            product.contents.map((content) => {
              return content.image.url
            })
          "
          :active-index="activeIndex"
          @onPaginationClick="changeCurrentSlide"
        />
      </div>
      <div class="descriptions-group">
        <p
          v-for="(content, i) in product.contents"
          :key="`desc-${i}`"
          class="description"
        >
          {{ content.description }}
        </p>
        <div v-if="product.url" class="product-url__wrapper">
          <p>サイトのURL:</p>
          <a
            :href="product.url"
            target="_blank"
            rel="noopener noreferrer"
            class="product-url"
          >
            <p>{{ product.url }}</p>
          </a>
        </div>
        <div v-if="product.github_url" class="product-url__wrapper">
          <div class="icon__wrapper">
            <img
              src="@/assets/images/logo/webp/github-black.webp"
              alt="github icon"
              width="auto"
              height="100%"
            />
          </div>
          <a
            :href="product.github_url"
            target="_blank"
            rel="noopener noreferrer"
            class="product-url"
          >
            <p>{{ product.github_url }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SwiperClass from 'swiper'
import { defineComponent, PropType, ref } from '@vue/composition-api'
import ThumbnailPagination from '@/components/v1/molecules/ThumbnailPagination.vue'
import { SwiperDOM } from '~/@types/Swiper'
import { Product } from '~/@types/Product'
export default defineComponent({
  components: { ThumbnailPagination },
  props: {
    product: {
      type: Object as PropType<Product>,
      require: true,
    },
  },
  setup(_props) {
    const swiperRef = ref<SwiperDOM>()
    const activeIndex = ref<number>(0)

    const swiperOptions = {
      slidesPerView: 1,
      spaceBetween: 70,
      centeredSlides: true,
    }
    const changeSlideIndex = (i: number) => {
      activeIndex.value = i
    }
    const onSlideChange = (e: SwiperClass) => {
      changeSlideIndex(swiperRef.value?.$swiper.activeIndex)
    }
    const changeCurrentSlide = (i: number) => {
      swiperRef.value!.$swiper.slideTo(i)
    }
    return {
      swiperOptions,
      swiperRef,
      activeIndex,
      changeCurrentSlide,
      onSlideChange,
    }
  },
})
</script>
<style scoped lang="scss">
.product-detail__page {
  padding-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;

  .product-detail__inner {
    width: 80%;
    min-height: 100vh;
    margin: 40px 0;
    padding: 60px 15%;

    .upper {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;

      .title {
        margin-top: 16px;
      }

      .created-date {
        color: grey;
        margin-top: 8px;
      }
    }
  }

  .carousel__wrapper {
    padding: 0 0%;

    .swiper-slide__inner {
      background: $secondary__thin;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8%;

      .swiper-slide__img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        box-shadow: 0 0 20px rgb(89 89 89 / 60%);
      }
    }
  }

  .descriptions-group {
    margin-top: 5%;

    p {
      font-size: 18px;
    }

    .description {
      white-space: pre-line;
      line-height: 30px;
    }

    .product-url__wrapper {
      display: flex;
      margin-top: 2%;
      align-items: center;

      .icon__wrapper {
        display: flex;
        align-items: center;
        height: 22px;

        img {
          height: 100%;
          margin-right: 3px;
        }
      }

      .product-url {
        font-weight: bold;
        color: $primary;
        display: block;
        text-decoration: none;
        margin-left: 4px;
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@include tab {
  .product-detail__page {
    .product-detail__inner {
      padding: 0;
    }
  }
}

@include sp {
  .product-detail__page {
    .descriptions-group {
      padding: 0 5%;
      margin-top: 0;

      .descriptions-group__created-date {
        margin-top: 10px;
      }

      p {
        font-size: 14px;
      }
    }

    .swiper-slide__inner {
      padding: 6% 8% !important;
      height: unset !important;
    }
  }
}
</style>
