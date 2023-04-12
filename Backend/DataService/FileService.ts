import { ExceptionService } from "./ExceptionService";


export class FileService {
    // Get Covid Information Data
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

