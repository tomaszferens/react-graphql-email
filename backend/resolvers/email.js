import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()

export default {
    Query: {
        getEmail: (parent, { id }, { models }) => models.Email.findOne({ where: { id } }),
        allEmails: (parent, args, { models }) => models.Email.findAll({ order: [['created_at', 'DESC']] }),
    },
    Mutation: {
        sendEmail: async (parent, args, { models }) => {
            try {
                const email = await models.Email.create(args)
                pubsub.publish('emailAdded', { emailAdded: email })
                return email
            } catch (err) {
                return false
            }
        },
        openEmail: async (parent, args, { models }) => {
            try {
                const email = await models.Email.findOne({ where: { id: args.id } })
                email.updateAttributes({
                    wasOpened: true,
                })
                return email
            } catch (err) {
                return false
            }
        },
    },
    Subscription: {
        emailAdded: {
            subscribe: withFilter(() => pubsub.asyncIterator('emailAdded'), () => true),
        },
    },
}
