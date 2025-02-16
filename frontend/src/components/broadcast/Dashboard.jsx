import React, { useEffect, useState } from "react";
import API from "../../Api";
import "./styles.css";

const Dashboard = () => {
  const [broadcasts, setBroadcasts] = useState([]);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const response = await API.get("/broadcasts");
        setBroadcasts(response.data);
      } catch (error) {
        console.error("Failed to fetch broadcasts:", error);
      }
    };
    fetchBroadcasts();
  }, []);

  const handleJoin = async (broadcastId) => {
    try {
      await API.post(`/broadcasts/${broadcastId}/join`);
      alert("Join request sent successfully!");
    } catch (error) {
      console.error("Failed to send join request:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Upcomings🚀</h1>
      <table className="broadcast-table">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Location</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {broadcasts.map((broadcast) => (
            <tr key={broadcast._id}>
              <td>{broadcast.activity}</td>
              <td>{broadcast.location}</td>
              <td>{new Date(broadcast.date).toLocaleDateString()}</td>
              <td>
                <button 
                  className="join-btn" 
                  onClick={() => handleJoin(broadcast._id)}
                >
                  Join
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;