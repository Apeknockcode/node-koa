// 
const { JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken')
const { tokenExpiredError, invalidToken } = require('../constant/err.type')
const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace("Bearer", '')
    try {
        //  user 包含 payload的信息
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case "TokenExpiredError":
                console.error("Token 已经过期", error)
                return ctx.app.emit("error", tokenExpiredError, ctx)
            case "JsonWebTokenError":
                console.error("无效的Token", error)
                return ctx.app.emit("error", invalidToken, ctx)
        }
    }
    // console.log('token', token)

    await next()
}
module.exports = {
    auth
}