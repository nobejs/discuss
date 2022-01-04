const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const TagsRepo = requireRepo("tag");
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanDeleteTags", () => {
  it("user can delete tags", async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
    const testTag = await TagsRepo.create(
      {
        name: "tag 1",
      },
    );
    let result = {};
    try {
      result = await testStrategy("Tags/UserCanDeleteTags", {
        prepareResult: {
          tag_uuid: testTag.uuid
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      message: "success"
    });
  });
});
