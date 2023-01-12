const neptune = require("@teurons/neptune-nodejs");
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

    const query = await QueryRepo.findByUuid({
      uuid: res.query_uuid,
    });

    if (query && query.owner_uuid && query.owner_uuid !== res.owner_uuid) {
      const eventType = "ask_anything_query_user_response";
      const eventData = {
        data: JSON.stringify(res),
        notification_type: "ask_anything_query_user_response",
      };
      const neptuneData = {
        user_id: query.owner_uuid,
      };
      await neptune.fire(eventType, eventData, neptuneData);
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
