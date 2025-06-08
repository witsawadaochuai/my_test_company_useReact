import React, { useEffect, useState } from "react";
import TimelineDataChart from "./charts/TimelineDataChart";
import TimelineEngagementChart from "./charts/TimelineEngagementChart";
import KeywordChart from "./charts/KeywordChart";

export default function Dashboard({ switchPage }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/charts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(setData)
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
          <h1 className="dashboard-title">Chat Analytics Dashboard</h1>
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

  console.log("Rendering Dashboard with data:", data);


  return (
    <div className="dashboard" id="dashboardPage">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Chat Analytics Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="charts-container">
          <div className="chart-section">
            <h2 className="section-title">
              Message Analytics by Published Date
            </h2>
            <TimelineDataChart data={data} />
          </div>

          <div className="chart-section">
            <h2 className="section-title">Engagement Analytics</h2>
            <TimelineEngagementChart data={data} />
          </div>

          <div className="chart-section">
            <h2 className="section-title">Keyword Analytics</h2>
            <KeywordChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
