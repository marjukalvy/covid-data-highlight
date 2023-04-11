export class ValidationService {
    static validateYearParams(startYear: number, endYear: number,) {
        if (isNaN(startYear) || isNaN(endYear)) {
            return false;
        } else if (startYear < 2015 || endYear > 2023 || startYear > endYear) {
            return false;
        } else {
            return true;
        }
    }


    // Implement Json Schema validation 
    static schemaValidation() {
        
    }
    

    // Implement Query validation
    static customQueryValidation() {
    
    }
}     