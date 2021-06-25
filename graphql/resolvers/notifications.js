const Notifications = require("../../models/notifications")


module.exports = {

    Query:{
        
    },

    Mutation:{

    },

    Subscription:{
        addRequestToList:{
            subscribe: (parent, args, {pubsub}) => pubsub.asyncIterator('requestAdded')
              
         }
    }
}