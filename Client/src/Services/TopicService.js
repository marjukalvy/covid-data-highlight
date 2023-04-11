import { COUNTRY_OPTIONS } from "../Model/Options";

export let currentOption = getOptions().population_density;

function getOptions() {
  return COUNTRY_OPTIONS;
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

export const TopicService = (() => {
  return {
    getOptions,
    getCurrentOption,
    setCurrentOption
  };
})();
