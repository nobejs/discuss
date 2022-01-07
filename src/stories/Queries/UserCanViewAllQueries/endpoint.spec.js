const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const QueryRepo = requireRepo("query");
describe("Test API UserCanViewAllQueries", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_view_all_queries", async () => {
    let respondResult;
    try {
      const app = httpServer();
      const testQuery = await QueryRepo.create(
        {
          title: "query 1",
          anonymous: true,
          owner_uuid: contextClassRef.user.user_uuid,
        },
      );

      respondResult = await app.inject({
        method: "GET",
        url: "/queries", // This should be in endpoints.js
        headers:contextClassRef.headers
      });
    } catch (error) {
      respondResult = error;
    }

     //expect(respondResult.statusCode).toBe(200);
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
