export default (sequelize, DataTypes) => {
    const Email = sequelize.define('email', {
        text: DataTypes.STRING(5000),
        subject: DataTypes.STRING,
        wasOpened: DataTypes.BOOLEAN,
        from: DataTypes.STRING,
    })

    return Email
}
