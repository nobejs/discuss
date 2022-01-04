const single = require("./single");

module.exports = async (responses) => {
  let result = await Promise.all(
    responses.map((c) => {
      return single(c);
    })
  );

  return result;
};