const {model, Schema} = require("mongoose")

const matualAccountSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    ownerName:String, 
    title:String,     
    members:[{
            userId:String,
            isConfirmed:Boolean,
            isIgnored:Boolean
         }],
        
         list:[
              {
                  type: new Schema(
                    {
                        title:String,
                        description:String,
                        media:String,
                        amount:Number,
                        },{timestamps:true})
              }
         ],
            
})


matualAccountSchema.set('timestamps', true)

module.exports = model('matualAccount', matualAccountSchema)