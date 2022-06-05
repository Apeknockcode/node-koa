// 导入koa-router 包
const Router = require("koa-router")
// 校验用户是否登录
const { auth } = require("../middleware/auth.middleware")
// 校验接口一的格式
const { validator } = require("../middleware/addr.middleware")
const { createAddress, list, updateAddress, removeAddress, setDefault } = require("../controller/addr.controller")
// 实例化对象
const router = new Router({ prefix: '/address' })
// 编写路由规则

// 接口一：添加地址，
router.post('/', auth, validator({
    consignee: { type: "string", required: true },
    phone: { type: 'string', format: /^1\d{10}$/ },
    address: { type: 'string', required: true }
}),
    createAddress
)
// 接口二： 获取对应用户的列表接口
router.post("/list", auth, list)

// 接口三；更新地址接口
router.post("/update", auth, validator({
    id: { type: "number", required: true },
    consignee: { type: "string", required: true },
    phone: { type: "string", format: /^1\d{10}$/ },
    address: { type: 'string', required: true }
}), updateAddress)

// 接口四：删除地址接口
router.delete("/:id", auth, removeAddress)

// 接口五：设置默认接口
router.patch("/:id",auth,setDefault)
// 导出路由对象
module.exports = router