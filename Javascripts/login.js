document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("loginemail").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("messageDiv");

    if(password.length < 8){
      alert("Password length must be greater than 8")
    }else{

    // Create a JavaScript object representing the user data
    const userData = {
      email: email,
      password: password,
    };

    console.log(userData)
    // Convert the JavaScript object to JSON
    const jsonData = JSON.stringify(userData);
    console.log(jsonData);

    // Send a POST request with JSON data to your backend
    fetch("http://localhost:15000/enmo_skill_backend_war/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //?
      body: jsonData,
    })
      .then((response) => {
        if (response.ok) {
          // Successful login (status code 200), parse the JSON response and display the success message
          response.json().then((data) => {
            console.log("Message content:", data.message);
            console.log("User_Level_ID:", data.userLevelID);
            console.log("User_ID:", data.userID);

            if(data.userLevelID==1){
              window.location.href = "../HTML/package_list_view.html"
            }else if(data.userLevelID==2){
              window.location.href = "../HTML/orderlist_designer.html"
            }else if(data.userLevelID==3){
              window.location.href = "../HTML/view_client_list_admin.html"
            }else if(data.userLevelID==4){
              window.location.href = "../HTML/ticketListCS.html"
            }
            messageDiv.innerHTML = "Login successful ";
          });

        } else if (response.status === 401) {
          // Unauthorized login (status code 401), display an error message
          response.json().then((data) => {
            console.log("Error message content:", data.message);
            alert("Login unsuccessful")
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
      });}
  });

