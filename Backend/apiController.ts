import { Request, Response } from 'express';
import { CountryDataService } from './DataService/CountryDataService';
import { CovidInformationDataService, CovidInformationBetweenTwoYears } from './DataService/CovidInformationDataService';
import { ExceptionService } from './DataService/ExceptionService';
import { ValidationService } from './DataService/ValidationService';
import { getDataAndStore } from './DataService/DataService';


export function getCovidData(req: Request, res: Response) {
  const covidData = CountryDataService();
  res.json(covidData);
}

export function getCountryData(req: Request, res: Response) {
  const countryData = CovidInformationDataService();
  res.json(countryData);
}

export function getCovidInformation(req: Request, res: Response) {
  const startYear: number = Number(req.query.startYear);
  const endYear: number = Number(req.query.endYear);

  /* if (!ValidationService.validateYearParams(startYear, endYear)) {
    let err = new Error("Invalid year parameters");
    ExceptionService.errorHandler(err, req, res);
  } else {
    res.json(CovidInformationBetweenTwoYears(startYear, endYear));
  } */

  res.json(CovidInformationBetweenTwoYears(startYear, endYear));
}

export async function storeData(req: Request, res: Response): Promise<void> {
  try {
    await getDataAndStore();
    res.send('Data stored successfully');
  } catch (error) {
    res.status(500).send('Error storing data');
  }
}
