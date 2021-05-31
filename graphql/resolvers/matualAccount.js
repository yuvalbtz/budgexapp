const User = require("../../models/User")









module.exports = {
          Query:{

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

          }
}