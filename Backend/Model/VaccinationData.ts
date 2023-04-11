export interface VaccinationData {
  isoCode: string;
  data: VaccinationEntry[];
}

interface VaccinationEntry {
  date: string; // YYYY-MM-DD format
  totalVaccinations: number;
  peopleVaccinated: number;
  peopleFullyVaccinated: number;
  dailyVaccinations?: number;
  totalVaccinationsPerHundred: number;
  peopleVaccinatedPerHundred: number;
  peopleFullyVaccinatedPerHundred: number;
  dailyVaccinationsPerMillion?: number;
}
