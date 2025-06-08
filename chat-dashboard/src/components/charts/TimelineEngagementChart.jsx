import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function TimelineEngagementChart({ data }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!data) return;

    const monthly = {};
    data.forEach((item) => {
      const month = new Date(item.publisheddate).toLocaleString("default", { month: "short" });
      if (!monthly[month]) monthly[month] = { view: 0, like: 0, comment: 0 };
      monthly[month].view += item.engagement_view || 0;
      monthly[month].like += item.engagement_like || 0;
      monthly[month].comment += item.engagement_comment || 0;
    });

    const labels = Object.keys(monthly);
    const views = labels.map((m) => monthly[m].view);
    const likes = labels.map((m) => monthly[m].like);
    const comments = labels.map((m) => monthly[m].comment);

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Views",
            data: views,
            borderColor: "#4299e1",
            backgroundColor: "rgba(66, 153, 225, 0.1)",
            fill: true,
          },
          {
            label: "Likes",
            data: likes,
            borderColor: "#48bb78",
            backgroundColor: "rgba(72, 187, 120, 0.1)",
            fill: true,
          },
          {
            label: "Comments",
            data: comments,
            borderColor: "#ed8936",
            backgroundColor: "rgba(237, 137, 54, 0.1)",
            fill: true,
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} className="chart-canvas" id="timelineEngagementChart" />;
}
