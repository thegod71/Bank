const express = require("express");

const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const accountRouter = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const app = express(); // instance of server

app.use(express.json()); // this is because  ki express ka server req.body ka data read nhi kr skta  hai to express ka server ussko padh ska ess ka liya
app.use(cookieParser()); // it is a middleware

app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transaction", transactionRoutes);

module.exports = app;
