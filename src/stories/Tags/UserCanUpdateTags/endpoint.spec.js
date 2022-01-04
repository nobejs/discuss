const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const TagsRepo = requireRepo("tag");

describe("Test API UserCanUpdateTags", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("dummy_story_which_will_pass", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
        name: "tag 2"
      };
      const testTag = await TagsRepo.create(
        {
          name: "tag 1",
        },
      );

      respondResult = await app.inject({
        method: "PUT",
        url: `/tags/${testTag.uuid}`, // This should be in endpoints.js
        payload,
        headers:contextClassRef.headers
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      name:"tag 2"
    });
  });
});
