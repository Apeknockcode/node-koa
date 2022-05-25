// 导入koa-router
const Router = require("koa-router")
// 加载需要的中间件
const { auth } = require("../middleware/auth.middleware")
const { validator  } =require("../middleware/cart.middleware")
// 实例化router对象
const router = new Router({ prefix: "/carts" })
// 编写路有规则
router.post("/", auth, validator, (ctx, next) => {
    ctx.body = {
        code: 0,
        message: '添加购物车成功',
        result: ''
    }
})
// 导出router对象
module.exports = router
