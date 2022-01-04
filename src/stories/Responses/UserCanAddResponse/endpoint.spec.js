const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API UserCanAddResponse", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_add_response", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
        answer:"answer 111",
        query_uuid:"f487f09b-c781-4fa0-b2d6-83e863212b8c",
        anonymous: true,
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/responses", // This should be in endpoints.js
        payload,
        headers:contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      answer:"answer 111",
      query_uuid:"f487f09b-c781-4fa0-b2d6-83e863212b8c",
      anonymous: true,
    });
  });
});
