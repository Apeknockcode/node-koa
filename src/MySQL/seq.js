const { Sequelize } = require('sequelize')
const { MYSQL_HOST,
    MYSQL_POST,
    MYSQL_USERNAME,
    MYSQL_PWD,
    MYSQL_DB, MYSQL_TYPE } = require("../config/config.default")
/**
 * new Sequelize('数据库名称', '数据库的用户名', '数据库的密码', {
    host: 'localhost', // 数据库的主机地址
    dialect: // 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 
});
 * */
// 连接到数据库
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USERNAME, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: MYSQL_TYPE,
    port: MYSQL_POST
});

// 测试链接
// sequelize.authenticate().then(() => { 
//     console.log("数据库链接成功")
// }).catch((err) => { 
//     console.log("数据库链接失败",err)
// })

module.exports = sequelize