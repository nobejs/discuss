const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const TagsRepo = requireRepo("tag");
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
describe("Test Handler UserCanUpdateTags", () => {
  it("user can update tags", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      const testTag = await TagsRepo.create(
        {
          name: "tag 1",
        },
      );
      result = await testStrategy("Tags/UserCanUpdateTags", {
        prepareResult: {
          reqParams:{ tag_uuid: testTag.uuid } ,
          reqBody: {
            name: "tag 2",
          }
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      name:"tag 2"
    });
  });
});
