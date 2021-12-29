const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const QueryRepo = requireRepo("query");

describe("Test API UserCanViewQuery", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_view_query_by_uuid", async () => {
    let respondResult;
    try {
      const testQuery = await QueryRepo.create(
        {
          title: "query 1",
          anonymous: true,
          owner_uuid: contextClassRef.user.user_uuid
        },

      );
      const app = httpServer();

      respondResult = await app.inject({
        method: "GET",
        url: `/query/${testQuery.uuid}`, // This should be in endpoints.js
        headers:contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }
    expect(respondResult.statusCode).toBe(200);
    // expect(respondResult.json()).toMatchObject({});
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
    });
  });
});
