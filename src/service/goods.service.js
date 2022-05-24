const Goods = require("../mode/goods.model")

class GoodsService {
    async createGoods({ goods_name, goods_price, goods_num, goods_image }) {
        const res = await Goods.create({ goods_name, goods_price, goods_num, goods_image })
        return res.dataValues
    }

    async GetGoodsInfo({ goods_name }) {
        const whereOpt = {}
        goods_name && Object.assign(whereOpt, { goods_name })
        const res = await Goods.findOne(
            {
                attributes: ['goods_name'],
                where: whereOpt
            }
        )
        // console.log('server', res)
        return res ? res.dataValues : null
    }
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } })
        return res[0] > 0
    }

    // 删除数据库的数据 （硬删除）
    // 上下架商品  （软删除）
    async removeGoods(id) {
        const res = await Goods.destroy({ where: { id } })
        console.log('removeGoods', res)
        return res > 0
    }


    async restoreGoods(id) {
        const res = await Goods.restore({ where: { id } })
        console.log('removeGoods', res)
        return res > 0
    }

    // 查找商品
    async findGoods(pageNum, pageSize) {
        // 获取总数
        const total = await Goods.count()

        // 获取分页的数
        const offSet = (pageNum - 1) * pageSize
        const res = await Goods.findAll({ offSet: offSet, limit: pageSize * 1 })
        return {
            pageNum,
            pageSize,
            total,
            list: res

        }
    }
}
module.exports = new GoodsService()