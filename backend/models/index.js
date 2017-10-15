import Sequelize from 'sequelize'

const sequelize = new Sequelize('email_client', 'postgres', 'postgres', {
    dialect: 'postgres',
    define: {
        underscored: true,
    },
})

const models = {
    Email: sequelize.import('./email'),
}

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
