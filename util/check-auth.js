const {AuthenticationError} = require("apollo-server")
const jwt = require("jsonwebtoken")
require('dotenv').config()

module.exports = ({req}) => {

const authHeader = req.cookies.id;
if(authHeader){
    const token = authHeader
    if(token){
        try{
          
            const user = jwt.verify(token,`${process.env.SECRET_KEY}`);
            console.log(user);
            return user;
        }catch(err){
            throw new AuthenticationError('Invalid/Expired token')
        }
    }
    throw new Error('Authentication token must be bearer')
}

throw new Error('Authorization token must be provided')

}