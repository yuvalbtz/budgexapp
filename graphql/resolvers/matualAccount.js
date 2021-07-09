const User = require("../../models/User")
const MatualAccount = require("../../models/matualAccount");
const Notifications = require("../../models/notifications")
const cloudinary = require('cloudinary').v2;
const { AuthenticationError, UserInputError } = require("apollo-server");
const { uuid } = require("uuidv4");


module.exports = {
          Query:{

           async getUserMatualAccounts(_,__,context){
            const userId = context.req.user.id;
                
            try{
               
               const accounts = await MatualAccount.find()
                if(accounts){
                    
            const filteredAccounts = accounts.filter(item => item.members.find(i =>  i.userId === userId && i.isConfirmed === true) || item.owner == userId); 
                    
                    
                    return filteredAccounts.reverse();
                }
            }catch(err){
                 console.log(err);
            }
           },


           async getUserMatualAccount(_,{accountId},context){
            try{
                const account = await MatualAccount.findById(accountId)
            
                if(account){
                    return account;
                }else{
                 throw new Error('Account not found!')}
            }catch(err){
             throw new Error(err)
            }
        },
           
           
           
           
           
            async getAllUsers(_,__,context){
            try{
               const getAllUsers = await User.find()
               
               return getAllUsers.filter(user => user.id !== context.req.user.id);
            }catch(err){
                console.log(err);
            }   
           } 



          },
          Mutation:{

          async createMatualAccount(_,{title, freinds},context){
          
            const userId = context.req.user.id
            const userName = context.req.user.username
            const userImageUrl = context.req.user.profileImageUrl 
           
            
            
            
            
            try {
                
                const newMatualAccount = new MatualAccount({
                    owner:userId,
                    title,
                    members:freinds.map( id => ({
                        userId:id,
                        isConfirmed:false,
                        isIgnored:false
                    })),
                    ownerName:userName

                })
                
             const account = await newMatualAccount.save()  
             

              const newNotification = new Notifications({
                senderName:userName,
                senderImageUrl:userImageUrl,
                accountTitle:title,
                accountId:account._id,
                from:userId,
                to:freinds,
                isConfirmed:[],
                isIgnored:[],
                seen:[],
                body:'שלח/ה לך בקשת הצטרפות לחשבון',
                createdAt:new Date().toISOString()    
            })

                await newNotification.save()
              
               const userNotifications = await Notifications.find()  
           
               
              
               /*  account.members.map(m => m.userId === userId && m.isConfirmed === true && m.userId) */
               if(userNotifications){
                context.pubsub.publish('requestAdded', {addRequestToList:userNotifications})
                console.log("working notification!!!");  
            }
             
             
             
             return account;
            } catch (error) {
              console.log(error);  
            }  
          },

          async updateMatualAccount(_,{accountId, title, freinds},context){
               try {
                const userId = context.req.user.id
                const userName = context.req.user.username
                const userImageUrl = context.req.user.profileImageUrl 
                
                const account = await MatualAccount.findById(accountId)
                const accountNotification = await Notifications.findOne({accountId})    
                      if(account){
                            account.title = title
                            let members = account.members; 
                            let id3 = members.filter((obj) => freinds.indexOf(obj.userId) == -1);  // for delete user
                            id3.map((delId) => {
                            const userIndex = account.members.findIndex(m => m.userId == delId.userId)
                            account.members.splice(userIndex, 1)
                            if(accountNotification){
                                let ntfnIndex = accountNotification.to.findIndex(ntf => ntf == userId) // remove user from  notification
                                let isConfirmIndex =  accountNotification.isConfirmed.findIndex(ntf => ntf == userId)
                                accountNotification.to.splice(ntfnIndex,1)
                                accountNotification.isConfirmed.splice(isConfirmIndex,1)
                                
                            
                                
                            }
                        })
                          
                          
                          
                            
                            freinds.map(id => {
                                let id2 = members.find(id2 => id2.userId === id) // for adding new users
                                 console.log("add new ids",id2);
                                
                                 return !id2 && account.members.push({userId:id, isConfirmed:false, isIgnored:false})  
                            })
                            account.members.filter(item => !freinds.includes(item.userId))
                            accountNotification.to = freinds
                            
                           
                           
                            await accountNotification.save()
                            await account.save()
                           
                            const notifications = await Notifications.find()
                            if(notifications){
                              context.pubsub.publish('requestAdded', {addRequestToList:notifications})  
                            
                            }
                         
                      
                            return account;
                        }  
                        
                        
               } catch (error) {
                   console.log(error);
               }
        },
        
        async deleteMatualAccount(_,{accountId},context){
               try {
                const account = await MatualAccount.findById(accountId);
                const notification = await Notifications.findOne({accountId}) 
                if(account && notification){
                  await account.delete()
                  await notification.delete()
                 const notifications = await Notifications.find()
                  if(notifications){
                    context.pubsub.publish('requestAdded', {addRequestToList:notifications})  
                  
                  }
                 
                  return "account deleted succesfully!"
                }  
               } catch (error) {
                  console.log(error); 
               }
        },


        
        
        async addMatualItem(_,{accountId,title, description, media, amount},context){
            try {
                const matualAccount =  await MatualAccount.findById(accountId)
               
                if(matualAccount){
                    console.log(context.req.id);
                    matualAccount.list.push({title, description,media, amount})
                   
                    await matualAccount.save()
                   
                    return  matualAccount; 
                
                }else throw new UserInputError('Account not found!');  
            } catch (error) {
              console.log(error);  
            }
       },


       async updateMatualItem(_,{accountId, itemId, title, description ,amount},context){
        try {
            
            const account = await MatualAccount.findById(accountId)

            if(account){
                const item = account.list.filter(item => item._id == itemId)
                if(item){
                    item[0].title = title
                    item[0].description = description
                    item[0].amount = amount
                   await account.save();

                   return account;
                }  
               
            }else{
                throw new UserInputError('Account not found!');
            }

        } catch (error) {
         console.log(error);   
        }
       },

       async deleteMatualItem(_,{accountId, itemId},context){
        try {
        
            const account = await MatualAccount.findById(accountId)
            if(account){
                
                const username = context.req.user.username
                const path = `Users/${username}/matualAccounts/${accountId}/${itemId}`
                const itemIndex = account.list.findIndex(c => c._id == itemId)
                const item = account.list.filter(c => c._id == itemId)[0]
                
                account.list.splice(itemIndex, 1)
                
               
                if(item.media !== ''){
                 await cloudinary.api.delete_resources_by_prefix(path) // if has image inside
                 await cloudinary.api.delete_folder(path) // if folder is empty 
                }
                
                
             
               await account.save()
                return account;
              
                
                
            }else{
                throw new UserInputError('account not found!')
            }


         } catch (error) {
            console.log(error); 
     }
     },   

     async addItemMatualImage(_,{accountId, itemId, imageURL},context){
        try {
        
            const account = await MatualAccount.findById(accountId)

                        if(account){
                            const item = account.list.filter(item => item._id == itemId)
                            if(item){
                                console.log(item);
                                item[0].media = imageURL
                               
                               await account.save();
    
                               return true;
                            }  
                           
                        }else{
                            return false
                        }


         } catch (error) {
            console.log(error); 
     }
     },


     async deleteIteMatualmImage(_,{accountId, itemId},context){
        try {
        
            const account = await MatualAccount.findById(accountId)

            if(account){
                
                const item = account.list.filter(item => item._id == itemId)
                const username = context.req.user.username
                
               
                if(item){
                    const path = `Users/${username}/matualAccounts/${accountId}/${itemId}` 
    
                    const publicId = item[0].media.split('/Users').reverse()[0].split('.')[0]
                    
                     item[0].media = ''
                   
                   await cloudinary.uploader.destroy("Users"+publicId,{invalidate:true});
                   await cloudinary.api.delete_folder(path)
                  
                  await account.save();

                   return true;
                }  
               
            }else{
                return false
            }
         


         } catch (error) {
            console.log(error); 
     }
     },

     


        






          }
}