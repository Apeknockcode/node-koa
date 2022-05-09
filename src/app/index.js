const Koa = require('koa')
const KoaBody = require('koa-body')
const userRouter = require("../router/user.route")
const errHandler = require('./errHandler')
const app = new Koa()
app.use(KoaBody())
app.use(userRouter.routes())
/**
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以 
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
*/

// 进行统一的错误处理
app.on('error', errHandler)


module.exports = app