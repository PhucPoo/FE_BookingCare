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
const statusBooking = {
  PENDING: "Đang chờ",
  CONFIRMED: "Đã xác nhận",
  CANCELLED: "Đã hủy",
  COMPLETED: "Đã hoàn thành",
};
export const getStatusBooking = (target: string | undefined) => {
  return statusBooking[target];
};
export const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case "PENDING":
      return "orange";
    case "CONFIRMED":
      return "green";
    case "CANCELLED":
      return "red";
    case "COMPLETED":
      return "blue";
    default:
      return "default";
  }
};
export const getStatusText = (status: string | undefined) => {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "CANCELLED":
      return "Đã hủy";
    case "COMPLETED":
      return "Hoàn thành";
    default:
      return status;
  }
};
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
export const formatMonthYear = (dateString: string): string => {
  // Tạo đối tượng Date từ chuỗi đầu vào
  const date = new Date(dateString);

  // Lấy tháng (getMonth() trả về từ 0–11 nên phải +1)
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  // Lấy năm
  const year = date.getFullYear();

  // Ghép lại theo định dạng MM/YYYY
  return `${month}/${year}`;
};
export const formatNumber = (value: number): string => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
