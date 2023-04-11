import React, { useState } from 'react';
import AutocompleteComponent from '../Components/Autocomplete';

const CountryList = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: "20px", backgroundColor: "#f5f5f5" }}>
      <AutocompleteComponent />
    </div>
  );
};

export default CountryList;
