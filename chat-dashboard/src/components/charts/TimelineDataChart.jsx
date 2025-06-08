import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function TimelineDataChart({ data }) {
  if (!data) return <p>Loading chart...</p>;

  const hourlyCounts = Array(24).fill(0);
  data.forEach((item) => {
    const hour = new Date(item.publisheddate).getHours();
    hourlyCounts[hour]++;
  });

  const hourLabels = [...Array(24).keys()].map(
    (h) => `${h.toString().padStart(2, "0")}:00`
  );

  const options = {
    chart: {
      type: "column",
      height: 400,
      width: 800,
    },
    title: { text: "Messages by Hour" },
    xAxis: {
      categories: hourLabels,
      title: { text: "Hour" },
    },
    yAxis: {
      min: 0,
      title: { text: "Number of Messages" },
    },
    series: [
      {
        name: "Messages",
        data: hourlyCounts,
        color: "#4299e1",
      },
    ],
    tooltip: {
      pointFormat: "<b>{point.y} messages</b>",
    },
    credits: { enabled: false },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
