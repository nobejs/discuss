const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const QueryRepo = requireRepo("query");
describe("Test API UserCanUpdateQuery", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_update_query", async () => {
    let respondResult;
    try {
      const app = httpServer();
      const testQuery = await QueryRepo.create(
        {
          title: "query 1",
          anonymous: true,
          owner_uuid: contextClassRef.user.user_uuid
        },

      );
      const payload = {
        title: "query 2",
        anonymous: false
      };

      respondResult = await app.inject({
        method: "PUT",
        url: `/query/${testQuery.uuid}`, // This should be in endpoints.js
        payload,
        headers: contextClassRef.headers
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      title: "query 2",
      anonymous: false
    });
  });
});
