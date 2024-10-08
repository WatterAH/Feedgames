import { server } from "./src/server";

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Express Ready.");
  console.log(`Server started at http://localhost:${PORT}`);
});
