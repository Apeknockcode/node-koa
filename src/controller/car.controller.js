const { createOrUpdate } = require('../service/cart.service')
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
}
module.exports = new CartController()