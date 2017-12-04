/**
 * Created by beggl on 11/1/2017.
 */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import schema from './schema'
import connectMongo from './mongo-connector'
require('babel-polyfill');


const start = async () => {
    const mongo = await connectMongo()

    const buildOptions = (res) => {
        const headers = res.headers
        return { context: {headers , mongo}, schema }
    }

    const app = express()
    app.options('*', cors())
    app.use(cors())
    app.use('/graphql', bodyParser.json(), graphqlExpress( buildOptions))
    app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
    app.listen(4000, ()=> console.log("Now browse to localhost:4000/graphiql"))


}
start()


