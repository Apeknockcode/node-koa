// 用于操作数据库
const User = require("../mode/user.model")

class UserService {
    
    async createUser(user_name, password) {
        //  插入数据
        // User.create({
        //     //表的字段 ： 传入的数据
        //     user_name: user_name,
        //     password: password
        // })
        //  await 表达式： promiss 对象的值
        const res = await User.create({ user_name, password }) // 简写
        return res.dataValues
    }
    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne(
            {
                attributes: ['id', 'user_name', 'password', 'is_admin'],
                where: whereOpt
            }
        )
        console.log('server', res)
        return res ? res.dataValues : null
    }

    async updateById({ id, user_name, password, is_admin }) { 
        const whereOpt = { id }
        const newUser = {}
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

    }
}

module.exports = new UserService()