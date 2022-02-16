<template>
  <div>
    <div>{{ content }}</div>
    <img :src="image" />
    <div>{{ title }}</div>
  </div>
</template>

<script>
import { sleep } from './utils/index'
export default {
  async asyncData() {
    await sleep(5000)
    return {
      content: '第一个标题，第一个描述',
      image: 'https://sponsors.vuejs.org/images/nuxt.avif',
    }
  },
  data() {
    return {
      title: '',
    }
  },
  async created() {
    await sleep(2000)
    this.title = '这个标题在客户端渲染时才会显示'
  },
}
</script>
