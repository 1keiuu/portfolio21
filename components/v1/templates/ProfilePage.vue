<template>
  <div class="profile-page">
    <div class="profile-page__inner">
      <section class="top-view__wrapper">
        <div class="top-view__inner">
          <ProfileTitle />
          <ProfileThumbnail />
        </div>
        <div v-if="isPC" class="scroll-button__wrapper">
          <button
            class="scroll-button ripple"
            aria-label="Scroll"
            @click="handleScrollButtonClick"
          >
            <Icon icon-name="arrowDown" color="#333" />
          </button>
        </div>
      </section>
      <section id="second-view" class="second-view__wrapper">
        <ProfileCareerCard :career-nodes="careerNodes" />
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import ProfileCareerCard from '@/components/v1/molecules/ProfileCareerCard.vue'
import Icon from '@/components/v1/atoms/Icon.vue'
import ProfileTitle from '~/components/v1/molecules/ProfileTitle.vue'
import ProfileThumbnail from '~/components/v1/molecules/ProfileThumbnail.vue'
import { CareerNode, PersonalInformation } from '~/@types/Home'
export default defineComponent({
  components: {
    ProfileTitle,
    ProfileCareerCard,
    Icon,
    ProfileThumbnail,
  },
  props: {
    careerNodes: {
      type: Array as PropType<CareerNode[]>,
      default: [],
    },
    personalInfo: {
      type: Object as PropType<PersonalInformation>,
      default: () => {
        return {
          liveIn: '',
          age: 0,
          organisation: '',
        }
      },
    },
    isPC: {
      type: Boolean,
      default: false,
    },
  },
  setup(_props, context) {
    const handleScrollButtonClick = () => {
      context.emit('onScrollButtonClick', 'down')
    }
    return { handleScrollButtonClick }
  },
})
</script>
<style scoped lang="scss">
.profile-page {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;

  .profile-page__inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .top-view__wrapper {
      height: 100vh;
      width: 100%;
      position: relative;
      padding-top: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      max-width: 1400px;
      .top-view__inner {
        width: 75%;
        height: 100%;
        display: flex;
        margin-right: 120px;
        position: relative;
        align-items: center;
      }
      .scroll-button__wrapper {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        justify-content: center;

        .scroll-button {
          display: inline-block;
          background: #fff;
          font-size: 14px;
          border: 2px #333 solid;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          outline: 0;
          cursor: pointer;
        }

        .scroll-button.ripple {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .scroll-button.ripple::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          z-index: -1;
          background: #333;
          -webkit-animation: ripple 4s cubic-bezier(0.3, 0, 0.1, 0) infinite;
          animation: ripple 4s cubic-bezier(0.3, 0, 0.1, 0) infinite;
        }

        @keyframes ripple {
          0% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0;
          }

          10% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0.5;
          }

          30% {
            -webkit-transform: scale(1.6, 1.6);
            transform: scale(1.6, 1.6);
            opacity: 0;
          }

          31% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0;
          }

          50% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0.5;
          }

          70% {
            -webkit-transform: scale(1.6, 1.6);
            transform: scale(1.6, 1.6);
            opacity: 0;
          }

          71% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0;
          }

          90% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1);
            opacity: 0.5;
          }
        }
      }
    }

    .second-view__wrapper {
      width: 100%;
      height: 100vh;
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
}

@include tab {
  .profile-page {
    .profile-page__inner {
      width: 100%;
      display: block;

      .top-view__wrapper {
        align-items: flex-start;
        justify-content: center;
        padding: 80px 0 60px;
        width: 100%;
        margin-bottom: 80px;
        .top-view__inner {
          margin-right: 0;
        }
      }

      .second-view__wrapper {
        height: unset;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0 3%;
      }
    }
  }
}
@include tab {
  .profile-page {
    .profile-page__inner {
      .top-view__wrapper {
        .top-view__inner {
          width: 75%;
        }
      }
    }
  }
}
@include sp {
  .profile-page {
    .profile-page__inner {
      .top-view__wrapper {
        .top-view__inner {
          width: 100%;
        }
      }
    }
  }
}
</style>
