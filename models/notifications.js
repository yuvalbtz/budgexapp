const {model, Schema} = require("mongoose")

const notificationsSchema = new Schema({
    
    senderName:String,
    senderImageUrl:String,
    accountTitle:String,
    accountId:{
        type:Schema.Types.ObjectId,
        ref:'matualAccounts'
    },
    from:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },     
    to:[{
        type:Schema.Types.ObjectId,
        ref:'users'
    }],

    body:String,
    seen:[String],
    isConfirmed:[String],
    isIgnored:[String],
      
})
notificationsSchema.set('timestamps', true)

module.exports = model('notifications', notificationsSchema)