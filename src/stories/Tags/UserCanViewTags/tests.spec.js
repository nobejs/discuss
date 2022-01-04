const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const TagsRepo = requireRepo("tag");
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
describe("Test Handler UserCanViewTags", () => {
  it("user can view tags", async () => {
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
      result = await testStrategy("Tags/UserCanViewTags", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          name:"tag 1"
        }),
      ])
    );
  });
});
