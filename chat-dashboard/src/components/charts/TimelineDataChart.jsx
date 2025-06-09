import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function TimelineDataChart({ data }) {
  if (!data) return <p>Loading chart...</p>;

  const hourlyCounts = {};

  data.forEach((item) => {
    const date = new Date(item.publisheddate);
    date.setMinutes(0, 0, 0);
    const timestamp = date.getTime();
    if (!hourlyCounts[timestamp]) hourlyCounts[timestamp] = 0;
    hourlyCounts[timestamp]++;
  });

  const seriesData = Object.entries(hourlyCounts)
    .map(([ts, count]) => [parseInt(ts), count])
    .sort((a, b) => a[0] - b[0]);

  const options = {
    chart: {
      type: "spline",
      zoomType: "x",
      height: 500,
    },
    title: {
      text: "Timeline Message",
    },
    xAxis: {
      type: "datetime",
      title: { text: "Datetime (hourly)" },
    },
    yAxis: {
      min: 0,
      title: { text: "Number of Messages" },
    },
    tooltip: {
      xDateFormat: "%Y-%m-%d %H:%M",
      pointFormat: "<b>{point.y} messages</b>",
    },
    navigator: { enabled: true },
    scrollbar: { enabled: true },
    credits: { enabled: false },
    plotOptions: {
      series: {
        dataGrouping: {
          enabled: true,
          units: [["hour", [1, 3, 6]]],
        },
        marker: { enabled: false },
      },
    },
    series: [
      {
        name: "Messages",
        data: seriesData,
        color: "#4299e1",
      },
    ],
  };

  return (
    <div className="chart-section">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
        containerProps={{ className: "dashboard-wrapper" }}
      />
    </div>
  );
}
