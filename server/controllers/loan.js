//obtiene todos los recursos
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const LoanResource = require("../models/loanResource");
const LoanSpace = require("../models/loanSpace");
const Resource = require("../models/resources");
const Space = require("../models/spaces");

//entrega el prestamo independiente de ser un recurso o espacio
async function entregarLoan(req, res) {
  const { idLoan, id, email } = req.body;

  LoanResource.findOneAndUpdate(
    { _id: idLoan, idRecurso: id, email: email },
    { reserva: false },
    (err, resourceStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (resourceStored) {
          res.status(200).send({ resourceStored });
        } else {
          LoanSpace.findOneAndUpdate(
            { _id: idLoan, idSpace: id, email: email },
            { reserva: false },
            (err, spaceStored) => {
              if (err) {
                res.status(500).send({ message: "Error del servidor." });
              } else {
                if (!spaceStored) {
                  res
                    .status(404)
                    .send({ message: "No se ha encontrado el espacio." });
                } else {
                  res.status(200).send({ spaceStored });
                }
              }
            }
          );
        }
      }
    }
  );
}

function getInfoProfileSpace(req, res) {
  const query = req.query;
  Space.find({ _id: query.id }).exec((err, data) => {
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

function getInfoProfileResource(req, res) {
  const query = req.query;
  Resource.find({ _id: query.id }).exec((err, data) => {
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

function getLoanResource(req, res) {
  const query = req.query;

  LoanResource.find({ reserva: true, email: query.email }).exec((err, data) => {
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

function getLoanSpace(req, res) {
  const query = req.query;

  LoanSpace.find({ reserva: true, email: query.email }).exec((err, data) => {
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

module.exports = {
  entregarLoan,
  getInfoProfileSpace,
  getInfoProfileResource,
  getLoanResource,
  getLoanSpace,
};
