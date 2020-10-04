const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false); //solucion a error de peticiones a base de datos findandmodify
mongoose.connect(
  process.env.DB_URL ||
  `mongodb+srv://user:123@limscluster-0oino.mongodb.net/lims?retryWrites=true`, //`mongodb://${IP_SERVER}:${PORT_DB}/jorgeDb`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("la conexion a la base de datos es correcta");

      app.listen(port, () => {});
    }
  }
);
