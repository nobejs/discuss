exports.up = async function (knex) {
    await knex.raw(`create extension if not exists "uuid-ossp"`);
    return knex.schema.createTable("queries", function (table) {
      table
        .uuid("uuid")
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("owner_uuid").notNullable();
      table.text("title").notNullable();
      table.text("body").nullable();
      table.boolean("anonymous").notNullable();
      table.jsonb("meta").nullable();
      table.datetime("created_at");
      table.datetime("updated_at");
      table.datetime("deleted_at");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("queries");
  };