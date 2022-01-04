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
        ["get", "/queries", "Queries/UserCanViewAllQueries"], // can pass tags in request as /queries?tag=tag1,tag2
        ["get", "/queries/:query_uuid", "Queries/UserCanViewQuery"],
        ["post", "/query-by-tags", "Queries/UserCanViewQueriesByTags"],
        ["delete", "/queries/:query_uuid", "Queries/UserCanDeleteQuery"],
        ["put", "/queries/:query_uuid", "Queries/UserCanUpdateQuery"],
        ["get", "/answered-queries", "Queries/UserCanViewAnsweredQueries"],
        //tags
        ["post", "/tags", "Tags/UserCanCreateTags"],
        ["get", "/tags", "Tags/UserCanViewTags"],
        ["delete", "/tags/:tag_uuid", "Tags/UserCanDeleteTags"],
        ["put", "/tags/:tag_uuid", "Tags/UserCanUpdateTags"],

        //responses
        ["post", "/responses", "Responses/UserCanAddResponse"],
        ["get", "/responses/:query_uuid", "Responses/UserCanViewResponsesOfQuery"],
        ["delete", "/responses/:response_uuid", "Responses/UserCanDeleteResponse"],
        ["put", "/responses/:response_uuid", "Responses/UserCanUpdateResponse"],
      ],
    },
  ];
};
