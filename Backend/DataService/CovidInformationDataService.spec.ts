import { CovidInformationDataService, CovidInformationBetweenTwoYears } from './CovidInformationDataService';

describe('CovidInformationDataService', () => {
  it('returns an array of objects with the expected properties', () => {
    const result = CovidInformationDataService();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    const firstItem = result[0];
    expect(firstItem).toHaveProperty('iso_code');
    expect(firstItem).toHaveProperty('continent');
    expect(firstItem).toHaveProperty('location');
    expect(firstItem).toHaveProperty('population_density');
    expect(firstItem).toHaveProperty('life_expectancy');
    expect(firstItem).toHaveProperty('aged_65_older');
    expect(firstItem).toHaveProperty('aged_70_older');
    expect(firstItem).toHaveProperty('gdp_per_capita');
    expect(firstItem).toHaveProperty('extreme_poverty');
    expect(firstItem).toHaveProperty('cardiovasc_death_rate');
    expect(firstItem).toHaveProperty('diabetes_prevalence');
    expect(firstItem).toHaveProperty('female_smokers');
    expect(firstItem).toHaveProperty('male_smokers');
    expect(firstItem).toHaveProperty('handwashing_facilities');
    expect(firstItem).toHaveProperty('hospital_beds_per_thousand');
    expect(firstItem).toHaveProperty('human_development_index');
  });
});

describe('CovidInformationBetweenTwoYears', () => {
  const testData = [
    { iso_code: 'USA', location: 'United States', data: [
      { date: '2020-01-01', new_deaths: 0 },
      { date: '2020-01-02', new_deaths: 0 },
      { date: '2020-01-03', new_deaths: 1 },
      { date: '2020-01-04', new_deaths: 2 },
      { date: '2021-01-01', new_deaths: 10 },
      { date: '2021-01-02', new_deaths: 12 },
      { date: '2021-01-03', new_deaths: 15 },
      { date: '2022-01-01', new_deaths: 100 },
      { date: '2022-01-02', new_deaths: 105 },
      { date: '2022-01-03', new_deaths: 110 },
    ]},
    { iso_code: 'GBR', location: 'United Kingdom', data: [
      { date: '2020-01-01', new_deaths: 0 },
      { date: '2020-01-02', new_deaths: 1 },
      { date: '2020-01-03', new_deaths: 3 },
      { date: '2020-01-04', new_deaths: 5 },
      { date: '2021-01-01', new_deaths: 20 },
      { date: '2021-01-02', new_deaths: 25 },
      { date: '2021-01-03', new_deaths: 30 },
      { date: '2022-01-01', new_deaths: 200 },
      { date: '2022-01-02', new_deaths: 205 },
      { date: '2022-01-03', new_deaths: 210 },
    ]},
  ];

  it('returns an array of objects with the expected properties', () => {
    const result = CovidInformationDataService();

    expect(Array.isArray(result)).toBe(true);
    
    result.forEach((obj) => {
    expect(obj).toHaveProperty('iso_code');
    expect(obj).toHaveProperty('continent');
    expect(obj).toHaveProperty('location');
    expect(obj).toHaveProperty('population_density');
    expect(obj).toHaveProperty('life_expectancy');
    expect(obj).toHaveProperty('aged_65_older');
    expect(obj).toHaveProperty('aged_70_older');
    expect(obj).toHaveProperty('gdp_per_capita');
    expect(obj).toHaveProperty('extreme_poverty');
    expect(obj).toHaveProperty('cardiovasc_death_rate');
    expect(obj).toHaveProperty('diabetes_prevalence');
    expect(obj).toHaveProperty('female_smokers');
    expect(obj).toHaveProperty('male_smokers');
    expect(obj).toHaveProperty('handwashing_facilities');
    expect(obj).toHaveProperty('hospital_beds_per_thousand');
    expect(obj).toHaveProperty('human_development_index');
    });
    });
    
    it('returns an array of objects with the expected properties and filtered data within the specified year range', () => {
    const result = CovidInformationBetweenTwoYears(2019, 2020);
    
    expect(Array.isArray(result)).toBe(true);
    
    result.forEach((obj) => {
    expect(obj).toHaveProperty('iso_code');
    expect(obj).toHaveProperty('continent');
    expect(obj).toHaveProperty('location');
    expect(obj).toHaveProperty('data');
    obj.data.forEach((data) => {
        const year = new Date(data.date).getFullYear();
        expect(year).toBeGreaterThanOrEqual(2019);
        expect(year).toBeLessThanOrEqual(2020);
        expect(data).toHaveProperty('date');
        expect(data).toHaveProperty('new_deaths');
        expect(data).toHaveProperty('new_cases_per_million');
        expect(data).toHaveProperty('new_deaths_per_million');
        expect(data).toHaveProperty('total_vaccinations');
        expect(data).toHaveProperty('people_vaccinated');
        expect(data).toHaveProperty('people_fully_vaccinated');
        expect(data).toHaveProperty('daily_vaccinations_raw');
        expect(data).toHaveProperty('daily_vaccinations');
        expect(data).toHaveProperty('total_vaccinations_per_hundred');
        expect(data).toHaveProperty('people_vaccinated_per_hundred');
        expect(data).toHaveProperty('people_fully_vaccinated_per_hundred');
        expect(data).toHaveProperty('daily_vaccinations_per_million');
      });
    });
    });
});
      