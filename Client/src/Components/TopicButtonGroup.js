import React, { useState } from 'react';
import { TopicService } from '../Services/TopicService';
import { ButtonGroup, Button } from '@material-ui/core';

import '../App.css';

const Options = TopicService.getOptions();

function TopicButtonGroup({ option }) {
  const [selectedOption, setSelectedOption] = useState(Options.population_density);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    TopicService.setCurrentOption(option);
  };

  const formatOptiontext = (option) => {
    return option.split('_').join(' '); 
  };

  return (
    <ButtonGroup className="buttonGroup">
      {Object.values(Options).map((option) => (
        <Button
          key={option}
          className="button"
          size="small"
          onClick={() => handleButtonClick(option)}
          disabled={selectedOption === option}
        >
          { formatOptiontext(option) }
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default TopicButtonGroup;
