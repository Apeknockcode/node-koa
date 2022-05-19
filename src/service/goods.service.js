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
}
module.exports = new GoodsService()