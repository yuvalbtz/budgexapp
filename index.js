const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const {ApolloServer, PubSub, graphiqlExpress} = require("apollo-server-express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const expressPlayground = require('graphql-playground-middleware-express').default
const expressJwt = require("express-jwt");
const {SECRET_KEY} = require("./credentials.json")
const typeDefs = require("./graphql/TypesDefs")
const resolvers = require("./graphql/resolvers")
const {username, password, dbName} = require("./credentials.json")
const checkAuth = require("./util/check-auth")
const pubsub = new PubSub();
const path = require('path');
const app = express()
const http = require('http');

//enable cors
 var corsOptions = {
  origin: 'https://salty-ridge-45014.herokuapp.com/',
  credentials: true, // <-- REQUIRED backend setting
 
}; 
  app.use(cors(corsOptions));





app.use("/graphql",
         bodyParser.json(),
         cookieParser(),
         (req,res,next) => {
          
            try{
              
              const user =  jwt.verify(req.cookies.id, SECRET_KEY)
            
              req.user = user
              console.log("user middleware",user);
              console.log("id cookie!!!!!" );
            
              
              }catch(err){
               
              console.log(err);
            
              }
        
         
           return next();
         })


         const server = new ApolloServer({ 
          typeDefs,
          resolvers,
          context:  ({req,res, connection}) => ({req,res,pubsub, user: !connection ? req.user : null}),
        
       })

       const httpServer = http.createServer(app);
       
       
       server.applyMiddleware({app, cors:corsOptions}) 
       
       server.installSubscriptionHandlers(httpServer);

      
       
       app.get("/graphiql",expressPlayground({endpoint: "/graphql" })) 

     
        
        app.use(express.static('public'))

        app.get('*', (req, res) => {
           res.sendFile(path.resolve(__dirname, 'public','index.html'));
        })
      



    const port = 4000   



mongoose
.connect('mongodb+srv://' + encodeURIComponent(`${username}:${password}`) +`@cluster0.z1c7r.mongodb.net/${dbName}?retryWrites=true&w=majority`,{useUnifiedTopology:true, useNewUrlParser:true})
  .then(() => {
    return httpServer.listen({port: process.env.PORT || 4000}, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`,
      );
    });    /* app.listen({port: process.env.PORT || 4000}, () => {
      console.log(`server is running at ${server.graphqlPath}`)
    }) */
  })
 .catch(err => {
    console.log(err);
  });




