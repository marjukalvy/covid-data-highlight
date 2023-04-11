import * as express from 'express';
import { Request, Response } from 'express';
import { getCovidData, getCountryData, getCovidInformation } from './apiController';

const app = express();
const port = 5000;

//Middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Countries
app.get('/get-covid-data', getCovidData);

//Vaccination Data
app.get('/get-country-data', getCountryData);

//Covid Information
app.get('/get-covid-information', getCovidInformation);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
