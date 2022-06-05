const { addrFormatError } = require("../constant/err.type")

//校验地址接口的参数的格式
const validator = (rules) => { 
    return async (ctx, next) => { 
        // 捕获异常
        try {
            console.log(123)
            ctx.verifyParams(rules)
            console.log(123)
        } catch (error) {
            console.error(error)
            addrFormatError.result=error
            return ctx.app.emit("error", addrFormatError,ctx)
        }
        await next()
    }
}
module.exports = {
    validator
}