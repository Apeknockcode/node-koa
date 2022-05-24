const Router = require('koa-router')
const { validator, verificationNameRepeat } = require("../middleware/goods.middleware")
const { auth, hadAdminPermission } = require("../middleware/auth.middleware")
const { parityBit } = require("../middleware/uploadType.middleware")
const router = new Router({ prefix: "/goods" })
const { upload, create, update, remove, restore, findAllDate } = require("../controller/goods.controller")

// 商品图片上传接口
router.post("/upload", auth, hadAdminPermission, parityBit, upload)

// 发布商品接口
router.post("/", auth, hadAdminPermission, validator, verificationNameRepeat,create)

// 修改商品接口
router.put("/:id", auth, hadAdminPermission, validator, update)

// 删除商品 （硬删除）
// router.delete("/:id", auth, hadAdminPermission, remove)

// 上下架商品
router.post("/:id/off", auth, hadAdminPermission, remove)

router.post("/:id/on", auth, hadAdminPermission, restore)

// 获取商品类列表
router.post("/goodsList",findAllDate)

module.exports = router