/**
 * Created by beggl on 11/1/2017.
 */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import schema from './schema'

//const schema = makeExecutableSchema({typeDefs, resolvers})
const app = express()

app.options('*', cors())
app.use(cors())
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
app.listen(4000, ()=> console.log("Now browse to localhost:4000/graphiql"))