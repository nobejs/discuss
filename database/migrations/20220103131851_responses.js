exports.up = async function (knex) {
    await knex.raw(`create extension if not exists "uuid-ossp"`);
    return knex.schema.createTable("responses", function (table) {
        table
            .uuid("uuid")
            .notNullable()
            .primary()
            .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("query_uuid").notNullable();
        table.string("owner_uuid").notNullable();
        table.text("answer").notNullable();
        table.boolean("anonymous").notNullable();
        table.jsonb("meta").nullable();
        table.datetime("created_at");
        table.datetime("updated_at");
        table.datetime("deleted_at");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("responses");
};