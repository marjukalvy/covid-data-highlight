export interface CountryAccumulatedData {
    isoCode: string;
    totalVaccinations: number;
    people_vaccinated: number;
    people_fully_vaccinated: number;
    daily_vaccinations: number;
    people_vaccinated_per_hundred: number;
    total_vaccinations_per_hundred: number;
    daily_vaccinations_per_million: number
}