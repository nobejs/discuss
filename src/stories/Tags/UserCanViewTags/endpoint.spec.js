const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const TagsRepo = requireRepo("tag");

describe("Test API UserCanViewTags", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user can view tags", async () => {
    let respondResult;
    try {
      const app = httpServer();
      const testTag = await TagsRepo.create(
        {
          name: "tag 1",
        },
      );

      respondResult = await app.inject({
        method: "GET",
        url: "/tags", // This should be in endpoints.js
        headers:contextClassRef.headers
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          name:"tag 1"
        }),
      ])
    );
  });
});
