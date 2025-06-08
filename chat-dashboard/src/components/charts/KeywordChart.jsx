import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function KeywordChart({ data }) {
  if (!data) return <p>Loading chart...</p>;

  const keywordCounts = {};
  data.forEach((item) => {
    item.keyword?.split(",").forEach((k) => {
      const keyword = k.trim();
      if (keyword) keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });
  });

  const sorted = Object.entries(keywordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10); 

  const seriesData = sorted.map(([keyword, count]) => ({
    name: keyword,
    y: count,
  }));

  const options = {
    chart: {
      type: "pie",
      height: 400,
      width: 800,
    },
    title: {
      text: "Top 10 Keyword Distribution",
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b> times ({point.percentage:.1f}%)",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Keywords",
        colorByPoint: true,
        data: seriesData,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { width: "100%", height: "400px" } }}
    />
  );
}
