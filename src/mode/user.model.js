// 数据模型层
const { DataTypes } = require('sequelize')

const sequelize = require("../MySQL/seq")

//创建模型 （Model koa_user -> koa_users） 
const User = sequelize.define("koa_users", {
    // 在这里定义模型属性
    // id 灰会被sequelize 自动创建
    // id: {type: DataTypes.INET},
    user_name: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        unique: true,//字段是否唯一
        comment: '用户名：唯一' // 字段注释
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment:'密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0, // 默认值
        comment:"是否为管理员，‘0’代表不是管理员，'1'代表是管理员"
    }
}, {
    timestamps: true,//在数据库中不会创建 createdAt 和 updatedAt 字段
})
// 强制 同步 模型同步
// User.sync({ force: true })
module.exports=User