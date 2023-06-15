const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    age:{type: DataTypes.INTEGER, allowNull: false},
    first_name:{type: DataTypes.STRING, allowNull: false},
    last_name:{type: DataTypes.STRING, allowNull: false}
})

const Card = sequelize.define('card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull: false},
    text:{type: DataTypes.TEXT, allowNull: false},
    img:{type: DataTypes.STRING}
})

module.exports = {
    User, Card
}