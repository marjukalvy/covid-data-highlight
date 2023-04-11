"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCovidInformation = exports.getCountryData = exports.getCovidData = void 0;
var CountryDataService_1 = require("./DataService/CountryDataService");
var CovidInformationDataService_1 = require("./DataService/CovidInformationDataService");
function getCovidData(req, res) {
    var covidData = (0, CountryDataService_1.CountryDataService)();
    res.json(covidData);
}
exports.getCovidData = getCovidData;
function getCountryData(req, res) {
    var countryData = (0, CovidInformationDataService_1.CovidInformationDataService)();
    res.json(countryData);
}
exports.getCountryData = getCountryData;
function getCovidInformation(req, res) {
    var startYear = Number(req.query.startYear);
    var endYear = Number(req.query.endYear);
    /* if (!ValidationService.validateYearParams(startYear, endYear)) {
      let err = new Error("Invalid year parameters");
      ExceptionService.errorHandler(err, req, res);
    } else {
      res.json(CovidInformationBetweenTwoYears(startYear, endYear));
    } */
    res.json((0, CovidInformationDataService_1.CovidInformationBetweenTwoYears)(startYear, endYear));
}
exports.getCovidInformation = getCovidInformation;
