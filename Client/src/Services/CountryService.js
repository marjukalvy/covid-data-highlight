export class CountryService {
  static prepareCountryList = (data) => {
    let countryList = [];
    data.forEach((item) => {
      const entry = {
        key: item.iso_code,
        value: item.data
      };
      countryList.push(entry);
    });
    return countryList;
  }
}