"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CovidInformationBetweenTwoYears = exports.CovidInformationDataService = void 0;
var covidData = require('../jsonData/owid-covid-data.json');
var responseData;
var CountryInformationWithCovid = Object.keys(covidData).map(function (key) {
    return {
        iso_code: key,
        continent: covidData[key].continent,
        location: covidData[key].location,
        population_density: covidData[key].population_density,
        life_expectancy: covidData[key].life_expectancy,
        aged_65_older: covidData[key].aged_65_older,
        aged_70_older: covidData[key].aged_70_older,
        gdp_per_capita: covidData[key].gdp_per_capita,
        extreme_poverty: covidData[key].extreme_poverty,
        cardiovasc_death_rate: covidData[key].cardiovasc_death_rate,
        diabetes_prevalence: covidData[key].diabetes_prevalence,
        female_smokers: covidData[key].female_smokers,
        male_smokers: covidData[key].male_smokers,
        handwashing_facilities: covidData[key].handwashing_facilities,
        hospital_beds_per_thousand: covidData[key].hospital_beds_per_thousand,
        human_development_index: covidData[key].human_development_index,
        data: covidData[key].data.map(function (data) {
            return {
                date: data.date,
                new_deaths: data.new_deaths,
                new_cases_per_million: data.new_cases_per_million,
                new_deaths_per_million: data.new_deaths_per_million,
                total_vaccinations: data.total_vaccinations,
                people_vaccinated: data.people_vaccinated,
                people_fully_vaccinated: data.people_fully_vaccinated,
                daily_vaccinations_raw: data.daily_vaccinations_raw,
                daily_vaccinations: data.daily_vaccinations,
                total_vaccinations_per_hundred: data.total_vaccinations_per_hundred,
                people_vaccinated_per_hundred: data.people_vaccinated_per_hundred,
                people_fully_vaccinated_per_hundred: data.people_fully_vaccinated_per_hundred,
                daily_vaccinations_per_million: data.daily_vaccinations_per_million,
            };
        })
    };
});
var startYear = 2021;
var endYear = 2022;
var CountryInformationBasedOnYear = Object.keys(covidData).map(function (key) {
    return {
        iso_code: key,
        continent: covidData[key].continent,
        location: covidData[key].location,
        data: covidData[key].data
            .filter(function (data) {
            var year = new Date(data.date).getFullYear();
            return year >= startYear && year <= endYear;
        })
            .map(function (data) {
            return {
                date: data.date,
                new_deaths: data.new_deaths,
                new_cases_per_million: data.new_cases_per_million,
                new_deaths_per_million: data.new_deaths_per_million,
                total_vaccinations: data.total_vaccinations,
                people_vaccinated: data.people_vaccinated,
                people_fully_vaccinated: data.people_fully_vaccinated,
                daily_vaccinations_raw: data.daily_vaccinations_raw,
                daily_vaccinations: data.daily_vaccinations,
                total_vaccinations_per_hundred: data.total_vaccinations_per_hundred,
                people_vaccinated_per_hundred: data.people_vaccinated_per_hundred,
                people_fully_vaccinated_per_hundred: data.people_fully_vaccinated_per_hundred,
                daily_vaccinations_per_million: data.daily_vaccinations_per_million,
            };
        })
    };
});
var countryInformation = Object.keys(covidData).map(function (key) {
    return {
        iso_code: key,
        continent: covidData[key].continent,
        location: covidData[key].location,
        population_density: covidData[key].population_density,
        life_expectancy: covidData[key].life_expectancy,
        aged_65_older: covidData[key].aged_65_older,
        aged_70_older: covidData[key].aged_70_older,
        gdp_per_capita: covidData[key].gdp_per_capita,
        extreme_poverty: covidData[key].extreme_poverty,
        cardiovasc_death_rate: covidData[key].cardiovasc_death_rate,
        diabetes_prevalence: covidData[key].diabetes_prevalence,
        female_smokers: covidData[key].female_smokers,
        male_smokers: covidData[key].male_smokers,
        handwashing_facilities: covidData[key].handwashing_facilities,
        hospital_beds_per_thousand: covidData[key].hospital_beds_per_thousand,
        human_development_index: covidData[key].human_development_index
    };
});
var CovidInformationDataService = function () {
    return countryInformation;
};
exports.CovidInformationDataService = CovidInformationDataService;
var CovidInformationBetweenTwoYears = function (startYear, endYear) {
    return CountryInformationBasedOnYear;
};
exports.CovidInformationBetweenTwoYears = CovidInformationBetweenTwoYears;
