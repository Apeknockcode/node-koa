const {  unSupportFileType } = require("../constant/err.type")
const parityBit = async (ctx, next) => {
    // console.log('ctx',)
    const { file } = ctx.request.files
    console.log('file', file.mimetype)
    const fileType = ["image/jpeg", "image/png"]
    
    if (!fileType.includes(file.mimetype)) {
        return ctx.app.emit("error", unSupportFileType, ctx)
    } else { 
        await next()
    }
   
}
module.exports = {
    parityBit
}