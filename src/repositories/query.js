const knex = require("../../database/knex");
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);

    return await baseRepo.create('queries', payload);
  } catch (error) {
    throw error;
  }
};



module.exports = {
  create
};