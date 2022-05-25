const { InvalidID } = require('../constant/err.type')
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
module.exports = {
    validator
}