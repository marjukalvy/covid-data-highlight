import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const AutocompleteComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [chartData, setChartData] = useState({ countries: [], totalVaccinations: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://covid.ourworldindata.org/data/vaccinations/vaccinations.json');
      const data = await response.json();
      const latestData = data;
      const countries = latestData.map((item) => ({ name: item.country }));
      setChartData({ countries, totalVaccinations: latestData.map((item) => item.total_vaccinations) });
      setOptions(countries);
      setFilteredOptions(countries);
    };
    fetchData();
  }, []);

  const handleInputChange = (event, value) => {
    setSearchTerm(value);
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (event, value) => {
    setSearchTerm(value.name);
    setFilteredOptions([value]);
  };

  return (
    <div>
      <Autocomplete
        id="autocomplete"
        options={options}
        getOptionLabel={(option) => option.name}
        value={filteredOptions[0]}
        onChange={handleOptionClick}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Country" variant="outlined" />
        )}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default AutocompleteComponent;
