const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const ResponseRepo = requireRepo("response");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanViewResponsesOfQuery", () => {
  it("user can view response of a query", async () => {
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

      const testResponse = await ResponseRepo.create({
        answer:"answer 11",
        query_uuid:testQuery.uuid,
        owner_uuid: contextClassRef.user.user_uuid,
        anonymous: true,
      })
      result = await testStrategy("Responses/UserCanViewResponsesOfQuery", {
        prepareResult: {
          query_uuid: testQuery.uuid
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          answer:"answer 11",
          query_uuid:expect.any(String),
          anonymous: true,
        }),

      ])
    );
  });
});
