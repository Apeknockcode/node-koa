const path = require("path")

const { createGoods, updateGoods, removeGoods, restoreGoods, findGoods } = require("../service/goods.service")
const { fileUploadError, publishGoodsError, upDataFails, removeGoodsState } = require("../constant/err.type")
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
            return ctx.app.emit("error", upDataFails, ctx)
        }


    }
    // 上下架商品
    async remove(ctx) {
        try {
            const res = await removeGoods(ctx.params.id)
            console.log("result", res)
            if (res) {
                ctx.body = {
                    code: '0',
                    message: "下架商品成功",
                    result: ''
                }
            }

        } catch (error) {
            console.error(error)
            return ctx.app.emit("error", removeGoodsState, ctx)
        }

    }

    // 上下架商品
    async restore(ctx) {
        try {
            const res = await restoreGoods(ctx.params.id)
            console.log("result", res)
            if (res) {
                ctx.body = {
                    code: '0',
                    message: "上架商品成功",
                    result: ''
                }
            }

        } catch (error) {
            console.error(error)
            return ctx.app.emit("error", removeGoodsState, ctx)
        }

    }

    async findAllDate(ctx) {
        //获取用户传入的数据
        const { pageNum = 1, pageSize = 10 } = ctx.request.body
        try {
            const res = await findGoods(pageNum, pageSize)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "获取商品列表成功",
                    result: res
                }
            }

        } catch (error) {
            console.error(error);
        }

        // 调用数据处理相关的方法
        // 返回结果
    }

}

module.exports = new GoodsController()