import { server } from "./server/server.js";

const PORT = process.env.PORT || 3000;
process.env.TZ = "UTC";

server.listen(PORT, () => {
  console.log("Express Ready.");
  console.log(`Server started at http://localhost:${PORT}`);
});
