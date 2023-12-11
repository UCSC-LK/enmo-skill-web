function isAuthenticated() {

  // Check if userID and userLevelID exist in localStorage
  const userID = localStorage.getItem("userID");
  const userLevelID = localStorage.getItem("userLevelId");
  console.log("userID:", userID, "userLevelID:", userLevelID);
  // Return true if all necessary items are present
  return userID && userLevelID;
}
