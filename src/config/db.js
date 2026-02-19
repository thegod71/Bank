const mongoose = require("mongoose");

function connecToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Server is connected to db");
    })
    .catch((err) => {
      console.log("Error is occur");
      process.exit(1); // here is any fault close the server
    });
}

module.exports = connecToDB;
