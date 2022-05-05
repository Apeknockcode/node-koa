// 用户路由

const Router = require('koa-router')

// 实例化
const router = new Router({ prefix: '/users' })
const { register, login } = require("../controller/user.controller")
//ctx  上下文 context ，包含了request 和response等信息
//配置路由

// /users/
router.post("/register", register)

router.post("/login", login)


module.exports = router