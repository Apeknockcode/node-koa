const fs = require("fs")
const Router = require("koa-router")
const router =new Router()
fs.readdirSync(__dirname).forEach(file => { 
    if (file != "index.js") { 
        let res = require("./" + file)
        router.use(res.routes())
    }
})

module.exports=router