import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

import Home from './Home'
import EmailAdder from './EmailAdder'

export default () => (
    <BrowserRouter>
        <Container text>
            <Header textAlign="center">emailerino</Header>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/add" exact component={EmailAdder} />
            </Switch>
        </Container>
    </BrowserRouter>
)
