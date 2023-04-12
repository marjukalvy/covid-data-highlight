"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var apiController_1 = require("./apiController");
var app = express();
var port = 5000;
//Middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//Countries
app.get('/get-covid-data', apiController_1.getCovidData);
//Vaccination Data
app.get('/get-country-data', apiController_1.getCountryData);
//Covid Information
app.get('/get-covid-information', apiController_1.getCovidInformation);
//Pull data
app.get('/pull-data', apiController_1.storeData);
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
