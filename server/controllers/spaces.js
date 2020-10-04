const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const Space = require("../models/spaces");
const LoanSpace = require("../models/loanSpace");

//saca la informacion del prestamo de un recurso segun su id único

//obtiene todos los espacios
function getSpacesReport(req, res) {
  Space.find().exec((err, data) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!data) {
        res.status(404).send({ message: "no se ha encontrado ningun espacio" });
      } else {
        res.status(200).send({ listado: data });
      }
    }
  });
}

//saca la informacion del prestamo de un recurso segun su id único
function getInfoSpace(req, res) {
  const query = req.query;
  var f = new Date();
  var dia = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 0, 0, 0);
  LoanSpace.find({
    reserva: true,
    idSpace: query.id,
    fechaInicio: { $gte: dia },
  }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!data) {
        res.status(404).send({ message: "no se ha encontrado ningun espacio" });
      } else {
        res.status(200).send({ listado: data });
      }
    }
  });
}

//crea el préstamo del espacio
async function createLoanSpace(req, res) {
  const loanSpace = new LoanSpace();
  const {
    idSpace,
    usuario,
    fechaInicio,
    fechaEntrega,
    email,
    reserva,
  } = req.body;
  loanSpace.idSpace = idSpace;
  loanSpace.usuario = usuario;
  loanSpace.fechaInicio = fechaInicio;
  loanSpace.fechaEntrega = fechaEntrega;
  loanSpace.email = email;
  loanSpace.reserva = reserva;

  //guarda los datos de préstamo del espacio
  await loanSpace.save((err, loanSpaceStore) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!loanSpaceStore) {
        res.status(404).send({ message: "error al solicitar el espacio " });
      } else {
        res.status(200).send({ message: "préstamo aceptado!" });
      }
    }
  });
}

//elimina un espacio
async function deleteSpace(req, res) {
  const id = req.query.id;
  await LoanSpace.updateMany({ idSpace: id }, { reserva: false });
  Space.findByIdAndRemove(id, (err, spaceDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!spaceDeleted) {
        res.status(404).send({ message: "Espacio no encontrado." });
      } else {
        res
          .status(200)
          .send({ message: "El espacio ha sido eliminado correctamente" });
      }
    }
  });
}

//crea un espacio
function createSpace(req, res) {
  const space = new Space();
  const { name, description, state } = req.body;
  space.name = name;
  space.description = description;
  space.state = state;

  space.save((err, spaceStored) => {
    if (err) {
      res.status(500).send({ message: "el espacio ya existe" });
    } else {
      if (!spaceStored) {
        res.status(404).send({ message: "error al crear el recurso" });
      } else {
        res.status(200).send({ space: spaceStored });
      }
    }
  });
}

//obtiene todos los espacios
function getSpaces(req, res) {
  const query = req.query;
  Space.find({ state: query.state }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!data) {
        res.status(404).send({ message: "no se ha encontrado ningun espacio" });
      } else {
        res.status(200).send({ listado: data });
      }
    }
  });
}

//activar y desactivar espacio
function activateSpace(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  Space.findByIdAndUpdate(id, { state }, (err, ResourceStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!ResourceStored) {
        res.status(404).send({ message: "No se ha encontrado el espacio." });
      } else {
        if (state === true) {
          res.status(200).send({ message: "Espacio activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Espacio desactivado correctamente." });
        }
      }
    }
  });
}
module.exports = {
  getSpacesReport,
  getInfoSpace,
  createLoanSpace,
  deleteSpace,
  createSpace,
  getSpaces,
  activateSpace,
};
