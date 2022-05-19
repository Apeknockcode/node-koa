const Router = require('koa-router')
const { validator } = require("../middleware/goods.middleware")
const { auth, hadAdminPermission } = require("../middleware/auth.middleware")
const { parityBit } = require("../middleware/uploadType.middleware")
const router = new Router({ prefix: "/goods" })
const { upload, create } = require("../controller/goods.controller")

// 商品图片上传接口
router.post("/upload", auth, hadAdminPermission, parityBit, upload)

// 发布商品接口
router.post("/", auth, hadAdminPermission, validator, create)

module.exports = router