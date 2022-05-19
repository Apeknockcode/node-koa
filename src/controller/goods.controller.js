const path = require("path")

const { createGoods, updateGoods } = require("../service/goods.service")
const { fileUploadError, publishGoodsError, upDataFails } = require("../constant/err.type")
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
            //  解构 去除  updatedAt, createdAt
            const { updatedAt, createdAt, ...res } = await createGoods(ctx.request.body)

            if (res) {
                ctx.body = {
                    code: 0,
                    message: "发布商品成功",
                    result: res
                }
            }

        } catch (error) {
            console.error(error)
            return ctx.app.emit("error", publishGoodsError, ctx)
        }

    }

    async update(ctx, next) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: '',
                }
            } else { 
                return ctx.app.emit("error", upDataFails, ctx)
            }
        } catch (error) {
            console.error("error", error);
            return ctx.app.emit("error",upDataFails,ctx)
        }
        
       
    }
}

module.exports = new GoodsController()