export interface Country {
  location: string;
  population?: number;
  population_density?: number;
  life_expectancy?: number;
  median_age?: number;
  aged_65_older?: number;
  aged_70_older?: number;
  gdp_per_capita?: number;
  extreme_poverty?: number;
  cardiovasc_death_rate?: number;
  diabetes_prevalence?: number;
  female_smokers?: number;
  male_smokers?: number;
  handwashing_facilities?: number;
  hospital_beds_per_thousand?: number;
  human_development_index?: number;
}

interface Cases {
  date: string;
  new_cases: number;
  new_deaths: number;
  new_cases_per_million: number;
  new_deaths_per_million: number;
  stringency_index: number;
}
export interface CovidData {
  [isoCode: string]: Country;
}

