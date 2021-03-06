//en modelo declaramos las propiedades de algo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    idSpace: String,
    usuario: String,
    fechaInicio:Date,
    fechaEntrega:Date,
    email:String,
    reserva:Boolean
  });
  

module.exports = mongoose.model("LoanSpace", UserSchema)