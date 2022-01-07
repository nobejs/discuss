const single = require("./single");

module.exports = async (queries) => {
  let result = await Promise.all(
    queries.map((c) => {
      return single(c);
    })
  );

  return result;
};