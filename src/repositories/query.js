const knex = require("../../database/knex");
const baseRepo = requireUtil("baseRepo");
const tagsRepo = requireRepo("tag");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);
    let tags = payload.tags;
    delete payload.tags;
    let result = await knex.transaction(async (trx) => {
      const rows = await trx("queries").insert(payload).returning("*");
      if (tags && tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {
          let tag = await tagsRepo.first("tags", {
            uuid: tags[i].uuid,
            name: tags[i].name,
          });

          if (tag) {
            await trx("queries_tags").insert({
              query_uuid: rows[0].uuid,
              tag_uuid: tags[i].uuid,
            });
          } else {
            const newTag = await baseRepo.create(
              "tags",
              { name: tags[i].name },
              false
            );
            await trx("queries_tags").insert({
              query_uuid: rows[0].uuid,
              tag_uuid: newTag.uuid,
            });
          }
        }
      }
      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllQueries = async () => {
  try {
    const rows = knex('queries').orderBy('created_at', 'desc');
    return rows;
  } catch (error) {
    throw error;
  }

};

const findByUuid = async (where = {}) => {
  return await baseRepo.first('queries', where);
};

const getAllPostedQueries = async (user_uuid) => {
  try {
    const rows = knex('queries').where('owner_uuid', user_uuid);
    return rows;
  } catch (error) {
    throw error;
  }
}

const getQueriesByTags = async (tags = []) => {
  try {
    console.log(tags, "tagag")
    //const rows = knex("queries_tags").whereIn('tag_uuid', tags).toSQL();
    const rows = knex.select('query_uuid').from('queries_tags')
      .where((builder) =>
        builder.whereIn('tag_uuid', tags)
      )
    console.log(rows, "rowrow")
    return rows;
  } catch (error) {
    console.log(error, "ererer")
    throw error;
  }
}

module.exports = {
  create,
  getAllQueries,
  findByUuid,
  getAllPostedQueries,
  getQueriesByTags
};
