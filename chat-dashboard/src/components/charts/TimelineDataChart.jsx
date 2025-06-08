import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function TimelineDataChart({ data }) {
  console.log("TimelineDataChart received:", data);
  const canvasRef = useRef();

  useEffect(() => {
    if (!data) return;
    const ctx = canvasRef.current;
    const processed = Array(24).fill(0);
    data.forEach((item) => {
      const h = new Date(item.publisheddate).getHours();
      processed[h]++;
    });

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [...Array(24).keys()].map((h) => `${h.toString().padStart(2, "0")}:00`),
        datasets: [
          {
            label: "Messages by Hour",
            data: processed,
            backgroundColor: "rgba(66, 153, 225, 0.6)",
            borderColor: "#4299e1",
            borderWidth: 1,
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} className="chart-canvas" id="timelineDataChart" />;
}
