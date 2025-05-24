// utils/auth.js
export const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem("zira_users")) || [];
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("zira_currentUser", JSON.stringify(user));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("zira_currentUser");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("zira_currentUser"));
};
