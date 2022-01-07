const pickKeysFromObject = requireUtil("pickKeysFromObject");


module.exports = async (instance, includes = []) => {
  const attributes = ["uuid", "name"];
  const tagsObject = pickKeysFromObject(instance, attributes);

  return tagsObject;
};