const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.json')[env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

const User = require('../model/user')(sequelize, Sequelize.DataTypes);
const UsersRoles = require('../model/users_roles')(sequelize, Sequelize.DataTypes);
const Customer = require('../model/customer')(sequelize, Sequelize.DataTypes);
const Order = require('../model/orders')(sequelize, Sequelize.DataTypes);
const Product = require('../model/product')(sequelize, Sequelize.DataTypes);

const db = {
    "Sequelize": Sequelize,
    "sequelize": sequelize,

    "models": {
        Customer,
        Order,
        Product,
        User,
        UsersRoles
    }
}

module.exports = db;