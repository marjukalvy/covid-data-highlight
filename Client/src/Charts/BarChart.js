import React, { useState, useEffect } from 'react';
import { useStyles } from '../styles/Styles';
import YearSlider from '../Components/YearSlider';
import CustomChart from './CustomChart';
import LineChart from './LineChart';
import { UrlUtils } from '../Utils/UrlUtils';
import { CountryService } from '../Services/CountryService';
import { Divider } from '@material-ui/core';
import CountryDropdown from '../Components/CountryDropdown';
import '../App.css';

function BarChart() {
  const [startYear, setStartYear] = useState(2018);
  const [endYear, setEndYear] = useState(2022);
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [selectedCountry2, setSelectedCountry2] = useState('');
  const [selectedCountry1Details, setSelectedCountry1Details] = useState('');
  const [selectedCountry2Details, setSelectedCountry2Details] = useState('');

  const [list, setList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const handleCountrySelect = (country) => {
    selectedCountry1 ? setSelectedCountry2(country) : setSelectedCountry1(country);
  };

  const classes = useStyles();

  const prepareForHeatMap = (data) => {
    let countryListTemp = [];
    data.forEach((item) => {
      const entry = {
        name: item.key,
        values: item.value.slice(0, 1000).map((item) => {
          return {
            date: item.date,
            value: item.new_deaths
          }
        })
      };
      countryListTemp.push(entry);
    });
    return countryListTemp;
  };

  const setCountryInfo = (key1, key2) => {
    let item = countryList.find((item) => item.name === key1);
    setSelectedCountry1Details(item);

    item = countryList.find((item) => item.name === key2);
    setSelectedCountry2Details(item);
  };

  useEffect(() => {

    const fetchCovidData = async () => {
      const url = UrlUtils.COVID_INFORMATION_URL;
      const response = await fetch(url);
      const data = await response.json();
      setList(data);

      const countryListTemp = CountryService.prepareCountryList(data);
      const countryList = prepareForHeatMap(countryListTemp);

      let a = selectedCountry1;

      setCountryList(countryList);
    };
    fetchCovidData();
    setCountryInfo(selectedCountry1, selectedCountry2)
  }, [startYear, endYear, selectedCountry1, selectedCountry2]);

  return (
    <>
      <Divider className='default-divider' />
      <header>
        <h1>Compare Covid Information</h1>
      </header>
      <div className='year-slider-container p-top-50'>
        <YearSlider onYearRangeChange={(start, end) => { setStartYear(start); setEndYear(end); }} />
      </div>
      <div className='year-slider-container'>
        {/* <CustomChart data={firstElementValue} /> */}
      </div>
      <div className='three-d-container'>
        <div className='country-dropdown-container'>
          <CountryDropdown options={countryList} onCountrySelect={handleCountrySelect} />
          <CountryDropdown options={countryList} onCountrySelect={handleCountrySelect}/>
        </div>
        <div>
          {countryList.length > 1 &&
            <LineChart country1Data={countryList[0]} country2Data={countryList[1]} />}
        </div>

      </div>
    </>
  );
}

export default BarChart;
