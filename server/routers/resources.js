const md_auth = require("../middleware/authenticated");
const express = require("express");
const resourceController = require("../controllers/resources");

const api = express.Router();

api.post("/create-resource", resourceController.createResource);
api.get("/get-resources", resourceController.getResources);
api.delete("/delete-resource", resourceController.deleteResource);

//prestamos
api.post("/create-loan-resource", resourceController.createLoanResource);
api.get("/get-info-resource", resourceController.getInfoResource);

//reporte
api.get("/get-resources-report", resourceController.getResourcesReport);

//activar o desactivar recurso
api.put(
  "/activate-resource/:id",
  [md_auth.ensureAuth],
  resourceController.activateResource
);

module.exports = api;
