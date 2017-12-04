/**
 * Created by beggl on 11/4/2017.
 */
import Member from './models/Member/memberSchema'
import {makeExecutableSchema} from 'graphql-tools'
import {MemberDao} from './couchdb'
import {generateJWT, verifyJWT} from'./authenication'
require('babel-polyfill');


const RootQuery =  `
    type SigninPayload {
        token: String
        user: String
    }
    
    input AuthData {
        userName: String!
        password: String!
    } 
    
    input MemberData {
        name: String!
        relation: String
        bio: String
    }
    
    type Query {
        allMembers(userName:String!) : [Member!]
    }
    
    type Mutation {
        signin(auth: AuthData): SigninPayload 
        createMember(input:MemberData!): Member
    }
        
`

const SchemaDefinition = `
    schema {
        query: Query
        mutation: Mutation
    }`

const members  = [
    {
        id: 0,
        familyId: 0,
        name: 'Breshay Green',
        relation: 'Sister',
        bio: 'I was born in Sept 29, 1992'
    },
    {
        id: 1,
        familyId: 0,
        relation: 'Brother',
        name: 'Musa Smith',
        bio: 'Im musa, I like to rap'
    }
]
const dao = new MemberDao();

const getToken = (token) => {
   return token.replace("Bearer ", "")
}

const isAuthenicated = (context) => {
    console.log(context)
    const authHeader = context.headers.authorization
    if(authHeader === undefined)
        return false
    const jwtoken = getToken(authHeader)
    return (jwtoken !== null && jwtoken !== undefined)
}

const getCurrentUser = (context) => {
    console.log(context)
    const authHeader = context.headers.authorization
    if(authHeader === undefined)
        return false
    const jwtoken = getToken(authHeader)
    if(jwtoken){
        const payload = verifyJWT(jwtoken)
        console.log(payload)
        return payload.sub
    }
}


const resolverMap = {
    Query: {
      async allMembers(obj, args, context){
            if(isAuthenicated(context)){
                const {userName} = args
                console.log(userName)
                const Users = context.mongo.Users
                const query = {userName: userName}
                let members = ''
                await Users.findOne(query).then(
                    (result) => {
                        members = result.members
                    }
                )
                console.log(members)
                return members
            }
            else
               throw new Error('User must be logged')
           // console.log(dao.getMembers('budfam').then(data => data))
        }
    },
    Mutation: {
       async signin(obj, args, context){
            const  Users = context.mongo.Users
            const {auth} = args
            const query = {userName: auth.userName}
            let authenticated = false;
            await Users.findOne(query).then(
                (result) => {
                    console.log(result.password)
                    if(result.password == auth.password){
                        authenticated = true;
                    }
                }
            )
            if(authenticated){
                return {token:generateJWT(auth.userName), user: auth.userName}
            }else{
                throw new Error('Incorrect credentials')
            }
        },

     createMember(obj, args, context){
        const  Users = context.mongo.Users
        const {input} = args
        const query = {userName: getCurrentUser(context)}
        const update = {
            $push : {members: input }
        }
        Users.updateOne(query, update, (err, count, status) =>{
            console.log(`err is ${err}`)
            console.log(`count is ${count}`)
         })
         return input
    }
    }
}



export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition, RootQuery, Member
        // we have to destructure array imported from the post.js file
        // as typeDefs only accepts an array of strings or functions
    ],
    // we could also concatenate arrays
    // typeDefs: [SchemaDefinition, RootQuery].concat(Post)
    resolvers: resolverMap,
})