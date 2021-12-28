exports.up = async function (knex) {
    await knex.raw(`create extension if not exists "uuid-ossp"`);
    return knex.schema.createTable("tags", function (table) {
      table
        .uuid("uuid")
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tags");
  };