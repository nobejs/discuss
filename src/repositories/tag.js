const knex = requireKnex()
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    let result = await knex.transaction(async (trx) => {
      const rows = await trx('tags').insert(payload).returning("*");
      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const countAll = async (table, where = {}, whereNot = {}) => {
  try {
    let rows = await knex(table)
      .where(where)
      .whereNot(whereNot)

      .count({ count: "*" })
      .first();
    return parseInt(rows.count);
  } catch (error) {
    throw error;
  }
};

const first = async (table, where = {}) => {
  try {
    let row = await knex(table).where(where).first();
    return row;
  } catch (error) {
    throw {
      statusCode: 404,
      message: "Not Found",
    };
  }
};

const getAllTags = async () => {
  try {
    const rows = knex('tags').orderBy('name', 'desc');
    return rows;
  } catch (error) {
    throw error;
  }

};

const remove = async (where) => {
  try {
    await knex('queries_tags').where({ tag_uuid: where.uuid }).delete();
    let rows = await knex('tags')
      .where(where)
      .delete();
    return { message: "success" };
  } catch (err) {
    throw err;
  }
}

const update = async (id,payload) =>{
  try{
    let rows = await knex('tags').where({uuid:id}).update(payload).returning("*");
    return rows[0];
  }catch (err) {
      throw err;
  }

}

module.exports = {
  create,
  countAll,
  first,
  getAllTags,
  remove,
  update
};
