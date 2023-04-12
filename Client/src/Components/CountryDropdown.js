import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function CountryDropdown({ options, onCountrySelect }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        const selectedCountry = event.target.value;
        setSelectedOption(selectedCountry);
        onCountrySelect(selectedCountry);
    };

    return (
        <FormControl>
            <InputLabel id="country-dropdown-label">Select Country</InputLabel>
            <Select
                labelId="country-dropdown-label"
                id="country-dropdown"
                value={selectedOption}
                onChange={handleChange}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CountryDropdown;
