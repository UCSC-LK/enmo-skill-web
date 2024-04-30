function isAuthenticated() {
  // Check if userID and userLevelID exist in localStorage
  const userID = localStorage.getItem("userID");
  const userLevelID = localStorage.getItem("userLevelId");
  console.log("userID:", userID, "userLevelID:", userLevelID);
  // Return true if all necessary items are present
  return userID && userLevelID;
}

function getCookie(name, cookieString) {
  const cookies = (cookieString || document.cookie).split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

function setCookie(name, value, daysToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}