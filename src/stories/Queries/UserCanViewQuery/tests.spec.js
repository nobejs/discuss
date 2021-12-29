const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanViewQuery", () => {
  it("user_can_view_query_by_uuid", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
      };

      const testQuery = await QueryRepo.create(
        {
          title: "query 1",
          anonymous: true,
          owner_uuid: contextClassRef.user.user_uuid
        },

      );
      result = await testStrategy("Queries/UserCanViewQuery", {
        prepareResult: {
          query_uuid: testQuery.uuid
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
    });
  });
});
