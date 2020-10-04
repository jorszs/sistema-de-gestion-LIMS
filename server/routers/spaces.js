const md_auth = require("../middleware/authenticated");
const express = require("express");
const spacesController = require("../controllers/spaces");

const api = express.Router();

api.get("/get-spaces", spacesController.getSpaces);
api.post("/create-space", spacesController.createSpace);
api.delete("/delete-space", spacesController.deleteSpace);

//prestamos
api.post("/create-loan-space", spacesController.createLoanSpace);
api.get("/get-info-space", spacesController.getInfoSpace);

//reporte
api.get("/get-spaces-report", spacesController.getSpacesReport);

//activar o desactivar espacio
api.put(
  "/activate-space/:id",
  [md_auth.ensureAuth],
  spacesController.activateSpace
);

module.exports = api;
