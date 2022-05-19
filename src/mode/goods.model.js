// 数据模型层
const { DataTypes } = require('sequelize')

const sequelize = require("../MySQL/seq")

const Goods = sequelize.define("koa_goods", {
    // 在这里定义模型属性
    // id 灰会被sequelize 自动创建
    // id: {type: DataTypes.INET},
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        unique: true,//字段是否唯一
        comment: '商品名称' // 字段注释
    },
    goods_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 默认值
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 默认值
        comment: "商品库存"
    },
    goods_image: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "商品主图"
    }
}, {
    timestamps: true,//在数据库中不会创建 createdAt 和 updatedAt 字段
})
// 强制 同步 模型同步
// User.sync({ force: true })
module.exports = Goods