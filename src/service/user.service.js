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
}

module.exports = new UserService()