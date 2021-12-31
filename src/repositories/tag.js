const knex = requireKnex()

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

module.exports = {
  create,
  countAll,
  first,
};
