const fs = require('fs')
const path = require('path')
const express = require('express')
const server = express()

server.get('*', (req, res) => {
  renderToString(
    {
      data: {
        content: '',
        image: '',
      },
      handle: async (data) => {
        await sleep(0)
        data.content = '第一个标题，第一个描述'
        data.image = 'https://images.xxapi.cn/images/head/5685183276.jpg'
        return data
      },
      template: fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8'), // 服务端渲染数据
    },
    (html) => res.end(html),
  )
})

server.listen(8010, () => {
  console.log('访问中：http://127.0.0.1:8010')
})

const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
/**
 * 双括号替换值
 * @example
 * const str="姓名：{{name}},性别：{{gender}},年龄：{{age}}"
 * const data={name:"小红",gender:"女",age:2}
 * console.log(renderReplace(str,data)) // 姓名：小红,性别：女,年龄：2
 */
const renderReplace = (str, data) => {
  const re = /{{([^}]+)?}}/g
  return str.replace(re, ($0, $1, $2) => {
    if ($1 in data) return data[$1]
  })
}

const renderToString = async (options, cb) => {
  const { template, data, handle } = options
  const newData = await handle(data)
  const html = renderReplace(template, newData)
  cb(html)
}
