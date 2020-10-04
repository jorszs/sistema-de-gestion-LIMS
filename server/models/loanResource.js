//en modelo declaramos las propiedades de algo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    idRecurso: String,
    usuario: String,
    fechaInicio:Date,
    fechaEntrega:Date,
    email:String,
    reserva:Boolean
  });
  
module.exports = mongoose.model("LoanResource", UserSchema)