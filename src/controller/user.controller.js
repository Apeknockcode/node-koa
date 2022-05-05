class UserController {
    async register(ctx, next) {
        ctx.body = {
            code: 200,
            message: "用户注册成功"
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