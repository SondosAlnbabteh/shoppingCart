const knex = require('knex');
const db = knex(require('../knexfile')['development']); // Ensure this is the correct configuration

// User Model
const User = {
  findByEmail: (email) => db('users').where({ email }).first(),
  
  createUser: async function(userData) {
    return await db('users').insert(userData).returning('*'); // Use the db instance here
  }
};

module.exports = User;

