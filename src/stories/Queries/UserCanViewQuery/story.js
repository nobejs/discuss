const QueryRepo = requireRepo("query");
const QuerySerializer = requireSerializer("query");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  return reqParams
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
    return await QueryRepo.findByUuid({
      uuid: prepareResult.query_uuid,
    });
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return handleResult;
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
