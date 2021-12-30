const QueryRepo = requireRepo("query");
const QuerySerializer = requireSerializer("query");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  console.log(req,"rereq")
  return {};
};

const authorize = async ({ prepareResult }) => {
  try {
    if (0) {
      throw {
        statusCode: 401,
        message: "Unauthorized",
      };
    }

    return true;
  } catch (error) {
    throw error;
  }
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    //console.log(prepareResult,"prepre")
    return await QueryRepo.getAllQueries();
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    console.log(handleResult,"handle")
    return await QuerySerializer.list(handleResult);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};