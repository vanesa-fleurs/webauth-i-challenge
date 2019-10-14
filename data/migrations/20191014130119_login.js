
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    users.increments()
    users
        .string('username')
        .notNullable()
        .unique()
    users
        .string('password')
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExsits('users')
};
