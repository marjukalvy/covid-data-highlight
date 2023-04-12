import { useState } from 'react';
import { Divider, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COUNTRY_OPTIONS, COVID_OPTIONS } from '../Model/Options';
import Utils from '../Utils/Utils';
import '../App.css';
import { TopicService } from '../Services/TopicService';

export default function MapContainer(props) {
  const { worldCountryMap, worldVaccinationMap, handleCountryButtonClick, handleCovidButtonClick } = props;
  const [clickedButton, setClickedButton] = useState('');
  const classes = useStyles();

  function getCountryFilterOptions() {
    return COUNTRY_OPTIONS;
  }
  function getCovidFilterOptions() {
    return COVID_OPTIONS;
  }

  function handleButtonClick(option) {
    setClickedButton(option);
    TopicService.setCurrentOption(option);
    if (option === clickedButton) {
      setClickedButton('');
    }
  }

  function formatOptiontext(option) {
    return option.split('_').join(' ');
  };


  return (
    <div className='map-container'>
      <Divider className={classes.divider} />
      <ButtonGroup className="buttonGroup">
        {Object.values(getCountryFilterOptions()).map((option) => (
          <Button key={option} className={`button ${clickedButton === option ? 'clicked' : ''}`} size="small" onClick={() => handleButtonClick(option)}>
            {Utils.formatOptiontext(option)}
          </Button>
        ))}
      </ButtonGroup>
      <div className='three-d-container'>
        <header className='map-header'>
          <h1>Country Information</h1>
        </header>
        <svg ref={worldCountryMap}></svg>
      </div>
      <Divider />
      <hr className='hr-divider'></hr>
      <ButtonGroup className="buttonGroup">
        {Object.values(getCovidFilterOptions()).map((covidOption) => (
          <Button
            key={covidOption} className={`button ${clickedButton === covidOption ? 'clicked' : ''}`} size="small"onClick={() => handleButtonClick(covidOption)}>
            {Utils.formatOptiontext(covidOption)}
          </Button>
        ))}
      </ButtonGroup>
      <div className='three-d-container'>
        <header className='map-header'>
          <h1>Covid Information</h1>
        </header>
        <svg ref={worldVaccinationMap}></svg>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(5, 0),
    height: '5px',
    backgroundColor: '#000000',
  },
  worldMapContainer: {
    width: '80%',
  },
}));





