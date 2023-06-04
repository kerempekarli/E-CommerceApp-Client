import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { faker } from "@faker-js/faker";

const PieChartPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sahte veri oluşturma
    const fakeData = d3.range(5).map(() => ({
      label: faker.lorem.word(),
      value: 11,
    }));

    setData(fakeData);
  }, []);

  useEffect(() => {
    // Grafik oluşturma
    if (data.length > 0) {
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const pie = d3
        .pie()
        .sort(null)
        .value((d) => d.value);

      const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const arcs = svg
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i));

      const labels = svg
        .selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text((d) => d.data.label)
        .attr("text-anchor", "middle")
        .attr("fill", "white");
    }
  }, [data]);

  return (
    <div>
      <h1>Pasta Grafiği</h1>
      <div id="chart"></div>
    </div>
  );
};

export default PieChartPage;
