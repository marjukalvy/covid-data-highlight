import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

function YearSlider(props) {
  const { onYearRangeChange } = props;
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2022);

  const marks = [
    { value: 2018, label: '2018' },
    { value: 2019, label: '2019' },
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
    { value: 2023, label: '2023' },
  ];

  const handleSliderChange = (event, newValue) => {
    setStartYear(newValue[0]);
    setEndYear(newValue[1]);
    onYearRangeChange(newValue[0], newValue[1]);
  };

  return (
    <div>
      <Typography id="year-slider" gutterBottom>
        Year Range
      </Typography>
      <Slider
        value={[startYear, endYear]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="year-slider"
        marks={marks}
        min={2018}
        max={2023}
      />
      <Typography variant="body1" gutterBottom>
        Selected Year Range: {startYear} - {endYear}
      </Typography>
    </div>
  );
}

export default YearSlider;
