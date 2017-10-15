import React, { Component } from 'react'
import { TextArea, Button, Input } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'

class EmailAdder extends Component {
    state = {
        subject: '',
        text: '',
        from: '',
    }

    onChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    sendEmail = () => {
        this.setState({
            subject: '',
            text: '',
            from: '',
        })
        this.props.mutate({
            variables: {
                subject: this.state.subject,
                text: this.state.text,
                from: this.state.from,
            },
        })
    }

    sendEmailsOverTime = () => {
        setInterval(() => {
            console.log(this.props)
            this.props.mutate({
                variables: {
                    subject: 'test',
                    text: 'sdfsdf',
                    from: 'sdfsdfsd',
                },
            })
        }, 2000)
    }

    render() {
        return (
            <div>
                <Input value={this.state.subject} name="subject" onChange={this.onChange} fluid placeholder="Subject" />
                <Input
                    style={{ marginTop: 5 }}
                    value={this.state.from}
                    name="from"
                    onChange={this.onChange}
                    fluid
                    placeholder="holyflamingo@mailzz.com"
                />
                <TextArea
                    value={this.state.text}
                    name="text"
                    onChange={this.onChange}
                    autoHeight
                    style={{ padding: 15, width: '100%', border: '1px solid rgba(34,36,38,.15)', minHeight: 150, marginTop: 5 }}
                    placeholder="Message..."
                />
                <Button onClick={this.sendEmail} fluid>
                    Send email
                </Button>
                <Button onClick={this.sendEmailsOverTime} fluid>
                    Send emails over time
                </Button>
            </div>
        )
    }
}

const sendEmailMutation = gql`
    mutation($subject: String!, $text: String!, $from: String!) {
        sendEmail(subject: $subject, text: $text, from: $from) {
            id
        }
    }
`

const EmailAdderWithMutation = graphql(sendEmailMutation)(EmailAdder)

export default EmailAdderWithMutation
