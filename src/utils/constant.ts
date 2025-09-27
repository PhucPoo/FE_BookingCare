export const api = "http://localhost:8080/api/v1";
export const formatDate = (target: string | undefined) => {
  const date = new Date(target);

  // Format theo múi giờ Việt Nam
  const vnTime = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh", // GMT+7
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return vnTime;
};
const degree = {
  BACHELOR: "Cử nhân",
  MASTER: "Thạc sĩ",
  DOCTOR: "Tiến sĩ",
  PROFESSOR: "Giáo sư",
};
export const getDegree = (target: string | undefined) => {
  return degree[target];
};
export const getNext7Days = () => {
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const today = new Date();
  const result = [];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const dayName = daysOfWeek[nextDay.getDay()];

    // format yyyy-mm-dd
    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const day = String(nextDay.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    result.push({
      label: dayName + " / " + formattedDate,
      value: formattedDate,
    });
  }

  return result;
};
