require("dotenv").config();
//require("dotenv") → dotenv package ko import karta hai
//.config() → .env file ko read karta hai

const app = require("./src/app");
const connecToDB = require("./src/config/db");

connecToDB();
app.listen(3000, () => {
  console.log(`Server is running on http:localhost/3000`);
});
