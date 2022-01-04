const pickKeysFromObject = requireUtil("pickKeysFromObject");


module.exports = async (instance, includes = []) => {
  const attributes = ["uuid", "query_uuid", "owner_uuid",'answer','anonymous', 'meta','created_at','updated_at'];
  const responseObject = pickKeysFromObject(instance, attributes);

  return responseObject;
};