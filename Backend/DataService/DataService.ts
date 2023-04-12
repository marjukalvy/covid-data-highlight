import axios from 'axios';
import * as fs from 'fs';

import { ExceptionService } from './ExceptionService';

// Define the async function to retrieve data and store it in a file
export async function getDataAndStore(): Promise<void> {
  try {

    // Retrieve data from the URL using Axios
    const response = await axios.get('https://covid.ourworldindata.org/data/owid-covid-data');
    const data = response.data;
  
    // Store the JSON object in a file using fs.writeFile()
    fs.writeFile('vaccinations.json', JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("Data successfully stored in vaccinations.json!");
    });
  } catch (error) {
    ExceptionService.fileErrorHandler(error);
  }
}
