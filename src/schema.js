/**
 * Created by beggl on 11/4/2017.
 */
import Member from './models/Member/memberSchema'
import {makeExecutableSchema} from 'graphql-tools'

const RootQuery =  `
    type RootQuery {
        allMembers: [Member!]
    }
`
const SchemaDefinition = `
    schema {
        query: RootQuery
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

const resolverMap = {
    RootQuery: {
        allMembers(obj, args, context){
            return members
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