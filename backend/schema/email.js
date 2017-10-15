export default `
    type Email {
        id: Int!
        wasOpened: Boolean!
        subject: String!
        from: String!
        text: String!
    }

    type Query {
        getEmail(id: Int!): Email!
        allEmails: [Email!]!
    }

    type Mutation {
        sendEmail(subject: String!, text: String!, from: String!, wasOpened: Boolean=false): Email!
        openEmail(id: Int!): Email!
    }

    type Subscription {
        emailAdded: Email!
    }
`
