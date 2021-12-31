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
        ["post", "/query", "Queries/UserCanCreateQueries"],
        ["get", "/query", "Queries/UserCanViewAllQueries"],
        ["get", "/query/:query_uuid", "Queries/UserCanViewQuery"],
        ["get", "/posted-query/:user_uuid", "Queries/UserCanViewHisPostedQueries"],
        ["post", "/query-by-tags", "Queries/UserCanViewQueriesByTags"],
        ["delete", "/query/:query_uuid", "Queries/UserCanDeleteQuery"],
        ["put", "/query/:query_uuid", "Queries/UserCanUpdateQuery"],
        //tags
        ["post", "/tags", "Tags/UserCanCreateTags"],
      ],
    },
  ];
};
