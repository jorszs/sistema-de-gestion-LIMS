//en modelo declaramos las propiedades de algo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    code: {
      type: String,
      unique: true
    },
    name: String,
    description: String,
    state:Boolean
  });
  
  module.exports = mongoose.model("Resource", UserSchema)