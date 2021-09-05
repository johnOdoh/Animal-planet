const { Model, DataTypes } = require('sequelize')
const sequelize = require('../middlewares/database')

class Animal extends Model {}

Animal.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class: {
        type: DataTypes.STRING,
            allowNull: false
    },
    habitat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endangered: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize
})

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize
})

User.hasMany(Animal)
Animal.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})


// Animal.associate = models => {
//     Animal.hasMany(models.user, {
//         foreignKey: {
//             allowNull: false,
//             name: 'userId'
//         }
//     })
// }

module.exports = { User, Animal }