exports.up = async function (knex) {
    await knex.raw(`create extension if not exists "uuid-ossp"`);
    return knex.schema.createTable("queries_tags", function (table) {
        table
            .uuid("query_uuid")
            .notNullable()
            .defaultTo(knex.raw("uuid_generate_v4()"));
        table
            .uuid("tag_uuid")
            .notNullable()
            .defaultTo(knex.raw("uuid_generate_v4()"))
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("queries_tags");
};