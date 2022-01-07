const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");

describe("Test Handler UserCanAddResponse", () => {
  it("user can add response", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      result = await testStrategy("Responses/UserCanAddResponse", {
        prepareResult: {
          answer:"answer 111",
          query_uuid:"f487f09b-c781-4fa0-b2d6-83e863212b8c",
          anonymous: true,
          owner_uuid:contextClassRef.user.user_uuid,
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      answer:"answer 111",
      query_uuid:"f487f09b-c781-4fa0-b2d6-83e863212b8c",
      anonymous: true,
    });
  });
});
