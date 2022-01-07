const knex = requireKnex()

afterAll(() => {
  knex.destroy();
});
