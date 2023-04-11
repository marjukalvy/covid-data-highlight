import { ExceptionService } from "./ExceptionService";

const fs = require('fs');

export class FileService {
    
    static async getCountryInformation() {
        const fs = require('fs');
        fs.readFile('../jsonData/owid-covid-json.json', (err, data) => {
            if (err) {
                ExceptionService.fileErrorHandler(err);
                console.error(err);
                return;
            }
            const jsonData = JSON.parse(data);
            return jsonData;
        });
    }

    static async getCovidInformation() {
        const fs = require('fs');
        fs.readFile('../jsonData/owid-covid-json.json', (err, data) => {
            if (err) {
                ExceptionService.fileErrorHandler(err);
                console.error(err);
                return;
            }
            const jsonData = JSON.parse(data);
            return jsonData;
        });
    }
}

