<template>
  <div class="container">
    <ProfilePage
      :career-nodes="careerNodes"
      :personal-info="personalInfo"
      :is-p-c="isPC"
      @onScrollButtonClick="scrollWindow"
    />
  </div>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
} from '@vue/composition-api'
import ProfilePage from '@/components/v1/templates/ProfilePage.vue'
import { CareerNode, PersonalInformation } from '~/@types/Home'

export default defineComponent({
  components: {
    ProfilePage,
  },
  setup() {
    let startPos = 0
    // eslint-disable-next-line no-undef
    let timeoutId: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(timeoutId)
      // NOTE: timerを使う事でスクロール"終了時"にメソッドを呼べる
      timeoutId = setTimeout(() => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop
        const currentPos = scrollTop
        if (currentPos > startPos - 100) {
          scrollDown()
        } else {
          scrollUp()
        }
        startPos = currentPos
      }, 500)
    }
    const scrollUp = () => {
      scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
    const scrollDown = () => {
      scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth',
      })
    }
    const scrollWindow = (direction: string) => {
      if (direction === 'up') {
        scrollUp()
      } else {
        scrollDown()
      }
    }
    const isPC = ref(false)
    onMounted(() => {
      isPC.value = screen.width > 1040
      if (!isPC.value) return
      window.addEventListener('scroll', handleScroll)
    })
    onUnmounted(() => {
      if (!isPC.value) return
      window.removeEventListener('scroll', handleScroll)
    })
    return { isPC, scrollWindow }
  },
  async asyncData({ $content }) {
    const fetchData = await $content('profile').fetch()
    const careerNodes: CareerNode[] = fetchData.find(
      (item: IContentDocument) => {
        return item.slug === 'career'
      }
    )!.nodes
    const personalInfo: PersonalInformation = fetchData.find(
      (item: IContentDocument) => {
        return item.slug === 'about'
      }
    )
    const currentAge = computed(() => {
      const res = calculcateCurrentAge('1998-03-11 00:00:00')
      if (res) return res
      else return 23
    })
    const calculcateCurrentAge = (birthDay: string | number | Date) => {
      const diff = new Date(+Date.now() - +new Date(birthDay))
      return diff.getUTCFullYear() - 1970
    }
    personalInfo.age = currentAge.value

    return { careerNodes, personalInfo }
  },
})
</script>
