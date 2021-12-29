const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

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


      respondResult = await app.inject({
        method: "GET",
        url: "/query", // This should be in endpoints.js
        headers:contextClassRef.headers
      });
    } catch (error) {
      respondResult = error;
    }

     expect(respondResult.statusCode).toBe(200);
     expect(respondResult).toEqual(
      expect.arrayContaining([

      ])
    );
  });
});
