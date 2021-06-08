const {model, Schema} = require("mongoose")

const matualAccountSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    ownerName:String, 
    title:String,     
    members:[{
            type:Schema.Types.ObjectId,
            ref:'users'
         }],
        
         list:[
             {
                 title:String,
                 description:String,
                 media:String,
                 amount:Number,
                 createdAt: { type: Date, default: Date.now },
                 updatedAt: { type: Date, default: Date.now }
                 }
         ],
        
})

matualAccountSchema.set('timestamps', true)

module.exports = model('matualAccount', matualAccountSchema)