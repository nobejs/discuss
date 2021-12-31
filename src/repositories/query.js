const { async } = require("validate.js");
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
    const query = await getQuery(tags);
    let queryArr = await query.promise();
    queryArr = queryArr.map(function (obj) {
      return obj['query_uuid'];
    });

    if (queryArr && queryArr.length > 0) {
      const rows = knex('queries')
        .where((builder) =>
          builder.whereIn('uuid', queryArr)
        );
      return await rows;
    } else {
      return [{}];
    }

  } catch (error) {
    console.log(error, "ererer")
    throw error;
  }
}

const getQuery = async (tags) => {
  const rows = knex.select('query_uuid').from('queries_tags')
    .where((builder) =>
      builder.whereIn('tag_uuid', tags)
    );
  rows.promise = rows.then;
  rows.then = undefined;
  return rows;
};

const getTagbyQueryId = async (id) => {
  const query = await getTag(id);
  let queryArr = await query.promise();
  queryArr = queryArr.map(function (obj) {
    return obj['tag_uuid'];
  });
  return queryArr;

}

const getTag = async (id) => {
  const rows = knex.select("tag_uuid").from('queries_tags').where('query_uuid', id);
  rows.promise = rows.then;
  rows.then = undefined;
  return rows;
};

const remove = async (where) => {
  await knex('queries_tags').where({ query_uuid: where.uuid }).delete();
  const row = await baseRepo.remove('queries', where, 'hard');
  return row;
}

const update = async (id, payload) => {
  try {
    await knex('queries_tags').where({ query_uuid: id }).delete();
    payload["updated_at"] = new Date().toISOString();
    let tags = payload.tags;
    delete payload.tags;
    let result = await knex.transaction(async (trx) => {
      let rows = await knex('queries').where({ uuid: id }).update(payload).returning("*");
      if (tags && tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {
          let tag = await tagsRepo.first("tags", {
            uuid: tags[i].uuid,
            name: tags[i].name,
          });
          if (tag) {
            await trx("queries_tags").insert({
              query_uuid: id,
              tag_uuid: tags[i].uuid,
            });
          } else {
            const newTag = await baseRepo.create(
              "tags",
              { name: tags[i].name },
              false
            );
            await trx("queries_tags").insert({
              query_uuid: id,
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

}


module.exports = {
  create,
  getAllQueries,
  findByUuid,
  getAllPostedQueries,
  getQueriesByTags,
  getTagbyQueryId,
  remove,
  update
};
