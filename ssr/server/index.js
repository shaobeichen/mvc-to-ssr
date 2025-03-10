const fs = require('fs')
const path = require('path')
const express = require('express')
const server = express()

server.get('*', async (req, res) => {
  const obj = {
    async asyncData() {
      const response = await fetch('https://v2.xxapi.cn/api/head')
      const { data } = await response.json()
      return {
        image: data,
      }
    },
    template: `
      <div>
        <div>{{content}}</div>
        <img :src="image" />
      </div>
    `,
    data() {
      return {
        content: '这个标题在服务端才能看到',
        image: '',
      }
    },
  }
  // 获取异步数据
  let asyncDataResult = {}
  if (obj.asyncData) {
    asyncDataResult = await obj.asyncData()
  }

  const Vue = require('vue/dist/vue.common.js')
  const app = new Vue({
    ...obj,
    data() {
      return {
        ...obj.data(),
        ...asyncDataResult, // 合并异步数据
      }
    },
  })

  // 创建一个 renderer
  const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8'),
  })
  //   将 Vue 实例渲染为 HTML
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8020, () => {
  console.log('访问中：http://127.0.0.1:8020')
})
