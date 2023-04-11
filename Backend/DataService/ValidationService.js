"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
var ValidationService = /** @class */ (function () {
    function ValidationService() {
    }
    ValidationService.validateYearParams = function (startYear, endYear) {
        if (isNaN(startYear) || isNaN(endYear)) {
            return false;
        }
        else if (startYear < 2015 || endYear > 2023 || startYear > endYear) {
            return false;
        }
        else {
            return true;
        }
    };
    // Implement Json Schema validation 
    ValidationService.schemaValidation = function () {
    };
    // Implement Query validation
    ValidationService.customQueryValidation = function () {
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
