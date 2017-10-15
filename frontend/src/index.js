import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import 'semantic-ui-css/semantic.min.css'

import Routes from './routes'

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' })

const wsClient = new SubscriptionClient('ws://localhost:4000/subscriptions', {
    reconnect: true,
})
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient)

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    wsClient,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>,
    document.getElementById('root'),
)
