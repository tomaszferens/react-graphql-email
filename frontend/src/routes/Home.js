import React, { Component } from 'react'
import { gql, graphql, compose } from 'react-apollo'
import { Statistic, Item } from 'semantic-ui-react'

class Home extends Component {
    componentWillMount() {
        this.props.data.subscribeToMore({
            document: emailsSubscription,
            variables: {},
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev
                }

                const newEmail = subscriptionData.data.emailAdded
                if (!prev.allEmails.find(email => email.id === newEmail.id)) {
                    return { ...prev, allEmails: [newEmail, ...prev.allEmails] }
                } else {
                    return prev
                }
            },
        })
    }

    openEmail = id => {
        this.props.mutate({
            variables: { id },
            update: (store, { data: { openEmail } }) => {
                const data = store.readQuery({ query: allEmailsQuery })
                const allEmails = data.allEmails.map(email => {
                    if (id !== email.id) {
                        return email
                    }

                    return openEmail
                })

                store.writeQuery({ query: allEmailsQuery, data: { ...data, allEmails } })
            },
        })
    }

    render() {
        const { data: { allEmails } } = this.props
        return (
            <div style={{ boxShadow: '0px 2px 14px 3px #ccc', padding: 5, border: '1px solid black', background: 'coral' }}>
                {allEmails && [
                    <Statistic
                        key="1"
                        horizontal
                        value={allEmails.filter(email => !email.wasOpened).length}
                        label={`unread email${allEmails.filter(email => !email.wasOpened).length === 1 ? '' : 's'}`}
                    />,
                    <Item.Group key="2">
                        {allEmails.map(email => {
                            const parts = email.text.split('\n')
                            return (
                                <Item
                                    onClick={() => !email.wasOpened && this.openEmail(email.id)}
                                    key={email.id}
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: 10,
                                        background: email.wasOpened ? 'white' : '#ffff6d',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Item.Content style={{ padding: 10, width: '100%' }}>
                                        <Item.Header>
                                            <span>{email.subject}</span>
                                        </Item.Header>
                                        <Item.Meta>{email.from}</Item.Meta>
                                        <Item.Description style={{ wordWrap: 'break-word' }}>
                                            {parts.map((part, i) => <div key={part}>{part}</div>)}
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            )
                        })}
                    </Item.Group>,
                ]}
            </div>
        )
    }
}

const allEmailsQuery = gql`
    {
        allEmails {
            id
            text
            subject
            from
            wasOpened
        }
    }
`

const emailsSubscription = gql`
    subscription emailAdded {
        emailAdded {
            id
            text
            subject
            from
            wasOpened
        }
    }
`

const openEmailMutation = gql`
    mutation openEmail($id: Int!) {
        openEmail(id: $id) {
            id
            text
            subject
            from
            wasOpened
        }
    }
`

export default compose(graphql(allEmailsQuery), graphql(openEmailMutation))(Home)
