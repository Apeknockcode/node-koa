const Koa = require('koa') // 倒入依赖项 koa

// 导入自己的模块
const { APP_POST } = require("./config/config.default")

const app=require("./app")

//监听端口
app.listen(APP_POST, async () => {
    console.log(`server is running on http://localhost:${APP_POST}`)
})