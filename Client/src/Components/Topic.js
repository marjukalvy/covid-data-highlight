import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@material-ui/core';

const Topic = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Select
          value={selectedValue}
          onChange={handleSelectChange}
          style={{
            marginRight: '20px',
            padding: '8px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <MenuItem value="">-- Select One --</MenuItem>
          <MenuItem value="Value 1">Vaccinations</MenuItem>
          <MenuItem value="Value 2">Testing</MenuItem>
          <MenuItem value="Value 3">Action</MenuItem>
        </Select>
      </div>
    );
};

export default Topic;
