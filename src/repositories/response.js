const knex = requireKnex()
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
    try {
        payload = baseRepo.addCreatedTimestamps(payload);
        let result = await knex.transaction(async (trx) => {
            const rows = await trx("responses").insert(payload).returning("*");
            return rows[0];
        })
        return result;
    } catch (err) {
        throw err;
    }
}

const findByQueryId = async (id) => {
    try {
        const rows = knex('responses').where('query_uuid', id);
        return rows;
    } catch (err) {
        throw err;
    }
}

const remove = async (where) => {
    try{
        const row = await baseRepo.remove('responses', where, 'hard');
        return row;
    }catch (err) {
        throw err;
    }
}

const update = async (id,payload) =>{
    try{
        const row = await baseRepo.update("responses",{uuid:id},payload);
        return row;
    }catch (err) {
        throw err;
    }

}


module.exports = {
    create,
    findByQueryId,
    remove, 
    update
}