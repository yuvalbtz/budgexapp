const {model, Schema} = require("mongoose")

const accountSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }, 
    title:String,     
    members:[{
            type:Schema.Types.ObjectId,
            ref:'users'
         }],
        
         list:[
            {
                type: new Schema(
                  {
                      title:String,
                      description:String,
                      media:String,
                      amount:Number,
                      },{timestamps:true}
                )
            }
         ],
        
})

accountSchema.set('timestamps', true)

module.exports = model('Account', accountSchema)