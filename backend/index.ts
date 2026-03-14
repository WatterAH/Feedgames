console.time("Boot Time");

import { server } from "./src/server";

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.timeEnd("Boot Time");
  console.log(`Server started at http://localhost:${PORT}`);
});
