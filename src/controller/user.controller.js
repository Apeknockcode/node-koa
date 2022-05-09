// 导入数据库 操作层
const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
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
        ctx.body = {
            code: 200,
            message: "用户登录成功"
        }
    }
}

module.exports = new UserController()