// 用户模块的中间件
/**
 *  创建userValidator 这个校验函数
 * */
const bcrypt = require("bcryptjs")

const { getUserInfo } = require('../service/user.service')
const { userFormatError, userAlreadyExited, userRegisterError, noExitedUserName, userLoginError, invalidPassWord } = require('../constant/err.type')

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
    // console.error('用户名已经存在', await getUserInfo({ user_name }))
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
            console.error('用户名已经存在', { user_name })
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
// 创建一个加密的中间件
const bcryptPassWord = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10) // 10次加盐
    const hash = bcrypt.hashSync(password, salt); // 加密 - 保存的是密文
    ctx.request.body.password = hash
    await next()
}

// 验证登陆的中间件
const verifyLogin = async (ctx, next) => {
    // 判断用户是否存在
    const { user_name, password } = ctx.request.body // 获取用户名和密码
    try {
        const res = await getUserInfo({ user_name })
        if (!res) {
            console.error('用户名不存在', { user_name })
            ctx.app.emit('error', noExitedUserName, ctx)
            return
        }
        // 比对用户密码是否匹配
        // 解析密码   bcrypt.compareSync(${用户输入的密码}, ${数据库中的密码})
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('用户名密码不匹配', { user_name })
            ctx.app.emit("error", invalidPassWord, ctx)
            return
        }
    } catch (error) {
        console.error('用户名登陆错误', error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }



    await next()
}
module.exports = {
    userValidator,
    verifyUser,
    bcryptPassWord,
    verifyLogin
}