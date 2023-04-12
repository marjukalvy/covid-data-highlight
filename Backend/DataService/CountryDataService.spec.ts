import { CountryDataService } from './CountryDataService';

describe('CountryDataService', () => {
  it('should return an array of accumulated data for each country', () => {
    const expectedData = [
      {
        isoCode: 'AFG',
        totalVaccinations: 0,
        people_vaccinated: 0,
        people_fully_vaccinated: 0,
        daily_vaccinations: 0,
        people_vaccinated_per_hundred: 0,
        total_vaccinations_per_hundred: 0,
        daily_vaccinations_per_million: 0,
      },
      {
        isoCode: 'ALB',
        totalVaccinations: 0,
        people_vaccinated: 0,
        people_fully_vaccinated: 0,
        daily_vaccinations: 0,
        people_vaccinated_per_hundred: 0,
        total_vaccinations_per_hundred: 0,
        daily_vaccinations_per_million: 0,
      },
      // Add more expected data for other countries
    ];

    const actualData = CountryDataService();

    expect(actualData).toEqual(expectedData);
  });
});
