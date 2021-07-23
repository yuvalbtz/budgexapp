const usersResolvers = require("./user")
const accountResolvers = require("./account")
const matualAccountResolvers = require("./matualAccount")
const notificationsResolvers = require("./notifications")
module.exports = {

    Query:{
        ...usersResolvers.Query,
        ...accountResolvers.Query,
        ...matualAccountResolvers.Query,
        ...notificationsResolvers.Query
    },

    Mutation:{
        ...usersResolvers.Mutation,
        ...accountResolvers.Mutation,
        ...matualAccountResolvers.Mutation,
        ...notificationsResolvers.Mutation
    },

    Subscription:{
        ...accountResolvers.Subscription,
        ...notificationsResolvers.Subscription,
        ...matualAccountResolvers.Subscription,
    }
        
}

