import { COVID_OPTIONS } from "../Model/Options";

export let currentOption = getOptions().population_density;

function getOptions() {
    return COVID_OPTIONS;
}

function getCurrentOption() {
    return currentOption;
}

function setCurrentOption(option) {
    if (Object.values(getOptions()).includes(option)) {
        currentOption = option;
    } else {
        throw new Error(`Invalid option: ${option}`);
    }
}

export const CovidFilterService = (() => {
    return {
        getOptions,
        getCurrentOption,
        setCurrentOption
    };
})();
