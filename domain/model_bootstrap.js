const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.json')[env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

// collection pagination helper,
// @input ctx.request.query, should contain page, itemsPerPage items
const paginate = ({ page, itemsPerPage }) => {
    if (!page) page = 1;
    if(!itemsPerPage) itemsPerPage = 25;

    const offset = Number(page - 1 ) * Number(itemsPerPage);
    const limit =  Number(itemsPerPage);

    return { offset, limit };
};

const User = require('../model/user')(sequelize, Sequelize.DataTypes);
const UsersRoles = require('../model/users_roles')(sequelize, Sequelize.DataTypes);
const Customer = require('../model/customer')(sequelize, Sequelize.DataTypes);
const Order = require('../model/orders')(sequelize, Sequelize.DataTypes);
const Product = require('../model/product')(sequelize, Sequelize.DataTypes);

const db = {
    "Sequelize": Sequelize,
    "sequelize": sequelize,
    "paginate": paginate,

    "models": {
        Customer,
        Order,
        Product,
        User,
        UsersRoles
    }
}

module.exports = db;