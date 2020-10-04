const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

//load routings
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");
const resourcesRoutes = require("./routers/resources")
const spacesRoutes = require("./routers/spaces")
const loanRoutes = require("./routers/loan");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//router basic
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, resourcesRoutes)
app.use(`/api/${API_VERSION}`, spacesRoutes)
app.use(`/api/${API_VERSION}`, loanRoutes)

module.exports = app;
