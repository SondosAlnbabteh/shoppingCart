exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();           // Primary key
      table.string('name').notNullable();         // User's name
      table.string('email').unique().notNullable(); // User's email, must be unique
      table.string('password').notNullable();     // Password hash
      table.enu('role', ['Admin', 'Customer'])    // Role can either be Admin or Customer
        .defaultTo('User')                    // Default role is Customer
        .notNullable();
      table.string('jwt_token');                  // JWT token for session management
      table.timestamps(true, true);               // Created and updated timestamps
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
  };
  