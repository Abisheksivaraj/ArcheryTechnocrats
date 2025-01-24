const connectDb = require("./config/db");
const app = require("./index");
require("dotenv").config();
const PORT = process.env.PORT || 2025;

app.listen(PORT, async () => {
  await connectDb();
  console.log("Archery Technocrats is Running on:" + PORT);
});
