
const { createOrUpdate, findCarts, updateCarts } = require('../service/cart.service')
const { cartFormatError } = require('../constant/err.type')
class CartController {
    async add(ctx) {
        // 添加到购物车
        // 解析数据 获取user_id goods_id
        const user_id = ctx.state.user.id
        const { goods_id } = ctx.request.body
        // console.log(user_id, goods_id)
        // 操作数据库

        try {
            const res = await createOrUpdate(user_id, goods_id) // 添加商品返回的数据信息
            // 返回结果
            ctx.body = {
                code: 0,
                message: '添加成功',
                result: res
            }

        } catch (error) {

        }



    }
    async findAll(ctx) {
        // 解析请求参数
        const { pageNumber = 1, pageSize = 10 } = ctx.request.params

        // 数据库查询
        const res = await findCarts(pageNumber, pageSize)

        // 返回查询结果
        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res
        }



    }

    async update(ctx) {
        // 解析参数
        const { id } = ctx.request.params
        const { number } = ctx.request.body
        if (number === undefined && select === undefined) {
            cartFormatError.message = "number 和 select 不能为空"

            return ctx.app.emit("error", cartFormatError, ctx)
        }
        // 操作数据库
        const res = await updateCarts({ id, number, select })
        // 返回查询结果
        ctx.body = {
            code: 0,
            message: "更新购物车",
            result:''
        }
    }
}
module.exports = new CartController()