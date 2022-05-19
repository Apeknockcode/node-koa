const parameter = require('koa-parameter');
const { goodsFormatError, hasGoodsExited, createGoodsFail } = require("../constant/err.type")
const { GetGoodsInfo }= require("../service/goods.service")
// 校验参数是否为空
const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: { type: "string", require: true },
            goods_price: { type: "number", require: true },
            goods_num: { type: "number", require: true },
            goods_image: { type: "string", require: true },
        });
    } catch (error) {
        console.error('error', error)
        goodsFormatError.result=error
        return ctx.app.emit("error",goodsFormatError,ctx)
    }
    await next()
}
// 判断商品名称 是否重复

const  verificationNameRepeat = async (ctx, next) => { 
    const { goods_name } = ctx.request.body
    try {
        const res = await GetGoodsInfo({ goods_name })
        if (res) { 
            console.error("商品名称已经存在", { goods_name });
            return ctx.app.emit("error",hasGoodsExited,ctx)
        }
    } catch (error) {
        console.error(error);
        return ctx.app.emit('error', createGoodsFail, ctx)
    }
    await next()
}
module.exports = {
    validator,
    verificationNameRepeat
}