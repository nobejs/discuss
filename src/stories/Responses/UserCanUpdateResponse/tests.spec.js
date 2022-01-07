const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const ResponseRepo = requireRepo("response");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanUpdateResponse", () => {
  it("user can delete response", async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
    const testResponse = await ResponseRepo.create({
      answer:"answer 11",
      query_uuid:"5a75d442-975e-4eb8-aca0-4c156a7be037",
      owner_uuid: contextClassRef.user.user_uuid,
      anonymous: true,
    })
    try {
      result = await testStrategy("Responses/UserCanUpdateResponse", {
        prepareResult: {
          reqParams:{ response_uuid: testResponse.uuid } ,
          reqBody: {
            answer:"answer 2222",
            query_uuid:"5a75d442-975e-4eb8-aca0-4c156a7be037",
            owner_uuid: contextClassRef.user.user_uuid,
            anonymous: false,
          }
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      answer:"answer 2222",
      query_uuid:"5a75d442-975e-4eb8-aca0-4c156a7be037",
      owner_uuid: contextClassRef.user.user_uuid,
      anonymous: false,
    });
  });
});
