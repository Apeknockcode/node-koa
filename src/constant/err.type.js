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
        result:''
    },
    invalidToken: {
        code: '10102',
        message: '无效的Token',
        result:''
    }
}