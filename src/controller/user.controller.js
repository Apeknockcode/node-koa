var jwt = require('jsonwebtoken');
// 导入数据库 操作层
const { createUser, getUserInfo } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
    async register(ctx, next) {
        // 1.获取数据
        // 解构传递进来的数据
        const { user_name, password } = ctx.request.body
        //2。操作数据库
        try {
            const res = await createUser(user_name, password)
            // 3.返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功'
            }
        } catch (error) {
            console.error('error', error)
            ctx.app.emit('error', userRegisterError, ctx)
        }

    }

    async login(ctx, next) {
        const { user_name, password } = ctx.request.body
        /**
         * 解释token（JWT => JSON web Token）
         * 三个部分组成 
         *   1.Header （头部）
         *   2.Payload 负载）
         *   3.Signature (签名)
         * */
        // 1.获取用户信息 （在token 的 Payload 中，需要记录ID user_name，is_admin）
        try {
            const { password, ...res } = await getUserInfo({ user_name })
            ctx.body = {
                code: 0,
                message: `${user_name} 登陆成功`,
                result: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
            }
        } catch (error) {
            console.log('用户登录失败', error)
            return
        }


    }

    async changePassWord(ctx, next) { 
        // 获取数据
        const id = ctx.state.user.id
        const password = ctx.state.user.password
        console.log("id", id)
        console.log("password", password)
        // 操锁数据库
        // 返回结果
        await next()
    }
}

module.exports = new UserController()