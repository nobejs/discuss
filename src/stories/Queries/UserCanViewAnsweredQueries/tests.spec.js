const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const ResponseRepo = requireRepo("response");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanViewAnsweredQueries", () => {
  it("user can view his answered queries", async () => {
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
      result = await testStrategy("Queries/UserCanViewAnsweredQueries", {
        prepareResult: contextClassRef.user.user_uuid ,
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          owner_uuid: contextClassRef.user.user_uuid,
          title: "query 1"
        }),

      ])
    );
  });
});
