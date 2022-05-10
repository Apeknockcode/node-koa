// 用户路由

const Router = require('koa-router')

// 实例化
const router = new Router({ prefix: '/users' })
const { register, login } = require("../controller/user.controller")
const { userValidator, verifyUser, bcryptPassWord, verifyLogin } = require('../middleware/user.middleware')// 导入中间件
//ctx  上下文 context ，包含了request 和response等信息
//配置路由

// /users/
router.post("/register", userValidator, verifyUser, bcryptPassWord, register)

router.post("/login", userValidator,verifyLogin, login)


module.exports = router