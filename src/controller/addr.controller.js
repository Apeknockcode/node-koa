const { createAddress, getAddressList, upDateAddress, removeAddr, setDefaultAddr } = require("../service/addr.serve.js")
const { craeteFaile, getAddressListFail, upDateFail, removeFails } = require("../constant/err.type")
// 创建一个address 的类
class addressController {
    async createAddress(ctx, next) {
        const user_id = ctx.state.user.id
        const { id, consignee, phone, address } = ctx.request.body
        try {
            const res = await createAddress({ user_id, consignee, phone, address })
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '地址添加成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', craeteFaile, ctx)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async list(ctx, next) {
        const { pageNumber, pageSize } = ctx.request.body
        const user_id = ctx.state.user.id
        const res = await getAddressList(user_id, pageNumber, pageSize)
        console.log(res)
        if (res) {
            ctx.body = {
                code: 0,
                message: "获取地址列表成功",
                result: res
            }
        } else {

            return ctx.app.emit("error", getAddressListFail, ctx)
        }
    }

    async updateAddress(ctx) {
        console.log('ctx', ctx)
        // const { id, consignee, phone, address } = ctx.request.body
        const res = await upDateAddress(ctx.request.body)

        if (res && res > 0) {
            ctx.body = {
                code: 0,
                message: '地址更新成功',
                result: res
            }
        } else {
            return ctx.app.emit("error", upDateFail, ctx)
        }
    }

    async removeAddress(ctx) {
        const id = ctx.request.params.id
        const res = await removeAddr(id)
        console.log("删除", res)
        if (res > 0) {
            ctx.body = {
                code: 0,
                message: '删除成功',
                result: res
            }
        } else {
            return ctx.app.emit("error", removeFails, ctx)
        }
    }
    async setDefault(ctx) {
        const user_id = ctx.state.user.id
        const id = ctx.request.params.id
        const res = await setDefaultAddr(id, user_id)
        ctx.body = {
            code: 0,
            message: '设置默认成功',
            result: res
        }
    }

}
module.exports = new addressController()