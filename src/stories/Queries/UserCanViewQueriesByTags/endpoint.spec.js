const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const randomUser = requireUtil("randomUser");
const httpServer = requireHttpServer();

describe("Test API UserCanViewQueriesByTags", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_view_queries_by_tags", async () => {
    let respondResult;

    try {
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

      const app = httpServer();

      const payload = {
        tags:tagIds
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/query-by-tags", // This should be in endpoints.js
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          title: 'query 1'
        }),
       
      ])
    );
  });
});
