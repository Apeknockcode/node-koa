const path = require("path")

const { fileUploadError, unSupportFileType  }  =require("../constant/err.type")
class GoodsController {
    async upload(ctx, next) {
       
        
        const { file } = ctx.request.files
        
        if (file) {
           
            ctx.body = {
                code: 0,
                message: "上传成功",
                result: {
                    goods_img: path.basename(file.newFilename)
                }
            }
        } else { 
            console.error("文件上传失败")
            return ctx.app.emit("error",fileUploadError,ctx)
        }
      
    }
}

module.exports = new GoodsController()