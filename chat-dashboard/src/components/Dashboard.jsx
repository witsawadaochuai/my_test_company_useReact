import React, { useEffect, useState } from "react";
import TimelineDataChart from "./charts/TimelineDataChart";
import TimelineEngagementChart from "./charts/TimelineEngagementChart";
import KeywordChart from "./charts/KeywordChart";

export default function Dashboard({ switchPage }) {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/charts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);

        const sortedDates = fetchedData
          .map((item) => new Date(item.publisheddate))
          .sort((a, b) => a - b);

        const min = sortedDates[0].toISOString().slice(0, 10);
        const max = sortedDates[sortedDates.length - 1]
          .toISOString()
          .slice(0, 10);
        setMinDate(min);
        setMaxDate(max);
        setStartDate(min);
        setEndDate(max);
      })
      .catch((err) => {
        alert("โหลดข้อมูลไม่สำเร็จ");
        console.error(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    switchPage("login");
  };

  if (!data) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Chat Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const filteredData = data.filter((item) => {
    const d = new Date(item.publisheddate);
    return d >= new Date(startDate) && d <= new Date(endDate);
  });

  return (
    <div className="dashboard" id="dashboardPage">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Chat Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div style={{ padding: "1rem 2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>เลือกช่วงเวลา</h2>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <label>
            จาก:
            <input
              type="date"
              value={startDate}
              min={minDate}
              max={maxDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            ถึง:
            <input
              type="date"
              value={endDate}
              min={minDate}
              max={maxDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="charts-container">
          
          <div className="chart-section">
            <h2 className="section-title">Message Analytics</h2>
            <TimelineDataChart data={filteredData} />
          </div>
        </div>

        <div className="chart-section">
          <h2 className="section-title">Keyword Analytics</h2>
          <KeywordChart data={filteredData} />
        </div>

        <div className="chart-section">
          <h2 className="section-title">Engagement Analytics</h2>
          <TimelineEngagementChart data={filteredData} />
        </div>
      </div>
    </div>
  );
}
