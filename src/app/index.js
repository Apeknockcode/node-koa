const path = require("path")
const Koa = require('koa')

const KoaBody = require('koa-body')
const Koastatic = require("koa-static")
const parameter = require('koa-parameter');
// const userRouter = require("../router/user.route")
// const goodsRouter= require('../router/goods.route')
const router= require("../router/index")
const errHandler = require('./errHandler')
const app = new Koa()

app.use(KoaBody({
    multipart: true,
    formidable: {
        //在配置选项中 不推荐使用相对路径,推荐使用绝对路径
        uploadDir: path.join(__dirname,"../uploads"),
        keepExtensions:true,
    }
}))

app.use(Koastatic(path.join(__dirname, "../uploads")))
app.use(parameter(app));

app.use(router.routes())
// app.user(goodsRouter.routes())
/**
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以 
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
*/

// 进行统一的错误处理
app.on('error', errHandler)

module.exports = app