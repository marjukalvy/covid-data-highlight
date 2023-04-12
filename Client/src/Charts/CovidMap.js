import { useState } from 'react';
import React, { useEffect, useRef } from 'react';

import { TopicService } from '../Services/TopicService';
import { CovidFilterService } from '../Services/CovidFilterService';
import { useStyles } from '../styles/Styles';
import { COUNTRY_OPTIONS, COVID_OPTIONS } from '../Model/Options';
import { TooltipUtils } from '../Utils/TooltipUtils';
import { UrlUtils } from '../Utils/UrlUtils';
import MapContainer from './MapContainer';
import * as d3 from 'd3';
import '../App.css';

const CovidMap = () => {
  const [option, setOption] = useState(getCountryFilterOptions().population_density);
  const [covidOption, setcovidOption] = useState(getCovidFilterOptions().people_fully_vaccinated);
  let [countryColour, setCountryColour] = useState([]);

  const worldCountryMap = useRef(null);
  const worldVaccinationMap = useRef(null);
  const classes = useStyles();

  let selectedCountry = null;
  let selectedCountryCovidInformation = null;

  const tooltipCountry = TooltipUtils.tooltipCountry;
  const tooltipCovid = TooltipUtils.tooltipCovid;
  const tooltipPermCovid = TooltipUtils.tooltipPermCovid;

  /* Utility function to render and format the map */

  const handleCountryButtonClick = (option) => {
    setOption(option);
    TopicService.setCurrentOption(option);
  };

  const handleCovidButtonClick = (covidOption) => {
    setcovidOption(covidOption);
    CovidFilterService.setCurrentOption(covidOption);
  };


  /* Country Information Map */

  const renderCountryMap = async () => {
    const width = 960;
    const height = 600;

    const svg = d3.select(worldCountryMap.current)
      .attr('width', width)
      .attr('height', height);

    const projection = d3.geoMercator()
      .scale(120)
      .translate([width / 2, height / 1.4]);

    const pathGenerator = d3.geoPath()
      .projection(projection);

    const data = await fetchCountryData();
    const countries = await d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');

    const countryById = {};
    countries.features.forEach((d) => {
      countryById[d.id] = d.properties.name;
    });

    const infoByCountry = new Map();

    data.forEach((d) => {
      const country = countryById[d.iso_code];
      const latestData = d;

      if (country) {
        infoByCountry.set(country, d[option]);
      }
    });

    const info = d3.max(Array.from(infoByCountry.values()));
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, info]);


    /* zoom functionality */
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    const g = svg.append('g')
      .selectAll('path')
      .data(countries.features)
      .join('path')
      .attr('d', pathGenerator)
      .attr('fill', (d) => {
        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;
        return colorScale(itemInfo);
      })
      .on("mouseover", function (event, d) {
        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;
        d3.select(this).attr("stroke", "#000000d").attr("stroke-width", 1.5);
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`
      <div>
        <div style="font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 10px; margin-bottom: 10px;padding: 5px; background-color: rgba(116, 170, 209, 0.8);border-radius:15px;">${country}</div>
        <Divider class=${classes.divider} />
        <div style="font-size: 14px; text-align: center;">
          <span>${TopicService.getCurrentOption()}: ${itemInfo}</span>
        </div>  
      </div>
      `)
          .style("border", "1px solid #ccc")
          .style("border-radius", "20px")
          .style("padding", "10px")
          .style("box-shadow", "0 0 10px #74aad1")
          .style("width", "200px")
          .style("font-family", "Arial, sans-serif")
          .style("line-height", "1.5");

        // calculate the dimensions of the hovered element
        const elementRect = this.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;


        // position the tooltip above the hovered element
        tooltip.style("top", (event.pageY - elementHeight - 10) + "px")
          .style("left", (event.pageX - elementWidth / 2) + "px");
      })
      .on("mouseout", function (event, d) {
        tooltip.transition().duration(500).style("opacity", 0);
      })
      .on("click", function (event, d) {
        if (selectedCountry) {
          selectedCountry.attr("fill", "#f7fbff");
          d3.select(this).attr("fill", "#ffb6c1");
          selectedCountry.attr("stroke", "none");
          selectedCountry.attr("stroke", "#f7fbff");
          if (selectedCountryCovidInformation) selectedCountryCovidInformation.attr("stroke", "none");
          tooltipPermCovid.style("opacity", 0);
          selectedCountry = null;
        }

        // Add a stroke to the clicked country
        d3.select(this)
          .attr("stroke", "#000000")
          .attr("stroke-width", 1.5);

        // Store a reference to the clicked country
        selectedCountry = d3.select(this);

        // Add a stroke to the selected country
        d3.select(this)
          .attr("stroke", "#000000")
          .attr("stroke-width", 1.5);

        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;
        tooltipCountry.transition().duration(200).style("opacity", 1);
        tooltipCountry.html(`
      <div>
        <div style="font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 10px;padding: 5px; background-color: #ffb6c1;border-radius:15px;">${country}</div>
        <Divider class=${classes.divider} />
        <div style="font-size: 14px; text-align: center;">
          <span>${TopicService.getCurrentOption()}: ${itemInfo}</span>
        </div>  
      </div>
      `)
          .style("background-color", "white")
          .style("border", "1px solid #ccc")
          .style("border-radius", "20px")
          .style("padding", "10px")
          .style("box-shadow", "0 0 10px #74aad1")
          .style("width", "200px")
          .style("line-height", "1.5");


        // calculate the dimensions of the hovered element
        const elementRect = this.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;

        // position the tooltip above the hovered element
        tooltipCountry.style("top", (event.pageY - elementHeight - 10) + "px")
          .style("left", (event.pageX - elementWidth / 2) + "px");

      })
      .append('title')
      .text((d) => {
        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;
        return `${country}: ${itemInfo.toLocaleString()}`;
      });

    svg.call(zoom);

    function zoomed(event) {
      g.attr("transform", event.transform);
    }

    const tooltip = d3.select("body").append("div")
      .attr("class", "custom-tooltip")
      .style("opacity", 0);

  };

  /* Covid Information Map */

  const renderCovidMap = async () => {
    const width = 960;
    const height = 600;
    const svg = d3.select(worldVaccinationMap.current)
      .attr('width', width)
      .attr('height', height);

    const projection = d3.geoMercator()
      .scale(120)
      .translate([width / 2, height / 1.4]);

    const pathGenerator = d3.geoPath()
      .projection(projection);

    const data = await fetchCovidData();
    const countries = await d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');


    const countryById = {};
    countries.features.forEach((d) => {
      countryById[d.id] = d.properties.name;
    });

    const infoByCountry = new Map();

    data.forEach((d) => {
      const country = countryById[d.isoCode];
      const latestData = d;
      if (country) {
        infoByCountry.set(country, d[covidOption]);
      }
    });

    const info = d3.max(Array.from(infoByCountry.values()));
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, info]);

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    const g = svg.append('g')
      .selectAll('path')
      .data(countries.features)
      .join('path')
      .attr('d', pathGenerator)
      .attr('fill', (d) => {
        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;
        return colorScale(itemInfo);
      }).on("mouseover", function (event, d) {
        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;

        tooltipTempCovid.transition().duration(200).style("opacity", .9);
        tooltipTempCovid.html(`
        <div>
          <div style="font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 10px; margin-bottom: 10px;padding: 5px; background-color: rgba(116, 170, 209, 0.8);border-radius:15px;">${country}</div>
          <Divider class=${classes.divider} />
          <div style="font-size: 14px; text-align: center;">${TopicService.getCurrentOption()}: ${itemInfo}</div>  
        </div>
        `)
          .style("border", "1px solid #ccc")
          .style("border-radius", "20px")
          .style("padding", "10px")
          .style("box-shadow", "0 0 10px #74aad1")
          .style("width", "200px")
          .style("font-family", "Arial, sans-serif")
          .style("line-height", "1.5");

        // calculate the dimensions of the hovered element
        const elementRect = this.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;


        // position the tooltip above the hovered element
        tooltipTempCovid.style("top", (event.pageY - elementHeight - 10) + "px")
          .style("left", (event.pageX - elementWidth / 2) + "px");
      })
      .on("mouseout", function (event, d) {
        tooltipTempCovid.transition().duration(500).style("opacity", 0);
      })
      .on("click", function (event, d) {
        if (selectedCountryCovidInformation) {
          selectedCountry.attr("stroke", "none");
          selectedCountryCovidInformation.attr("stroke", "none");
          tooltipCountry.style("opacity", 0);
          selectedCountryCovidInformation = null;
        }
        // Add a stroke to the clicked country
        d3.select(this)
          .attr("stroke", "#000000")
          .attr("stroke-width", 1.5);

        // Store a reference to the clicked country
        selectedCountryCovidInformation = d3.select(this);

        // Add a stroke to the selected country
        d3.select(this)
          .attr("stroke", "#000000")
          .attr("stroke-width", 1.5);

        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;
        tooltipPermCovid.transition().duration(200).style("opacity", 1);
        tooltipPermCovid.html(`
          <div>
            <div style="font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 10px; margin-bottom: 10px;padding: 5px; background-color: #ffb6c1;border-radius:15px;;border-radius:15px;">${country}</div>
            <Divider class=${classes.divider} />
            <div style="font-size: 14px; text-align: center;">
              <span>${TopicService.getCurrentOption()}: ${itemInfo}</span>
            </span>  
          </div>
        `)
          .style("border", "1px solid #ccc")
          .style("border-radius", "20px")
          .style("padding", "10px")
          .style("box-shadow", "0 0 10px #74aad1")
          .style("width", "200px")
          .style("font-family", "Arial, sans-serif")
          .style("line-height", "1.5");


        // calculate the dimensions of the hovered element
        const elementRect = this.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;

        // position the tooltip above the hovered element
        tooltipPermCovid.style("top", (event.pageY - elementHeight - 10) + "px")
          .style("left", (event.pageX - elementWidth / 2) + "px");
      })
      .append('title')
      .text((d) => {
        const country = countryById[d.id];
        const itemInfo = infoByCountry.get(country) || 0;
        return `${country}: ${itemInfo.toLocaleString()} itemInfo`;
      });

    svg.call(zoom);

    function zoomed(event) {
      g.attr("transform", event.transform);
    }

    const tooltipTempCovid = d3.select("body").append("div")
      .attr("class", "custom-tooltipTempCovid")
      .style("opacity", 0);

  };

  useEffect(() => {
    renderCountryMap();
    renderCovidMap();
  }, [option, covidOption]);

  /* Map Container */
  return (
    <MapContainer
      worldCountryMap={worldCountryMap}
      worldVaccinationMap={worldVaccinationMap}
      handleCountryButtonClick={handleCountryButtonClick}
      handleCovidButtonClick={handleCovidButtonClick}
    />
  );
};


// Fetch Filter Options from API
function getCountryFilterOptions() {
  return COUNTRY_OPTIONS;
}
function getCovidFilterOptions() {
  return COVID_OPTIONS;
}


/* Fetch Data from API */
const fetchCountryData = async () => {
  const url = UrlUtils.COUNTRY_DATA_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchCovidData = async () => {
  const url = UrlUtils.COVID_DATA_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default CovidMap;
