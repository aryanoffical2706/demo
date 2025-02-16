import React, { useEffect, useState } from "react";
import API from "../../Api";
import "./Notification.css"; 

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await API.get("/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleRequest = async (broadcastId, requestId, status) => {
    try {
      await API.put(`/notifications/${broadcastId}/requests/${requestId}`, { status });
      alert(`Request ${status} successfully!`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.requestId === requestId ? { ...notification, status } : notification
        )
      );
    } catch (error) {
      console.error("Failed to handle request:", error);
    }
  };

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <table className="notifications-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.requestId}>
              <td>{notification.user.name}</td>
              <td>wants to join your broadcast.</td>
              <td>{notification.status}</td>
              <td>
                {notification.status === "pending" && (
                  <div className="actions">
                    <button
                      className="accept-button"
                      onClick={() =>
                        handleRequest(notification.broadcastId, notification.requestId, "approved")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() =>
                        handleRequest(notification.broadcastId, notification.requestId, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;