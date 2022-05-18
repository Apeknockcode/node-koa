const Router = require('koa-router')

const { auth, hadAdminPermission } = require("../middleware/auth.middleware")
const { parityBit  } =require("../middleware/uploadType.middleware")
const router = new Router({ prefix: "/goods" })
const { upload } = require("../controller/goods.controller")

router.post("/upload", auth, hadAdminPermission, parityBit,upload)

module.exports = router