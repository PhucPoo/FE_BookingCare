interface User {
  username: string;
  password: string;
}

let users: User[] = [];

export function checkLogin(username: string, password: string): boolean {
  const user = users.find(u => u.username === username && u.password === password);
  return !!user;
}

export function registerUser(username: string, password: string): boolean {
  const exists = users.some(u => u.username === username);
  if (exists) return false;
  users.push({ username, password });
  return true;
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function validateCCCD(cccd: string): boolean {
  return /^\d{12}$/.test(cccd); // đúng 12 số
}

export function validatePhone(phone: string): boolean {
  return /^\d{10}$/.test(phone); // đúng 10 số
}
