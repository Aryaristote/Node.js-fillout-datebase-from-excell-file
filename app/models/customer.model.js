const { Configs } = require("../config/db.config.js");
const Sequelize = require("sequelize");
const Randomstring = require("Randomstring")
// const { now } = require('../helpers/helper.moment.js');
const dotenv = require("dotenv");
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const Customer = Configs.define('__tbl_agriculteurs', {
    ref: {
        type: Sequelize.STRING,
        allowNull: true,
        // defaultValue: Randomstring.generate()
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postnom: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    prenom: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ' '//process.env.APPESCAPESTRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ' ' //process.env.APPESCAPESTRING
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_de_daissance: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '1900-12-12',
    },
    membrecooperative: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 0 //process.env.APPESCAPESTRING
    },
    idambassadeur: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 1059
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdon: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: new Date().toLocaleString() // now({ options: {} })
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = {
    Customer
}
