// 用户路由

const Router = require('koa-router')

// 实例化
const router = new Router({ prefix: '/users' })
const { register, login, changePassWord } = require("../controller/user.controller")
const { userValidator, verifyUser, bcryptPassWord, verifyLogin } = require('../middleware/user.middleware')// 导入中间件
const { auth}=require("../middleware/auth.middleware")
//ctx  上下文 context ，包含了request 和response等信息
//配置路由

// /users/
router.post("/register", userValidator, verifyUser, bcryptPassWord, register)

router.post("/login", userValidator, verifyLogin, login)
router.patch("/", auth, bcryptPassWord, changePassWord, (ctx, next) => {
   console.log('user',ctx.state.user)
    ctx.body="修改密码成功"
 })


module.exports = router