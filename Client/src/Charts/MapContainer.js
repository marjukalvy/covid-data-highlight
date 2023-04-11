import { Divider, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COUNTRY_OPTIONS, COVID_OPTIONS } from '../Model/Options';
import Utils from '../Utils/Utils';


export default function MapContainer(props) {
  const { worldCountryMap, worldVaccinationMap, handleCountryButtonClick, handleCovidButtonClick } = props;
  const classes = useStyles();
  
function getCountryFilterOptions() {
    return COUNTRY_OPTIONS;
  }
  function getCovidFilterOptions() {
    return COVID_OPTIONS;
  }


  return (
    <div className='map-container'>
      <Divider className={classes.divider} />
      <ButtonGroup className="buttonGroup">
        {
          Object.values(getCountryFilterOptions()).map((option) => (
            <Button key={option} className="button" size="small" onClick={() => handleCountryButtonClick(option)} >
              {Utils.formatOptiontext(option)}
            </Button>
          ))
        }
      </ButtonGroup>
      <div className={classes.worldMapContainer}>
        <svg ref={worldCountryMap}></svg>
      </div>
      <Divider className='default-divider' />
      <ButtonGroup className="buttonGroup">
        {
          Object.values(getCovidFilterOptions()).map((covidOption) => (
            <Button key={covidOption} className="button" size="small" onClick={() => handleCovidButtonClick(covidOption)} >
              {Utils.formatOptiontext(covidOption)}
            </Button>
          ))
        }
      </ButtonGroup>
      <div className={classes.worldMapContainer} >
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

