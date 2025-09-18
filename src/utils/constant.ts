export const api = "http://localhost:8080/api/v1";
export const formatDate = (target: string) => {
  const date = new Date(target);

  // Format theo múi giờ Việt Nam
  const vnTime = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh", // GMT+7
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  });

  return vnTime;
};
