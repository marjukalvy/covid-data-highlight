import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ country1Data, country2Data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 60, right: 40, bottom: 60, left: 60 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const formatDate = d3.timeFormat('%Y-%m-%d');

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(country1Data.values.map(d => formatDate(new Date(d.date))))
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max([
        d3.max(country1Data.values, d => d.value),
        d3.max(country2Data.values, d => d.value)
      ])]);

    const colorScale = d3.scaleLinear()
      .domain([0, yScale.domain()[1]])
      .range(['#e6f7ff', '#0066cc']);

    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    svg.selectAll('.bar')
      .data([...country1Data.values, ...country2Data.values])
      .join('rect')
      .attr('x', d => xScale(formatDate(new Date(d.date))) + margin.left)
      .attr('y', d => yScale(d.value) + margin.top)
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.value))
      .style('fill', d => colorScale(d.value));

    svg.append('text')
      .attr('x', margin.left)
      .attr('y', margin.top - 10)
      .text(country1Data.name)
      .style('font-size', '16px')
      .style('font-weight', 'bold');

    svg.append('text')
      .attr('x', margin.left)
      .attr('y', margin.top - 30)
      .text(country2Data.name)
      .style('font-size', '16px')
      .style('font-weight', 'bold');

    const defs = svg.append('defs');

    const gradient = defs.append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#e6f7ff');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0066cc');

    svg
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top - 10 + height + 10)
      .attr('width', width)
      .attr('height', 20)
      .style('fill', 'url(#gradient)');
  }, [country1Data, country2Data]);

  return <svg ref={svgRef} width={900} height={600} />;
};

export default LineChart;

