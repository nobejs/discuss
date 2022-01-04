const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const QueryRepo = requireRepo("query");
const ResponseRepo = requireRepo("response");

describe("Test API UserCanViewResponsesOfQuery", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user can view response of a query", async () => {
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

      const testResponse = await ResponseRepo.create({
        answer: "answer 11",
        query_uuid: testQuery.uuid,
        owner_uuid: contextClassRef.user.user_uuid,
        anonymous: true,
      })

      respondResult = await app.inject({
        method: "GET",
        url: `/responses/${testQuery.uuid}`, // This should be in endpoints.js
        headers:contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toEqual(
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
