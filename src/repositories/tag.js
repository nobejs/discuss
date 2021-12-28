const knex = require("../../database/knex");
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    //payload = baseRepo.addCreatedTimestamps(payload);
    return await baseRepo.create('tags', payload, false);
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
}

const first = async (table, where = {}) => {
  try {
    console.log(table, where, "table-where")
    let row = await knex(table).where(where).first();
    console.log(row, "rowrow")
    return null;
  } catch (error) {
    console.log(error, "tag-error")
    throw {
      statusCode: 404,
      message: "Not Found",
    };
  }
};



module.exports = {
  create,
  countAll,
  first
};