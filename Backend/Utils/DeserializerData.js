"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeserializerData = void 0;
var DeserializerData = /** @class */ (function () {
    function DeserializerData() {
    }
    DeserializerData.deserializeVaccineData = function (data) {
        return data.map(function (data) { return ({
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
    };
    return DeserializerData;
}());
exports.DeserializerData = DeserializerData;
