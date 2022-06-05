const Address = require("../mode/addr.model")
class addressService {
    async createAddress(addr) {
        return await Address.create(addr)
    }
    async getAddressList(user_id, pageNumber, pageSize) {
        //地址总数
        const total = Address.count()
        const offSet = (pageNumber - 1) * pageSize
        //  根据user_id 返回数据
        const res = await Address.findAll({
            offSet: offSet,
            limit: pageSize * 1,
            attributes: ['consignee', 'phone', 'address'],
            where: {
                user_id
            }
        })
        return {
            pageNumber,
            pageSize,
            total,
            list: res
        }
    }
    async upDateAddress(addr) {
        console.log(addr.id)
        return await Address.update(addr, {
            where: {
                id: addr.id
            }
        })

    }
    async removeAddr(id) {
        return await Address.destroy({
            where: {
                id
            }
        })
    }
    async setDefaultAddr(id, user_id) {
        await Address.update({ is_default: 0 }, { where: { user_id } }) // 先把当前的用户地址都设置为 0 
       return  await Address.update({ is_default: 1 }, {
            where: {
                user_id,
                id
            }
        })

    }
}

module.exports = new addressService()