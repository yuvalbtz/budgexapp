const matualAccount = require("../../models/matualAccount");
const Notifications = require("../../models/notifications")


module.exports = {

    Query:{
       async getNotifications(_,__,context){
        const userId = context.req.user.id  
        
        try {
               const notifications = await Notifications.find()
              
               
                return notifications;
               
           
            } catch (error) {
               console.log(error);
           }

       }  
    },

    Mutation:{
       async confirmRequest(_,{accountId, userId},context){
            try {
                const notification = await Notifications.findOne({accountId})
                const account = await matualAccount.findById(accountId)  
             
              if(account){
                if(account.members.find(i => i.userId === userId && i.isConfirmed === true)){
                    let id3 = account.members.filter((obj) => obj.userId === userId && obj.isConfirmed === true);  // remove user from account
                            id3.map((delId) => {
                            const userIndex = account.members.findIndex(m => m.userId == delId.userId)
                            account.members.splice(userIndex, 1)
                            
                            if(notification){
                                let ntfnIndex = notification.to.findIndex(ntf => ntf == userId) // remove user from  notification
                                let isConfirmIndex =  notification.isConfirmed.findIndex(ntf => ntf == userId)
                                notification.to.splice(ntfnIndex,1)
                                notification.isConfirmed.splice(isConfirmIndex,1)
                                
                            }
                            
                          })
                }else{
                    account.members.map(i => {  //user confirm request
                        if(i.userId === userId){
                           i.isConfirmed = !i.isConfirmed
                           notification.isConfirmed.push(userId)
                        }

                   }) 
                } 
                await notification.save() 
                await account.save()
                const notifications = await Notifications.find()
               if(notifications){
                context.pubsub.publish('requestAdded', {addRequestToList:notifications})
               }
               
                return notifications;
            }
            
            
            
              
             
                
             
            
            } catch (error) {
                console.log(error);
            }
       }, 
    },

    Subscription:{
        addRequestToList:{
            subscribe: (parent, args, {pubsub}) => pubsub.asyncIterator('requestAdded')
              
         }
    }
}