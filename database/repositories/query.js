const knex = require("../knex");
const { addCreatedTimestamps } = require("./helper");



const create = async (payload) => {
  try {
    payload = addCreatedTimestamps(payload);

    let result = await knex.transaction(async (trx) => {
      const query = await trx("queries").insert(payload).returning("*");
      return query[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  create
};