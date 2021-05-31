const usersResolvers = require("./user")
const accountResolvers = require("./account")
const matualAccountResolvers = require("./matualAccount")
module.exports = {

    Query:{
        ...usersResolvers.Query,
        ...accountResolvers.Query,
        ...matualAccountResolvers.Query
    },

    Mutation:{
        ...usersResolvers.Mutation,
        ...accountResolvers.Mutation,
        ...matualAccountResolvers.Mutation
    },

    Subscription:{
        ...accountResolvers.Subscription
    }
        
}

