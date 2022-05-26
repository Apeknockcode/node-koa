const { DataTypes } = require("sequelize")
const sequelize = require("../MySQL/seq")

// 定义模型
const Carts = sequelize.define("koa_carts", {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "商品id"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户id"
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "商品数量"
    },
    select: {
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull: false,
        comment: "选中的状态 0 没有选中， 1 选中"
    },
}, {
    timestamps: true,
})
// 同步数据 （建表） 第一次需要执行
// Carts.sync({ force: true })
// 导出数据mooing
module.exports = Carts