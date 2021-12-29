const contextClassRef = requireUtil("contextHelper");
const QueryRepo = requireRepo("query");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();

module.exports = async () => {
console.log("herehere")
  contextClassRef.user = randomUser();
  contextClassRef.headers = {
    Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
  };

  console.log(contextClassRef,"cococn")


  const testQuery = await QueryRepo.create(
    {
        title: "query 1",
        anonymous: true,
    },
   
  );
  console.log(testQuery,"testtest")
  contextClassRef.testQuery = testQuery;

  contextClassRef.headers = {
    Authorization: `Bearer ${contextClassRef.token}`,
  };
};
