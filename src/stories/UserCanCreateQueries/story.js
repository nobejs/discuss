const validator = requireValidator();
const QueryRepo = requireRepo("query");
const QuerySerializer = requireSerializer("query");
const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, ["title", "anonymous"]);
  console.log(req.user,"useruser")
  payload["owner_uuid"] = "01"
  return payload;
};

const authorize = () => {
  return true;
};

const validateInput = async (prepareResult) => {
  const constraints = {
    owner_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter owner uuid",
      },
    },
    title: {
      presence: {
        allowEmpty: false,
        message: "^Please enter title",
      },
    },
    anonymous: {
      presence: {
        allowEmpty: false,
        message: "^Please enter anonymous status",
      },
    },
  };

  return validator(prepareResult, constraints);
};
const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    return await QueryRepo.create(prepareResult);
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return await QuerySerializer.single(handleResult);
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
