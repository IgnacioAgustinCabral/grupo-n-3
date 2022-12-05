'use strict';
const models = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //USUARIOS ADMIN
    await queryInterface.bulkInsert('users', [{
      firstName: "Juan",
      lastName: "Chavez",
      email: "jchavez@gmail.com",
      password: await bcrypt.hash('pas32', 10),
      roleId: "1"
    }, {
      firstName: "Juan",
      lastName: "Perez",
      email: "jperez@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "Miguel",
      lastName: "Cervantes",
      email: "mc@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "Pedro",
      lastName: "Picapiedra",
      email: "pp@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "Homero",
      lastName: "Alvarez",
      email: "ha@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "Cristian",
      lastName: "Romero",
      email: "cr@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "Leo",
      lastName: "Messi",
      email: "lm@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "John",
      lastName: "Doe",
      email: "johnd@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "Jane",
      lastName: "Deaw",
      email: "janed@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }, {
      firstName: "Joaquin",
      lastName: "Sabina",
      email: "js@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "1"
    }], {});

    //USUARIOS NORMALES
    await queryInterface.bulkInsert('users', [{
      firstName: "Eduardo",
      lastName: "Aleman",
      email: "ea@gmail.com",
      password: await bcrypt.hash('pas32', 10),
      roleId: "2"
    }, {
      firstName: "Agustin",
      lastName: "Martinez",
      email: "am@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Juan",
      lastName: "Musso",
      email: "jmusso@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Francisco",
      lastName: "Simpson",
      email: "fs@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Ignacio",
      lastName: "Salo",
      email: "is@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Juan",
      lastName: "Takeda",
      email: "jtakeda@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Milagros",
      lastName: "Peperina",
      email: "mpp@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Andres",
      lastName: "Noro",
      email: "an23@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Xavier",
      lastName: "Perez",
      email: "xperez@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }, {
      firstName: "Martin",
      lastName: "Laguna",
      email: "mlaguna23@gmail.com",
      password: await bcrypt.hash('zeezq123g', 10),
      roleId: "2"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
