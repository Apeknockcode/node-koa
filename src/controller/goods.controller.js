const path = require("path")

const { createGoods } = require("../service/goods.service")
const { fileUploadError, publishGoodsError } = require("../constant/err.type")
class GoodsController {
    async upload(ctx, next) {


        const { file } = ctx.request.files

        if (file) {

            ctx.body = {
                code: 0,
                message: "上传成功",
                result: {
                    goods_img: path.basename(file.newFilename)
                }
            }
        } else {
            console.error("文件上传失败")
            return ctx.app.emit("error", fileUploadError, ctx)
        }

    }


    async create(ctx, next) {
        // 直接带哦用service  的 createGoods 的方法
        try {
            const res = await createGoods(ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "发布商品成功",
                    result: ''
                }
            }

        } catch (error) {
            console.error(error)
            return ctx.app.emit("error", publishGoodsError, ctx)
        }

    }
}

module.exports = new GoodsController()