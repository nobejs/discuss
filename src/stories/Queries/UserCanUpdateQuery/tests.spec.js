const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanUpdateQuery", () => {
  it("user_can_update_query", async () => {

    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };

      const testQuery = await QueryRepo.create(
        {
          title: "query 1",
          anonymous: true,
          owner_uuid: contextClassRef.user.user_uuid
        },

      );
      result = await testStrategy("Queries/UserCanUpdateQuery", {
        prepareResult: {
          reqParams:{ query_uuid: testQuery.uuid } ,
          reqBody: {
            title: "query 2",
            anonymous: false
          }
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      title: "query 2",
      anonymous: false
    });
  });
});
