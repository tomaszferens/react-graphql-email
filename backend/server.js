import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import cors from 'cors'

import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import models from './models'
import typeDefs from './schema/email'
import resolvers from './resolvers/email'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const app = express()
app.use(cors())

const graphqlEndpoint = '/graphql'

app.use(
    graphqlEndpoint,
    bodyParser.json(),
    graphqlExpress({
        schema,
        context: {
            models,
        },
    }),
)
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint, subscriptionsEndpoint: 'ws://localhost:4000/subscriptions' }))

const ws = createServer(app)

ws.listen(4000, () => {
    console.log(`GraphQL Server is now running on http://localhost:${4000}`)
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema,
        },
        {
            server: ws,
            path: '/subscriptions',
        },
    )
})

models.sequelize.sync()
