export function formatDate(dateString) {
  if (!dateString) return "";

  // Tạo đối tượng Date từ chuỗi
  const date = new Date(dateString);

  // Lấy ngày, tháng, năm
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // tháng từ 0-11
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function timeLeft(registrationDate, expireDate) {
  const start = new Date(registrationDate);
  const end = new Date(expireDate);
  const now = new Date();

  // Nếu muốn tính từ hiện tại, dùng now; nếu muốn tính từ registrationDate thì dùng start
  const diffTime = end - now; // thời gian còn lại (ms)
  
  if (diffTime <= 0) return "Đã hết hạn";

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${diffDays} ngày, ${diffHours} giờ, ${diffMinutes} phút`;
}
