const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const ResponseRepo = requireRepo("response");
describe("Test API UserCanUpdateResponse", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user can delete response", async () => {
    let respondResult;
    try {
      const app = httpServer();
      const testResponse = await ResponseRepo.create({
        answer:"answer 11",
        query_uuid:"5a75d442-975e-4eb8-aca0-4c156a7be037",
        anonymous: true,
        owner_uuid: contextClassRef.user.user_uuid,
      })

      const payload = {
        answer:"answer 2222",
        query_uuid:"5a75d442-975e-4eb8-aca0-4c156a7be037",
        anonymous: false,
        owner_uuid: contextClassRef.user.user_uuid,
      };

      respondResult = await app.inject({
        method: "PUT",
        url:`/responses/${testResponse.uuid}`, // This should be in endpoints.js
        payload,
        headers:contextClassRef.headers
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      answer:"answer 2222",
      query_uuid:"5a75d442-975e-4eb8-aca0-4c156a7be037",
      anonymous: false,
    });
  });
});
