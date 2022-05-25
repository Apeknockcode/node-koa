const { DataTypes } = require("sequelize")
const sequelize = require("../MySQL/seq")

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
        comment: "数量"
    },
    select: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "选中的状态 0 没有选中， 1 选中"
    },
}, {
    timestamps: true,
})
Carts.sync({ force: true })
module.exports = Carts