const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")
const {validatorsRegisterInput, validateLoginInput} = require("../../util/validators")
const {SECRET_KEY} = require("../../credentials.json")

const {auth} = require("../../firebase")


function generateToken(user){
  return jwt.sign({
        id: user._id,
        email:user.email,
        username:user.username,
        profileImageUrl:user.profileImageUrl
        },SECRET_KEY,{expiresIn:'7d'});
}


module.exports = {
    Mutation:{
        async login(_,{username,password}, {res,id}){
            userDetails = null
            console.log(id);
            const {errors, valid} = validateLoginInput(username, password)
            if(!valid){
                throw new UserInputError("Errors",{errors})  
             }
             const user = await User.findOne({username})
            
           if(!user){
                errors.general = 'User not found';
                throw new UserInputError("user not found!",{errors})
            }
            
          
            const match = await bcrypt.compare(password, user.password)
            
            
             if(!match){
                errors.general = 'Wrong credentials!';
                throw new UserInputError("Wrong credentials!",{errors})
               
             }
            
             

             const token = generateToken(user);
         
            res.cookie("id", token, {
                 httpOnly:true,
                 secure:false,
                 maxAge:1000 * 60 * 60 * 24 * 7 // 7 days    

             });

              res.cookie("id2", user._id, {
                httpOnly:false,
                secure:false,
                maxAge:1000 * 60 * 60 * 24 * 7 // 7 days    

            });  
                
           
             return {...user._doc, id: user._id,token, firebase_user_id:userDetails}
        },
        
        async register(_,
            {registerInput:{
                username,
                email,
                password,
                confirmPassword},
            
          
        },context,info){
       
        
        const {errors, valid} = validatorsRegisterInput(username,email,password,confirmPassword)
        if(!valid){
            throw new UserInputError('Errors',{errors});
        }   
        const user = await User.findOne({username})
           if(user){
             throw new UserInputError("User name is already taken",{
                 errors:{
                     username:'This username is already taken'
                 }
             })
           }
      


          

            password = await bcrypt.hash(password, 12);
            
          

            const newUser = new User({
                email,
                username,
                password,
                confirmPassword,
                profileImageUrl:'',
            });

           const res = await newUser.save();
           
            const token = generateToken(res)
               
               
            context.res.cookie("id", token, {
                httpOnly:true,
                secure:false,
                maxAge:1000 * 60 * 60 * 24 * 7 // 7 days    

            });

            context.res.cookie("id2", res._id, {
               httpOnly:false,
               secure:false,
               maxAge:1000 * 60 * 60 * 24 * 7 // 7 days    

           });  
            
            
            
            
            return {...res._doc, id: res._id, token}
        
        
        
        
        
            }, 


        


            async resetPassword(_,{email}){
                try{
                    
                    const res =  await User.findOne({email})
                    let msg = "check your inbox mail to change the password!"
                   
                   await auth.sendPasswordResetEmail(email);
                  
                       return {msg:msg}
                 
                   
                }catch(err){
                    console.log(err);

                }
            },


            async logout(_,__,{res,___}){
               
                try{
                    
                       
                        res.clearCookie("id");
                        res.clearCookie("id2");
                        
                        return "logout successfully!"
                      
                   
                       
                }catch(err){
                    console.log(err);
                }

            },

            async updateUserProfile(_,{profileImage,email},context){
                 const userId = context.req.user.id
                 const userName = context.req.user.username    
                 const userEmail = context.req.user.email
                 const imageUrl = context.req.user.profileImageUrl   
                 

                



                 const {errors, valid} = validatorsRegisterInput(userName,email)
                    if(!valid){
                       throw new UserInputError('Errors',{errors});
                     }   
                    
                 
                     if(email !== userEmail){
                        const ifEmailTaken = await User.findOne({email})
                        if(ifEmailTaken){
                            throw new UserInputError("User email is already taken",{
                                errors:{
                                    email:'This email is already taken'
                                }
                            })
                          }
                     }
                   
                    
                   
                      const user = await User.findById(userId)
                   
                      if(user){
                          
                        if(profileImage.trim() !== ''  && profileImage !== imageUrl){
                            user.profileImageUrl = profileImage
                        } 
                            user.email = email
                        
                        
                        await user.save()

                        const token = generateToken(user);
         
                        context.res.cookie("id", token, {
                                httpOnly:true,
                                secure:false,
                                maxAge:1000 * 60 * 60 * 24 * 7 // 7 days    

                            });

                     return user;

                    }

                 
                  
          
          
          
                }

          },


       Query:{
        async getUserState(_,__,context){
           
           try{        
          
             
            
                context.res.cookie("id2", context.req.user.id, {
                    httpOnly:false,
                    secure:false,
                    maxAge:1000 * 60 * 60 * 24 * 7 // 7 days    
   
                });  
                return {...context.req.user}
            
              
            }catch(err){
                console.log(err);
           
                context.res.clearCookie("id");
                context.res.clearCookie("id2");
                console.log("user is log out!");
                return null;
           
           
            }
          
           },
       }

}