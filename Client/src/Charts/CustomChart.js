import React, { useCallback, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CustomChart = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  const drawChart = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(5);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(d3.extent(data, (d) => new Date(d.date)));
    y.domain([0, d3.max(data, (d) => d.new_deaths)]);

    g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('y', margin.bottom - 10)
      .attr('x', width / 2)
      .attr('fill', '#000')
      .attr('font-size', '14px')
      .text('Date');

    g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 10)
      .attr('x', -height / 2)
      .attr('fill', '#000')
      .attr('font-size', '14px')
      .attr('text-anchor', 'middle')
      .text('New Deaths');

    const barGroups = g.selectAll('.bar-group').data(data);

    const newBarGroups = barGroups.enter().append('g').attr('class', 'bar-group');

    newBarGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(new Date(d.date)))
      .attr('y', (d) => y(d.new_deaths))
      .attr('height', (d) => height - y(d.new_deaths))
      .attr('width', width / data.length)
      .attr('fill', '#69b3a2')
      .on('mouseover', function (event, d) {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style('opacity', 1).style('left', event.pageX + 'px').style('top', event.pageY + 'px');
        tooltip.html(`<strong>Date:</strong> ${d.date}<br/><strong>New Deaths:</strong> ${d.new_deaths}`);
      })
      .on('mouseout', function () {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style('opacity', 0);
      });

  }, [data]);

  useEffect(() => {
    drawChart();

    return () => {
      // Clean up the SVG element when the component unmounts
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
    };
  }, [drawChart]);

  return <svg ref={svgRef} width="960" height="500" />;
};

export default CustomChart;
