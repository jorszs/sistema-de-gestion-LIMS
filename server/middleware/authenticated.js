const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "aJJD85swD4FG412wMWs5688wDEY5003sPUBME7";

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "La peticion no tiene cabecera de autenticacion." });
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRET_KEY);

        if (payload.exp <= moment.unix()) {
            return res.status(404).send({ message: "el token ha expirado." });
        }
    } catch (ex) {
        return res.status(404).send({ message: "token invalido." })
    }

    req.user = payload;
    next();
}