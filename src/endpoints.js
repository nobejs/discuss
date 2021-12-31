module.exports = (app) => {
  app.get("/liveness", async (req, res) => {
    return res.code(200).send({ status: "I am alive" });
  });

  app.get("/readiness", async (req, res) => {
    return res.code(200).send({ status: "I am ready" });
  });

  return [
    {
      endpoints: [
        //queries
        ["post", "/queries", "Queries/UserCanCreateQueries"],
        ["get", "/queries", "Queries/UserCanViewAllQueries"],
        ["get", "/queries/:query_uuid", "Queries/UserCanViewQuery"],
        ["get", "/user-posted-query/", "Queries/UserCanViewHisPostedQueries"],
        ["post", "/query-by-tags", "Queries/UserCanViewQueriesByTags"],
        ["delete", "/queries/:query_uuid", "Queries/UserCanDeleteQuery"],
        ["put", "/queries/:query_uuid", "Queries/UserCanUpdateQuery"],
        //tags
        ["post", "/tags", "Tags/UserCanCreateTags"],
      ],
    },
  ];
};
