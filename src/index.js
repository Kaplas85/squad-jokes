const app = require("./app");

if (require.main === module) {
  app.listen(8000, () => console.log("Listening on :8000"));
}
