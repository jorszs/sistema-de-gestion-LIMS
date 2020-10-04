const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const Resource = require("../models/resources");
const LoanResource = require("../models/loanResource");

//obtiene todos los recursos
function getResourcesReport(req, res) {
  Resource.find().exec((err, data) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!data) {
        res.status(404).send({ message: "no se ha encontrado ningun recurso" });
      } else {
        res.status(200).send({ listado: data });
      }
    }
  });
}

//saca la informacion del prestamo de un recurso segun su id único
function getInfoResource(req, res) {
  const query = req.query;
  var f = new Date();
  var dia = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 0, 0, 0);
  LoanResource.find({
    reserva: true,
    idRecurso: query.id,
    fechaInicio: { $gte: dia },
  }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!data) {
        res.status(404).send({ message: "no se ha encontrado ningun recurso" });
      } else {
        res.status(200).send({ listado: data });
      }
    }
  });
}

//crea el préstamo del recurso y cambia el estado del recurso
async function createLoanResource(req, res) {
  const loanResource = new LoanResource();
  const {
    idRecurso,
    usuario,
    fechaInicio,
    fechaEntrega,
    email,
    reserva,
  } = req.body;
  loanResource.idRecurso = idRecurso;
  loanResource.usuario = usuario;
  loanResource.fechaInicio = fechaInicio;
  loanResource.fechaEntrega = fechaEntrega;
  loanResource.email = email;
  loanResource.reserva = reserva;

  //guarda los datos de préstamo del recurso
  await loanResource.save((err, loanResourceStore) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!loanResourceStore) {
        res.status(404).send({ message: "error al solicitar el recurso " });
      } else {
        res.status(200).send({ message: "préstamo aceptado!" });
      }
    }
  });
}

// borra un recurso
async function deleteResource(req, res) {
  const id = req.query.id;
  await LoanResource.updateMany({ idRecurso: id }, { reserva: false });
  Resource.findByIdAndRemove(id, (err, resourceDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!resourceDeleted) {
        res.status(404).send({ message: "Recurso no encontrado." });
      } else {
        res
          .status(200)
          .send({ message: "El recurso ha sido eliminado correctamente" });
      }
    }
  });
}

// crea un recurso
function createResource(req, res) {
  const resource = new Resource();
  const { code, name, description, state } = req.body;
  resource.code = code;
  resource.name = name;
  resource.description = description;
  resource.state = state;

  resource.save((err, resourceStored) => {
    if (err) {
      res.status(500).send({ message: "el recurso ya existe" });
    } else {
      if (!resourceStored) {
        res.status(404).send({ message: "error al crear el recurso" });
      } else {
        res.status(200).send({ resource: resourceStored });
      }
    }
  });
}

//obtiene todos los recursos
function getResources(req, res) {
  const query = req.query;
  Resource.find({ state: query.state }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!data) {
        res.status(404).send({ message: "no se ha encontrado ningun recurso" });
      } else {
        res.status(200).send({ listado: data });
      }
    }
  });
}

//activar y desactivar recurso
function activateResource(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  Resource.findByIdAndUpdate(id, { state }, (err, ResourceStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!ResourceStored) {
        res.status(404).send({ message: "No se ha encontrado el recurso." });
      } else {
        if (state === true) {
          res.status(200).send({ message: "Recurso activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Recurso desactivado correctamente." });
        }
      }
    }
  });
}

module.exports = {
  getResourcesReport,
  getInfoResource,
  createLoanResource,
  createResource,
  getResources,
  deleteResource,
  activateResource,
};
