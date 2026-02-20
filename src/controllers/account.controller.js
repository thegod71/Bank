const accountModel = require("../models/account.model");

async function createAccountController(req, res) {
  // ess ka kam  hai ki bus user create krna aur usko res may push kr deyna
  const user = req.user; //  auth.middleware se aaya hai

  const account = await accountModel.create({
    user: user._id, // aur sb by default hai
  });

  res.status(201).json({
    account,
  });
}

async function getUserAccountsController(req, res) {
  const accounts = await accountModel.find({ user: req.user._id });

  res.status(200).json({
    accounts,
  });
}

async function getAccountBalanceController(req, res) {
  const { accountId } = req.params;
  //req.params is used because the accountId is part of the URL path itself, rather than being sent in the body of the request.
  const account = await accountModel.findOne({
    _id: accountId,
    user: req.user._id,
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  const balance = await account.getBalance();

  res.status(200).json({
    accountId: account._id,
    balance: balance,
  });
}

module.exports = {
  createAccountController,
  getUserAccountsController,
  getAccountBalanceController,
};
