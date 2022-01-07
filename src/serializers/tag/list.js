const single = require("./single");

module.exports = async (tags) => {
  let result = await Promise.all(
    tags.map((c) => {
      return single(c);
    })
  );

  return result;
};