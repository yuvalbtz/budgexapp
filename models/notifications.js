const {model, Schema} = require("mongoose")

const notificationsSchema = new Schema({
    
    senderName:String,
    senderImageUrl:String,
    accountTitle:String,
    from:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },     
    to:[{
        type:Schema.Types.ObjectId,
        ref:'users'
    }],

    body:String,
    seen:Boolean,
    isConfirmed:Boolean,
    ignore:Boolean
        
})

notificationsSchema.set('timestamps', true)

module.exports = model('notifications', notificationsSchema)