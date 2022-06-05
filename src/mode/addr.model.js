
const { DataTypes } = require("sequelize")
const sequelize = require("../MySQL/seq")

const Address = sequelize.define("koa_address", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户id"
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收集人姓名"
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: "手机号码"
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "地址"
    },
    is_default: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为默认地址 0 代表不是 , 1 代表是"
    }
}, {
    timestamps: true,
})
// Address.sync({ force: true })
module.exports = Address