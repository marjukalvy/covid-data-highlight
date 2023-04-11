import { VaccinationData } from "../Model/VaccinationData";

export class DeserializerData {
    static deserializeVaccineData(data: any): VaccinationData[]  {
        return data.map((data: any) => ({
          location: data.location,
          isoCode: data.iso_code,
          data: data.data.map((entry: any) => ({
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
          })),
        }));
      }
} 

