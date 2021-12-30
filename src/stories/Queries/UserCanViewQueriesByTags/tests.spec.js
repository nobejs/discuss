const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanViewQueriesByTags", () => {
  it("user_can_view_queries_by_tags", async () => {
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
          tags: [
            {name:"tag1",uuid:"1f750501-9fb0-4cb1-9bce-d7860f29c45f"}
        ]
        },
      );

      const tagIds = await QueryRepo.getTagbyQueryId(testQuery.uuid)
      
      result = await testStrategy("Queries/UserCanViewQueriesByTags", {
        prepareResult:[...tagIds]   
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          title: 'query 1'
        }),
       
      ])
    );
  });
});
