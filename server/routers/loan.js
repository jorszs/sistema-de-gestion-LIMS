const express = require("express");
const loanController = require("../controllers/loan");
const app = require("../app");

const api = express.Router();

api.get("/get-loan-resource", loanController.getLoanResource);
api.get("/get-loan-space", loanController.getLoanSpace);

api.get("/get-loan-resource-profile", loanController.getInfoProfileResource);
api.get("/get-loan-space-profile", loanController.getInfoProfileSpace);

api.post("/entregar-loan", loanController.entregarLoan);

module.exports = api;