"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccinationDataService = void 0;
var vaccineData = require('../jsonData/vaccination.json');
// Deserialize the response data into instances of the VaccinationData interface
var vaccinationData = vaccineData.map(function (data) { return ({
    location: data.location,
    isoCode: data.iso_code,
    data: data.data.map(function (entry) { return ({
        date: entry.date,
        totalVaccinations: entry.total_vaccinations,
        peopleVaccinated: entry.people_vaccinated,
        peopleFullyVaccinated: entry.people_fully_vaccinated,
        dailyVaccinationsRaw: entry.daily_vaccinations_raw,
        dailyVaccinations: entry.daily_vaccinations,
        totalVaccinationsPerHundred: entry.total_vaccinations_per_hundred,
        peopleVaccinatedPerHundred: entry.people_vaccinated_per_hundred,
        peopleFullyVaccinatedPerHundred: entry.people_fully_vaccinated_per_hundred,
        dailyVaccinationsPerMillion: entry.daily_vaccinations_per_million,
    }); }),
}); });
// First, let's calculate the total number of vaccinations globally
var totalVaccinations = vaccinationData.reduce(function (total, location) {
    var locationTotal = location.data.reduce(function (locTotal, entry) {
        return locTotal + entry.totalVaccinations;
    }, 0);
    return total + locationTotal;
}, 0);
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
var VaccinationDataService = function () {
    return accumulateData(vaccinationData);
};
exports.VaccinationDataService = VaccinationDataService;
