import React, { useState, useMemo } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function KeywordTimelineChart({ data }) {
  const groupSize = 5;
  const [groupIndex, setGroupIndex] = useState(0);

  const { keywordCounts, keywords } = useMemo(() => {
    const grouped = {};
    const keywordSet = new Set();

    data.forEach((item) => {
      const date = new Date(item.publisheddate);
      date.setHours(0, 0, 0, 0);
      const timestamp = date.getTime();

      const keywordList = item.keyword?.split(",").map((k) => k.trim()) || [];
      keywordList.forEach((kw) => {
        if (!grouped[kw]) grouped[kw] = {};
        grouped[kw][timestamp] = (grouped[kw][timestamp] || 0) + 1;
        keywordSet.add(kw);
      });
    });

    const allKeywords = Array.from(keywordSet);
    const keywordCounts = {};

    allKeywords.forEach((kw) => {
      const timeMap = grouped[kw];
      const points = Object.entries(timeMap)
        .map(([ts, count]) => [parseInt(ts), count])
        .sort((a, b) => a[0] - b[0]);
      keywordCounts[kw] = points;
    });

    return { keywordCounts, keywords: allKeywords };
  }, [data]);

  const totalGroups = Math.ceil(keywords.length / groupSize);
  const currentKeywords = keywords.slice(
    groupIndex * groupSize,
    groupIndex * groupSize + groupSize
  );

  const series = currentKeywords.map((kw) => ({
    name: kw,
    data: keywordCounts[kw],
  }));

  const options = {
    chart: {
      type: "spline",
      zoomType: "x",
      height: 500,
    },
    title: {
      text: "Timeline Keyword",
    },
    xAxis: {
      type: "datetime",
      title: { text: "วันเวลา" },
    },
    yAxis: {
      title: { text: "จำนวนข้อความ" },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
    },
    tooltip: {
      shared: true,
      xDateFormat: "%Y-%m-%d",
    },
    series,
    navigator: { enabled: true },
    scrollbar: { enabled: true },
    credits: { enabled: false },
  };

  return (
    <div className="chart-section">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => setGroupIndex(Math.max(groupIndex - 1, 0))}
          disabled={groupIndex === 0}
        >
          ◀
        </button>
        <span>
          {groupIndex + 1} / {totalGroups}
        </span>
        <button
          onClick={() =>
            setGroupIndex(Math.min(groupIndex + 1, totalGroups - 1))
          }
          disabled={groupIndex === totalGroups - 1}
        >
          ▶
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
