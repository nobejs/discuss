const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanCreateQueries", () => {
  it("user can create query", async () => {
    let result = {};
    try {
      result = await testStrategy("Queries/UserCanCreateQueries", {
        prepareResult: {
          title: "query 1",
          owner_uuid: "012",     
          anonymous:true
        }
      });

    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;

    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      title: "query 1",
      owner_uuid: "012",
     anonymous:true
    });

  });
});
