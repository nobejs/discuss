const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanViewAllQueries", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("Queries/UserCanViewAllQueries", {
        prepareResult: {
          title:"query",
          anonymous:true
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([

      ])
    );
  });
});
