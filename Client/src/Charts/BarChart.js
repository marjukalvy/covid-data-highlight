import React, { useState, useEffect } from 'react';
import YearSlider from '../Components/YearSlider';
import CustomChart from './CustomChart';
import LineChart from './LineChart';
import { UrlUtils } from '../Utils/UrlUtils';
import { CountryService } from '../Services/CountryService';
import { Divider } from '@material-ui/core';
import '../App.css';

function BarChart() {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2022);
  const [list, setList] = useState([]);
  const [countryList, setCountryList] = useState([]);

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

  

  useEffect(() => {
    const fetchCovidData = async () => {
      const url = UrlUtils.COVID_INFORMATION_URL;
      const response = await fetch(url);
      const data = await response.json();
      setList(data);

      const countryListTemp = CountryService.prepareCountryList(data);
      const countryList = prepareForHeatMap(countryListTemp);
      
      setCountryList(countryList);

    };

    fetchCovidData();
  }, [startYear, endYear]);

  return (
    <>
      <Divider className='default-divider'/>
      <div className='year-slider-container p-top-50'>
        <YearSlider onYearRangeChange={(start, end) => { setStartYear(start); setEndYear(end); }} />
      </div>
      <div className='year-slider-container'>
        {/* <CustomChart data={firstElementValue} /> */}
      </div>
      <div>
        {countryList.length > 1 &&
          <LineChart country1Data={countryList[0]} country2Data={countryList[1]} />}
      </div>
    </>
  );
}

export default BarChart;
