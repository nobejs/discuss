const knex = require("../../database/knex");
const baseRepo = requireUtil("baseRepo");
const tagsRepo = requireRepo("tag");

const create = async (payload) => {
  try {
    console.log(payload,"payload")
    payload = baseRepo.addCreatedTimestamps(payload)
    let tags = payload.tags
    delete payload.tags
    let result = await knex.transaction(async (trx) => {
      const rows = await trx('queries').insert(payload).returning("*");
      return rows[0];
    });
    console.log("result",result)
    console.log(tags,"tags")
    if (tags.length > 0) {
      console.log(tags,"iftags")
      tags.forEach(async(element )=> {
        let tag = await tagsRepo.first("tags", {
          uuid: element.uuid,
          name: element.name
        });

        console.log(tag,"tagfound")
        // if (tag) {
        //   await knex.transaction(async (trx) => {
        //     const rows = await trx('queries_tags').insert({
        //       query_uuid:result.uuid,
        //       tag_uuid:element.uuid
        //     }).returning("*");
            
        //     return rows[0];
        //   });
        // }
        // else {
        //   console.log("elseeles")
        //   const newTag = await baseRepo.create('tags', { name: element.name }, false);
        //   console.log("else", newTag)
        //   await knex.transaction(async (trx) => {
        //     const rows = await trx('queries_tags').insert({
        //       query_uuid:result.uuid,
        //       tag_uuid:newTag.uuid
        //     }).returning("*");
        //     return rows[0];
        //   });
        // }
        const newTag = await baseRepo.create('tags', { name: element.name }, false);
        console.log("else", newTag)
        await knex.transaction(async (trx) => {
          const rows = await trx('queries_tags').insert({
            query_uuid:result.uuid,
            tag_uuid:newTag.uuid
          }).returning("*");
          return rows[0];
        });
      });
    }
   
    return result;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  create
};