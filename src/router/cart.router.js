// 导入koa-router
const Router = require("koa-router")
// 加载需要的中间件
const { auth } = require("../middleware/auth.middleware")
const { validator, isGoodsID } = require("../middleware/cart.middleware")
// 控制器
const { add, findAll, update } = require("../controller/car.controller")
// 实例化router对象
const router = new Router({ prefix: "/carts" })
// 编写路有规则
router.post("/", auth, validator({ goods_id: { type: "", required: true } }), isGoodsID, add)

// 获取购物车列表
router.get("/list", auth, findAll)
// 更新购物车
router.patch("/:id", auth, validator(
    {
        number: { type: 'number', required: false },
        selected: { type: 'number', required: false }
    }),
    update
)
// 导出router对象

module.exports = router
