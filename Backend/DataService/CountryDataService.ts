import { VaccinationData } from '../Model/VaccinationData';
import { CountryAccumulatedData } from '../Model/CountryAccumulatedData';
import { DeserializerData } from '../Utils/DeserializerData';

const vaccineData = require('../jsonData/vaccination.json');

// Deserialize data 
const vaccinationData: VaccinationData[] = DeserializerData.deserializeVaccineData(vaccineData);

// Accumulate visual helper data
function accumulateData(data: VaccinationData[]): CountryAccumulatedData[] {
  const accumulatedData: CountryAccumulatedData[] = [];

  data.forEach((country) => {
    const { isoCode } = country;
    const totalVaccinations = country.data.reduce((acc, d) => acc + (d.totalVaccinations ?? 0), 0);
    const people_vaccinated = country.data.reduce((acc, d) => acc + (d.peopleFullyVaccinated ?? 0), 0);
    const people_fully_vaccinated = country.data.reduce((acc, d) => acc + (d.peopleFullyVaccinated ?? 0), 0);
    const daily_vaccinations = country.data.reduce((acc, d) => acc + (d.dailyVaccinations ?? 0), 0);
    const people_vaccinated_per_hundred = country.data.reduce((acc, d) => acc + (d.totalVaccinationsPerHundred ?? 0), 0);
    const total_vaccinations_per_hundred = country.data.reduce((acc, d) => acc + (d.peopleVaccinatedPerHundred ?? 0), 0);
    const daily_vaccinations_per_million = country.data.reduce((acc, d) => acc + (d.dailyVaccinationsPerMillion ?? 0), 0);

    accumulatedData.push({
      isoCode,
      totalVaccinations,
      people_vaccinated,
      people_fully_vaccinated,
      daily_vaccinations,
      people_vaccinated_per_hundred,
      total_vaccinations_per_hundred,
      daily_vaccinations_per_million
    });
  });
  return accumulatedData;
}

export const CountryDataService = () => {
  return accumulateData(vaccinationData);
}






