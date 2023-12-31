function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  
// Function to read a cookie by name
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
  
 

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("loginemail").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("messageDiv");

    if (password.length < 8) {
      alert("Password length must be greater than 8");
    } else {
      // Create a JavaScript object representing the user data
      const userData = {
        email: email,
        password: password,
      };

      console.log(userData);
      // Convert the JavaScript object to JSON
      const jsonData = JSON.stringify(userData);
      console.log(jsonData);

      // Send a POST request with JSON data to your backend
      fetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for cross-origin requests
        body: jsonData,
      })
        .then((response) => {
          if (response.ok) {

            const jwtToken = document.cookie.replace(
              /(?:(?:^|.;\s)JWTToken\s*=\s*([^;]*).*$)|^.*$/,
              "$1"
            );

            console.log("AA - " + jwtToken);


            if (jwtToken) {

              const decodedToken = parseJwt(jwtToken);
              const userLevelId = decodedToken.userLevelID;
              const userID = decodedToken.userID


              // Set UserLevelId to localStorage
              localStorage.setItem("userLevelId", userLevelId);
              localStorage.setItem("userID", userID);

              redirectBasedOnUserLevel(userLevelId);
            } else {
              console.log("No JWT token found in the response headers");
            }

            // Successful login (status code 200), parse the JSON response and display the success message
            response.json().then((data) => {
              console.log("Message content:", data.message);
              console.log("User_Level_ID:", data.userLevelID);
              console.log("User_ID:", data.userID);

              // Set cookies if needed
              // setCookie("User_ID", data.userID, 30);
              // setCookie("User_Level_ID", data.userLevelID, 30);
            });
          } else if (response.status === 401) {
            // Unauthorized login (status code 401), display an error message
            response.json().then((data) => {
              console.log("Error message content:", data.message);
              alert("Login unsuccessful");
              messageDiv.innerHTML = "Login unsuccessful ";
            });
            console.log("Login unsuccessful");
          } else {
            // Handle other status codes or errors
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          messageDiv.innerHTML = error;
          alert("An error occurred while processing the response");
        });
    }
  });

// Function to parse JWT token
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// Function to redirect based on UserLevelId
function redirectBasedOnUserLevel(userLevelID) {
  if(userLevelID==1){
    window.location.href = "../HTML/package_list_view.html"
  }else if(userLevelID==2){
    window.location.href = "../HTML/orderlist_designer.html"
  }else if(userLevelID==3){
    window.location.href = "../HTML/view_client_list_admin.html"
  }else if(userLevelID==4){
    window.location.href = "../HTML/ticketListCS.html"
  }
}


