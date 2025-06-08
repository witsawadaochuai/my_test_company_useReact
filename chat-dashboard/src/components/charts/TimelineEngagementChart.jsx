import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function TimelineEngagementChart({ data }) {
  if (!data) return <p>Loading chart...</p>;

  const monthly = {};
  data.forEach((item) => {
    const date = new Date(item.publisheddate);
    const month = date.toLocaleString("default", { month: "short" });
    if (!monthly[month]) monthly[month] = { view: 0, like: 0, comment: 0 };
    monthly[month].view += item.engagement_view || 0;
    monthly[month].like += item.engagement_like || 0;
    monthly[month].comment += item.engagement_comment || 0;
  });

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const labels = allMonths.filter((m) => monthly[m]).slice(-6);

  const views = labels.map((m) => monthly[m]?.view || 0);
  const likes = labels.map((m) => monthly[m]?.like || 0);
  const comments = labels.map((m) => monthly[m]?.comment || 0);

  const options = {
    chart: {
      type: "line",
      height: 400,
      width: 800,
    },
    title: { text: "Engagement Timeline" },
    xAxis: { categories: labels },
    yAxis: { title: { text: "Count" } },
    tooltip: { shared: true },
    series: [
      { name: "Views", data: views, color: "#4299e1" },
      { name: "Likes", data: likes, color: "#48bb78" },
      { name: "Comments", data: comments, color: "#ed8936" },
    ],
    credits: { enabled: false },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { width: "100%", height: "400px" } }}
    />
  );
}
