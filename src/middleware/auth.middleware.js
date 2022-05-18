// 
const { JWT_SECRET } = require('../config/config.default')
const jwt = require('jsonwebtoken')
const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require('../constant/err.type')

// 判断用Token 是否过期
const auth = async (ctx, next) => {
    const { authorization= '' } = ctx.request.header
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
    await next()
}

// 判断用户有没有权限上传图片
const hadAdminPermission = async (ctx, next) => {
    
    const { is_admin } = ctx.state.user
    
    if (!is_admin) {
        console.error("该用户没有管理员权限", ctx.state.user)
        return ctx.app.emit("error", hasNotAdminPermission, ctx)
    }

    await next()
}
module.exports = {
    auth,
    hadAdminPermission
}