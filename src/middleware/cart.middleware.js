const { InvalidID } = require('../constant/err.type')
const { goodsLegality } = require('../service/cart.service')
const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_id: { type: "number", require: true },
        })
    } catch (error) {
        console.error(error);
        InvalidID.result = error
        return ctx.app.emit("error", InvalidID, ctx)

    }
    await next()
}

const isGoodsID = async (ctx, next) => { 
    const { goods_id } = ctx.request.body
    
    try {

        const res = await goodsLegality({ id: goods_id })
        if (res) {
            console.error('商品id合法已经存在')
        } else { 
            return ctx.app.emit("error", InvalidID, ctx)
        }
    } catch (error) {
        console.error("检验商品id是否存在", error);
        return ctx.app.emit("error", InvalidID,ctx)
    }
    await next()
    
}
module.exports = {
    validator,
    isGoodsID
}