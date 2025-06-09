import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function TimelineEngagementChart({ data }) {
  const [isPercent, setIsPercent] = useState(true);
  if (!data) return <p>Loading chart...</p>;

  const grouped = {};
  data.forEach((item) => {
    const date = new Date(item.publisheddate);
    date.setHours(0, 0, 0, 0);
    const ts = date.getTime();

    if (!grouped[ts]) {
      grouped[ts] = {
        comment: 0,
        share: 0,
        like: 0,
        love: 0,
        sad: 0,
        wow: 0,
      };
    }

    grouped[ts].comment += item.engagement_comment || 0;
    grouped[ts].share += item.engagement_share || 0;
    grouped[ts].like += item.engagement_like || 0;
    grouped[ts].love += item.engagement_love || 0;
    grouped[ts].sad += item.engagement_sad || 0;
    grouped[ts].wow += item.engagement_wow || 0;
  });

  const sortedTimestamps = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  const createSeries = (key) => ({
    name: `engagement_${key}`,
    data: sortedTimestamps.map((ts) => [ts, grouped[ts][key]]),
  });

  const series = [
    createSeries("comment"),
    createSeries("share"),
    createSeries("like"),
    createSeries("love"),
    createSeries("sad"),
    createSeries("wow"),
  ];

  const options = {
    chart: {
      type: "column",
      height: 500,
      zoomType: "x",
    },
    title: { text: "Timeline Engagement (Zoomable)" },
    xAxis: {
      type: "datetime",
      title: { text: "วัน" },
    },
    yAxis: {
      min: 0,
      max: isPercent ? 100 : null,
      title: { text: isPercent ? "เปอร์เซ็นต์" : "จำนวนครั้ง" },
      labels: {
        format: isPercent ? "{value}%" : "{value}",
      },
      stackLabels: {
        enabled: !isPercent,
        style: { fontWeight: "bold" },
      },
    },
    plotOptions: {
      series: {
        events: {
          legendItemClick: function () {
            this.setVisible(!this.visible);
            return true;
          },
        },
      },
      column: {
        stacking: isPercent ? "percent" : "normal",
        dataLabels: { enabled: false },
      },
    },
    tooltip: {
      shared: true,
      xDateFormat: "%d %b %Y",
      pointFormat: isPercent
        ? "<span style='color:{series.color}'>●</span> {series.name}: <b>{point.y:.1f}%</b><br/>"
        : "<span style='color:{series.color}'>●</span> {series.name}: <b>{point.y}</b><br/>",
    },
    series,
    navigator: { enabled: true },
    scrollbar: { enabled: true },
    credits: { enabled: false },
  };

  return (
    <div className="chart-section">
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button onClick={() => setIsPercent((prev) => !prev)}>
          {isPercent ? "แสดงจำนวนจริง" : "แสดงเปอร์เซ็นต์ (%)"}
        </button>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
        containerProps={{ className: "dashboard-wrapper" }}
      />
    </div>
  );
}
