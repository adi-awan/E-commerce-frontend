import API from "../api/axios";

export const getNotifications = async () => {
  const res = await API.get("/notifications");
  return res.data;
};

export const markRead = async (id) => {
  const res = await API.patch(`/notifications/${id}/read`);
  return res.data;
};

export const markAllRead = async () => {
  const res = await API.patch("/notifications/read-all");
  return res.data;
};

export const deleteNotification = async (id) => {
  const res = await API.delete(`/notifications/${id}`);
  return res.data;
};