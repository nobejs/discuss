const pickKeysFromObject = requireUtil("pickKeysFromObject");


module.exports = async (instance, includes = []) => {
  const attributes = ["uuid", "title", "owner_uuid",'anonymous'];
  const queryObject = pickKeysFromObject(instance, attributes);

  return queryObject;
};