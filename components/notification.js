import React, { useEffect, useState } from "react";
import { Avatar, Card } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";
import Cookies from "js-cookie";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("user_token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await fetch(
          "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
          config
        );
        const data = await response.json();
        console.log(data);
        setNotifications(data.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <div className="flex items-center">
              <Avatar
                alt="User avatar"
                className="mr-3"
                src="/images/default-avatar.jpg" // Replace with actual avatar source
                height="40"
                width="40"
              />
              <div>
                <p>
                  <strong>{notification.user.name}</strong>{" "}
                  {notification.remark === "like" ? "liked" : "replied to"} your
                  post
                </p>
                <p>
                  {formatDistanceToNow(new Date(notification.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
