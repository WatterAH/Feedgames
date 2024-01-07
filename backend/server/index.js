import { app } from "./app.js";

const PORT = process.env.PORT || 3000;
process.env.TZ = "UTC";

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
