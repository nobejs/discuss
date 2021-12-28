const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanCreateTags", () => {
  it("user can create tags", async () => {
    let result = {};
    try {
      result = await testStrategy("UserCanCreateTags", {
        prepareResult: {
          name:'tag1'
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      name: expect.any(String)
    });
  });
});
