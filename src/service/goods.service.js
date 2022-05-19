const Goods = require("../mode/goods.model")

class GoodsService {
    async createGoods({ goods_name, goods_price, goods_num, goods_image }) {
        const res = await Goods.create({ goods_name, goods_price, goods_num, goods_image })
        return res.dataValues
    }
}
module.exports = new GoodsService()