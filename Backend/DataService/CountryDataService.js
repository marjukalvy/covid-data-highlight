"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryDataService = void 0;
var DeserializerData_1 = require("../Utils/DeserializerData");
var vaccineData = require('../jsonData/vaccination.json');
// Deserialize data 
var vaccinationData = DeserializerData_1.DeserializerData.deserializeVaccineData(vaccineData);
// Accumulate visual helper data
function accumulateData(data) {
    var accumulatedData = [];
    data.forEach(function (country) {
        var isoCode = country.isoCode;
        var totalVaccinations = country.data.reduce(function (acc, d) { var _a; return acc + ((_a = d.totalVaccinations) !== null && _a !== void 0 ? _a : 0); }, 0);
        var people_vaccinated = country.data.reduce(function (acc, d) { var _a; return acc + ((_a = d.peopleFullyVaccinated) !== null && _a !== void 0 ? _a : 0); }, 0);
        var people_fully_vaccinated = country.data.reduce(function (acc, d) { var _a; return acc + ((_a = d.peopleFullyVaccinated) !== null && _a !== void 0 ? _a : 0); }, 0);
        var daily_vaccinations = country.data.reduce(function (acc, d) { var _a; return acc + ((_a = d.dailyVaccinations) !== null && _a !== void 0 ? _a : 0); }, 0);
        var people_vaccinated_per_hundred = country.data.reduce(function (acc, d) { var _a; return acc + ((_a = d.totalVaccinationsPerHundred) !== null && _a !== void 0 ? _a : 0); }, 0);
        var total_vaccinations_per_hundred = country.data.reduce(function (acc, d) { var _a; return acc + ((_a = d.peopleVaccinatedPerHundred) !== null && _a !== void 0 ? _a : 0); }, 0);
        var daily_vaccinations_per_million = country.data.reduce(function (acc, d) { var _a; return acc + ((_a = d.dailyVaccinationsPerMillion) !== null && _a !== void 0 ? _a : 0); }, 0);
        accumulatedData.push({
            isoCode: isoCode,
            totalVaccinations: totalVaccinations,
            people_vaccinated: people_vaccinated,
            people_fully_vaccinated: people_fully_vaccinated,
            daily_vaccinations: daily_vaccinations,
            people_vaccinated_per_hundred: people_vaccinated_per_hundred,
            total_vaccinations_per_hundred: total_vaccinations_per_hundred,
            daily_vaccinations_per_million: daily_vaccinations_per_million
        });
    });
    return accumulatedData;
}
var CountryDataService = function () {
    return accumulateData(vaccinationData);
};
exports.CountryDataService = CountryDataService;
