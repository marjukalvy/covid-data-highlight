import './App.css';
import CountryList from './Charts/CountryList';
import CovidMap from './Charts/CovidMap';
import TopicButtonGroup from './Components/TopicButtonGroup';
import BarChart from './Charts/BarChart';
import { useState } from 'react';
import { TopicService } from './Services/TopicService';


function App() {
  return (
    <div className="App">
      <div>
        <div>
          <CovidMap />
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default App;

