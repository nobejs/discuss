const pickKeysFromObject = requireUtil("pickKeysFromObject");


module.exports = async (instance, includes = []) => {
  const attributes = ["uuid", "title", "owner_uuid",'anonymous', 'meta','created_at','updated_at','body'];
  const queryObject = pickKeysFromObject(instance, attributes);

  return queryObject;
};