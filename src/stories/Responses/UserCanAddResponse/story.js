const neptuneCaller = require("../../../functions/neptune/neptuneCaller");
const validator = requireValidator();
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const ResponseRepo = requireRepo("response");
const QueryRepo = requireRepo("query");
const ResponseSerializer = requireSerializer("response");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "answer",
    "query_uuid",
    "meta",
    "anonymous",
  ]);
  payload["owner_uuid"] = req.user;
  return payload;
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

const validateInput = async (prepareResult) => {
  const constraints = {
    owner_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter owner uuid",
      },
    },
    query_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter query uuid",
      },
    },
    answer: {
      presence: {
        allowEmpty: false,
        message: "^Please enter answer",
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
    let res = await ResponseRepo.create(prepareResult);
    console.log("res>>>>>", res, JSON.stringify(res));

    const query = await QueryRepo.findByUuid({
      uuid: res.query_uuid,
    });

    console.log("query -->", query);

    if (query && query.owner_uuid && query.owner_uuid !== res.owner_uuid) {
      await neptuneCaller({
        event_type: "ask_anything_query_user_response",
        user_id: query.owner_uuid,
        data: {
          data: JSON.stringify(res),
          notification_type: "ask_anything_query_user_response",
        },
      });
    }

    return res;
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return ResponseSerializer.single(handleResult);
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
