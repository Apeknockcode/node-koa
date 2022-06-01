const Carts = require("../mode/cart.model")
const Goods = require("../mode/goods.model")
const { Op } = require("sequelize")
class CartService {
    async createOrUpdate(user_id, goods_id) {
        // 数据的操作逻辑
        // 1。根据 user_id 和 goods_id 来查找当前用户是否存在改商品
        let res = await Carts.findOne({
            where: {
                // [Op,and] 表示同时去查找 user_id 或者 goods_id
                [Op.and]: {
                    user_id,
                    goods_id
                }
            }
        })

        if (res) {
            // 已经存在一条记录 通过 increment 和  decrement 来实现 商品的递增和递减整数值
            await res.increment('number')
            return await res.reload()

        } else {
            // 没有记录的时候 调用 Carts.create()
            return await Carts.create({
                user_id,
                goods_id
            })
        }
    }

    // 判断添加的商品 是否 合法
    async goodsLegality(id) {
        const whereOpt = {}
        id && Object.assign(whereOpt, id)
        console.log('whereOpt', whereOpt)
        const res = await Goods.findOne({
            attributes: ['id', 'goods_name', 'goods_image'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }

    // 查询购物车列表
    async findCarts(pageNumber, pageSize) {
        let offset = (pageNumber - 1) * pageSize
        const { count, rows } = await Carts.findAndCountAll({
            attributes: ['id', "number", "select"],
            offset: offset,
            limit: pageSize * 1,
            include: { model: Goods, as: 'goods_info', attributes: ['id', 'goods_name', 'goods_price', 'goods_num', 'goods_image'] }
        })
        return {
            pageNumber,
            pageSize,
            total: count,
            list: rows
        }
    }

    async updateCarts(paramer) {
        const { id, number, select } = paramer
        const res = await Carts.findByPk(id)
        // if (!res) { 
        //     // 没有找到
        //     return ''
        // }
        if (!res) return ''
        number !== undefined ? (res.number = number) : ''
        select !== undefined ? (res.select = select) : ''
        return await res.save()

    }

    async removeCarts(ids) {
        //  批量删除
        return await Carts.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    async selectAllCarts(user_id,state) {
        //更新数据库
        return await Carts.update({ select: state }, {
            where: {
                user_id
            }
        })
    }
    async getTotal() { 
         return  await Carts.count()
    }


}
module.exports = new CartService()