const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanViewHisPostedQueries", () => {
  it("user_can_view_his_queries", async () => {
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
          owner_uuid: contextClassRef.user.user_uuid,
        },
      );
      result = await testStrategy("Queries/UserCanViewHisPostedQueries", {
        prepareResult: contextClassRef.user.user_uuid 

      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          owner_uuid: contextClassRef.user.user_uuid
        }),

      ])
    );
  });
});
