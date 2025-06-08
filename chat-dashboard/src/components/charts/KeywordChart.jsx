import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function KeywordChart({ data }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!data) return;

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

    const labels = sorted.map(([k]) => k);
    const values = sorted.map(([, v]) => v);

    const chart = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            label: "Keyword Distribution",
            data: values,
            backgroundColor: [
              "#4299e1",
              "#48bb78",
              "#ed8936",
              "#9f7aea",
              "#38b2ac",
              "#f56565",
              "#ec407a",
              "#26a69a",
              "#ffa726",
              "#66bb6a",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "left",
            align: "start",
            labels: {
              boxWidth: 20,
              font: {
                size: 12,
              },
            },
          },
        },
        layout: {
          padding: {
            right: 20,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className="chart-canvas"
      id="timelineKeywordChart"
    />
  );
}
