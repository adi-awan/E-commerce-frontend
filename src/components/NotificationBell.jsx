import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import supabase from "../lib/supabase";

import {
  getNotifications,
  markRead,
  markAllRead,
  deleteNotification,
} from "../services/notificationService";

const NotificationBell = () => {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {

    try {

      const data = await getNotifications();

      setNotifications(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadNotifications();

    const channel = supabase

      .channel("notifications")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {

          loadNotifications();

        }
      )

      .subscribe();

    return () => {

      channel.unsubscribe();

    };

  }, []);

  const unread = notifications.filter(
    notification => !notification.is_read
  ).length;

  const handleRead = async (id) => {

    try {

      await markRead(id);

      loadNotifications();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteNotification(id);

      loadNotifications();

    } catch (error) {

      console.log(error);

    }

  };

  const handleReadAll = async () => {

    try {

      await markAllRead();

      loadNotifications();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:text-blue-600 transition"
      >

        <FaBell size={24} />

        {unread > 0 && (

          <span
            className="
            absolute
            -top-2
            -right-2
            bg-red-600
            text-white
            rounded-full
            w-5
            h-5
            flex
            items-center
            justify-center
            text-xs
            "
          >

            {unread}

          </span>

        )}

      </button>

      {open && (

        <div
          className="
          absolute
          right-0
          mt-2
          w-96
          bg-white
          rounded-lg
          shadow-xl
          border
          z-50
          "
        >

          <div className="flex justify-between items-center p-4 border-b">

            <h2 className="font-bold text-lg">

              Notifications

            </h2>

            {notifications.length > 0 && (

              <button
                onClick={handleReadAll}
                className="text-blue-600 text-sm hover:underline"
              >

                Mark All Read

              </button>

            )}

          </div>

          <div
            className="
            max-h-96
            overflow-y-auto
            "
          >

            {notifications.length === 0 ? (

              <div className="p-6 text-center text-gray-500">

                No Notifications

              </div>

            ) : (

              notifications.map(item => (

                <div
                  key={item.id}
                  className={`
                  border-b
                  p-4

                  ${
                    !item.is_read
                      ? "bg-blue-50"
                      : "bg-white"
                  }
                  `}
                >

                  <div className="font-semibold">

                    {item.title}

                  </div>

                  <div className="text-sm text-gray-600 mt-1">

                    {item.message}

                  </div>

                  <div className="flex gap-4 mt-3">

                    {!item.is_read && (

                      <button
                        onClick={() => handleRead(item.id)}
                        className="text-green-600 text-sm hover:underline"
                      >

                        Mark Read

                      </button>

                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 text-sm hover:underline"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      )}

    </div>

  );

};

export default NotificationBell;