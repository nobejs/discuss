const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API UserCanCreateQueries", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_create_query", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
        title: "query 1",
        owner_uuid: contextClassRef.user.user_uuid,
        anonymous: true,
        tags: [{ name: "tag1", uuid: "f487f09b-c781-4fa0-b2d6-83e863212b8c" }],
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/query", // This should be in endpoints.js
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }
    // expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      title: "query 1",
      owner_uuid: expect.any(String),
      anonymous: true,
      //tags:expect.any(Array),
    });
  });
});
