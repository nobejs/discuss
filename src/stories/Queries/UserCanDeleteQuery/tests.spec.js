const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanDeleteQuery", () => {
  it("user_can_delete_query", async () => {
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
      result = await testStrategy("Queries/UserCanDeleteQuery", {
        prepareResult: {
          query_uuid: testQuery.uuid
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({});
  });
});
