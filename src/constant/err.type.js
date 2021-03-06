module.exports = {
    userFormatError: {
        code: "10001",
        message: '用户名或者密码为空',
        result: ''
    },

    userAlreadyExited: {
        code: "10002",
        message: '用户名已经存在',
        result: ''
    },

    userRegisterError: {
        code: "10003",
        message: '用户注册错误',
        result: ''
    },
    noExitedUserName: {
        code: "10004",
        message: "用户名不存在",
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: "用户登录错误",
        result: ''
    },
    invalidPassWord: {
        code: '10006',
        message: '用户密码不匹配',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: "Token 已经过期",
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的Token',
        result: ''
    },
    changePwsFails: {
        code: '10007',
        message: '修改密码失败',
        result: ''
    },
    hasNotAdminPermission: {
        cod: '10103',
        message: "没有管理员权限",
        result: ''
    },
    fileUploadError: {
        code: "10201",
        message: "商品图片上传失败",
        result: ""
    },
    unSupportFileType: {
        code: "10202",
        message: "不支持的文件格式",
        result: ''
    },
    goodsFormatError: {
        code: "10301",
        message: "参数格式错误",
        result: ''
    },
    publishGoodsError: {
        code: '10302',
        message: '发布商品失败',
        result: ''
    },
    hasGoodsExited: {
        code: "10303",
        message: "商品名称不可重复",
        result: ''
    },
    createGoodsFail: {
        code: '10304',
        message: "创建商品失败",
        result: ''
    },
    upDataFails: {
        code: '10305',
        message: "修改商品失败",
        result: ''
    },
    removeGoodsState: {
        code: "10306",
        message: '删除商品失败',
        result: ''
    },
    InvalidID: {
        code: "10307",
        message: "商品id无效",
        result: ""
    },
    cartFormatError: {
        code: '10301',
        message: "数据格式不正确",
        result: ''
    },
    addrFormatError: {
        code: '10401',
        message: "数据格式不正确",
        result: ''
    },
    craeteFaile: {
        code: 10402,
        message: '添加地址失败',
        result: ''
    },
    getAddressListFail: {
        code: 10402,
        message: '获取地址列表失败',
        result: ''
    },
    upDateFail: {
        code: 10403,
        message: "数据更新失败",
        result: ''
    },
    removeFails: {
        code: 10404,
        message: '删除失败',
        result: ''
    }
}