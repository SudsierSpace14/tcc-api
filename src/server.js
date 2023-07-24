"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var express_1 = require("express");
require("express-async-errors");
var routes_1 = require("./routes");
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var helmet_1 = require("helmet");
// middlewares
var Error_1 = require("./middlewares/Error");
// database
var database_1 = require("./config/database");
// logger
var logger_1 = require("./config/logger");
// dotenv - be able to load .env variables
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = process.env.PORT || 8080;
var host = process.env.HOST || 'localhost';
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.use((0, morgan_1["default"])('dev')); // Shows the requests and info about them
app.use((0, helmet_1["default"])());
app.use('/api/v1', routes_1["default"]);
// Error handling
app.use(Error_1["default"]);
app
    .listen(port, host, function () {
    (0, database_1["default"])();
    logger_1["default"].info('Connected to: ' + host + ':' + port);
});
