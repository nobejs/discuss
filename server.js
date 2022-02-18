const Config = require("./config")();
const httpServer = requireHttpServer();

const server = httpServer({});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException("error", e);
  } finally {
    console.log("backend-discuss");
    transaction.finish();
  }
}, 99);

server.listen(process.env.PORT || 3000, "0.0.0.0", (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
