import { server } from "./server/server.js";

const PORT = process.env.PORT || 3000;
process.env.TZ = "UTC";

server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
