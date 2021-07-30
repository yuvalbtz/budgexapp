const gql = require("graphql-tag");


module.exports = gql`
 type Post{
     id:ID!
     body:String!
     title:String!
     createdAt:String!
     username:String!
     comments:[Comment]!
     likes:[Like]!
     likeCount:Int!
     commentCount:Int!
     imagePost:String
    }

type Comment{
    id:ID!
    createdAt:String!
    username:String!
    body:String!
}   

type Like{
    id:ID!
    createdAt:String!
    username:String!
}


 input RegisterInput{
     username:String!
     email:String!
     password:String!
     confirmPassword:String!
}

type User{
    id:ID!
    email:String!
    token:String!
    username:String!
    firebase_user_id:ID!
    profileImageUrl:String!
    createdAt:String!
}


type Account{
     id:ID!
     owner:ID!
     title:String!
     list:[ItemList]!
     createdAt:String!
     updatedAt:String!
     
}

type MatualAccount{
    id:ID!
    owner:ID!
    ownerName:String!
    members:[FreindsRequest]!
    title:String!
    list:[ItemList]!
    createdAt:String!
    updatedAt:String!
    
}



 
type ItemList {
    id:ID!
    title:String!
    description:String!
    media:String
    amount:Float
    createdAt:String!
    updatedAt:String!
}

type message{
    msg:String
}

type userState{
    email:String
    id:String
    username:String
    profileImageUrl:String
}


type imageDetails {
    url: [String]!
    progress:Float
    error: String
}

type Notification{
    id:ID!
    senderName:String!
    senderImageUrl:String!
    accountTitle:String!
    accountId:ID!
    from:ID!
    to:[String]!
    body:String!
    seen:[String]!
    isConfirmed:[String]!
    isIgnored:[String]!
    createdAt:String!
    updatedAt:String!
}


type FreindsRequest{
    userId:String!
    isConfirmed:Boolean!
    isIgnored:Boolean!
}




type Query{
     getUserState:userState
     
    
     """
     //myAccounts
     """
     getUserAccounts:[Account!]!
     getUserAccount(accountId:ID!):Account!
    
    
    
     """
     //matualAccounts
     """
     getUserMatualAccounts:[MatualAccount!]!
     getUserMatualAccount(accountId:ID!):MatualAccount!
     getAllUsers:[User!]!
    
    
    
    
     """
     //notifications
     """
     getNotifications:[Notification]!




    }

 type Mutation{
    register(registerInput:RegisterInput):User!
    login(username:String!, password:String!):User!
    resetPassword(email:String!):message
    logout:String!

    
    likePost(postId:ID!):Post!
    
    """
    //myAccounts
    """
    createAccount(title:String!):Account!
    updateAccount(accountId:ID!,title:String!):Account!
    deleteAccount(accountId:ID!):String!
    searchAccount(searchQuery:String):[Account]!

    addItem(accountId:ID!, title:String!, description:String!,media:String,amount:Float):Account!
    updateItem(accountId:ID!, itemId:ID!, title:String!, description:String!, amount:Float):Account!
    deleteItem(accountId:ID!, itemId:ID!):Account!
    addItemImage(accountId:ID!, itemId:ID!, imageURL:String!):Boolean!
    deleteItemImage(accountId:ID!, itemId:ID!):Boolean!
    searchItem(searchQuery:String!,accountId:ID!):Account!
    
    """
   //matualAccount
    """
    createMatualAccount(title:String!, freinds:[String]!):MatualAccount!
    updateMatualAccount(accountId:ID!,title:String!,freinds:[String]!):MatualAccount!
    deleteMatualAccount(accountId:ID!):String!
    searchMatualAccount(searchQuery:String):[MatualAccount]!

    addMatualItem(accountId:ID!, title:String!, description:String!,media:String,amount:Float):MatualAccount!
    updateMatualItem(accountId:ID!, itemId:ID!, title:String!, description:String!, amount:Float):MatualAccount!
    deleteMatualItem(accountId:ID!, itemId:ID!):MatualAccount!
    addItemMatualImage(accountId:ID!, itemId:ID!, imageURL:String!):Boolean!
    deleteIteMatualmImage(accountId:ID!, itemId:ID!):Boolean!
    searchMatualItem(searchQuery:String, accountId:ID!):MatualAccount!
   
    """
    //profile
    """
    updateUserProfile(profileImage:String!):User!
    
    
    
    """
    //notifications
    """
    
    confirmRequest(accountId:ID!, userId:ID!):[Notification]!
    removeRequest(accountId:ID!, userId:ID!):[Notification]!
    userSawNTF:[Notification]!
    
    
    
    
    
    
    uploadFile(file:Upload!):String!



}




type Subscription{
     getallitems:message! 

     addRequestToList:[Notification]!
     
     itemChangedSubs:MatualAccount!
     accountChangedSubs:[MatualAccount]!
}`


    