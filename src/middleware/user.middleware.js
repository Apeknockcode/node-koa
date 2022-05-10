// 用户模块的中间件
/**
 *  创建userValidator 这个校验函数
 * */
const { getUserInfo } = require('../service/user.service')
const { userFormatError, userAlreadyExited, userRegisterError } = require('../constant/err.type')
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 合法性
    if (!user_name || !password) {
        // 返回错误  
        console.error('用户名或者密码为空', ctx.request.body)
        // ctx.status = 400
        // ctx.body = {
        //     code: '10001',
        //     message: '用户名或者密码为空',
        //     result: ''
        // }
        ctx.app.emit('error', userFormatError, ctx)
        return
    }

    await next()
}


const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    /**
     *  合理性
     * 1.查询用户名是否存在, 存在的话 就返回return ，不存在继续执行
     * */
    console.error('用户名已经存在', await getUserInfo({ user_name }))
    // if (await getUserInfo({ user_name })) {
    //     ctx.status = 409
    //     // ctx.body = {
    //     //     code: '10002',
    //     //     message: '用户已经存在',
    //     //     result: ''
    //     // }
    //     ctx.app.emit('error', userAlreadyExited, ctx)
    //     return
    // }
    // 优化 
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            console.error('用户名已经存在', user_name)
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('用户注册错误', error)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}
module.exports = {
    userValidator,
    verifyUser
}