function setCookie(name, value, daysToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
  }
});

const overlay = document.querySelector(".login-main");

window.onclick = function(event) {

  if (event.target == overlay) {
    window.history.back()
  }
  
}
const loding = document.querySelector(".loading");
loding.style.display ="none"

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("password").value;
  const messageDiv = document.getElementById("messageDiv");

  if(password.length < 8){
    Toast.fire({
      icon: "error",
      title: "Password must be at least 8 characters long"
    })
    
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
  loding.style.display ="flex"
  // Send a POST request with JSON data to your backend
  fetch(BASE_URL+"/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //?
    body: jsonData,
  })
    .then((response) => {
      loding.style.display ="none"
      if (response.ok) {
        // Successful login (status code 200), parse the JSON response and display the success message
        response.json().then((data) => {
          console.log("Message content:", data.message);
          setCookie('JWT',"Bearer "+ data.JWT, 1); 
          setCookie('Refresh Token',"Bearer "+ data.JWT2, 10); 
          Toast.fire({
            icon: "success",
            title: "Login successful"
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {

          if(data.userLevelID==1){
            setCookie('UserLevel',"CUSTOMER", 30); 
            window.location.href = "../HTML/package_list_view.html"
          }else if(data.userLevelID==2){
            setCookie('UserLevel',"DESIGNER", 30); 
            window.location.href = "../HTML/orderlist_designer.html"
          }else if(data.userLevelID==3){
            setCookie('UserLevel',"ADMIN", 30); 
            window.location.href = "../HTML/view_client_list_admin.html"
          }else if(data.userLevelID==4){
            setCookie('UserLevel',"CSA", 30); 
            window.location.href = "../HTML/ticketListCS.html"
          }}});
        });

      } else if (response.status === 401) {
        // Unauthorized login (status code 401), display an error message
        response.json().then((data) => {
          console.log("Error message content:", data.message);
          Toast.fire({
            icon: "error",
            title: "Username or password is incorrect"
          })
          // messageDiv.innerHTML = "Login unsuccessful ";
        });
        console.log("Login unsuccessful");
      } else {
        // Handle other status codes or errors
        Toast.fire({
          icon: "error",
          title: "An error occurred. Please try again later"
        })
        console.error("Error:", response.status);
      }

    })
    .catch((error) => {
      loding.style.display ="none"
      console.error("Error:", error);
      messageDiv.innerHTML = error;
    });}
});


function Signup(){
  window.location.href = "../HTML/signup.html"
}
function Terms(){
  window.location.href = "../HTML/terms_and_conditions.html"
}



async function Forgot(){
  const { value: email } = await Swal.fire({
    title: "Forgot Password", 
    input: "email",
    position: "center",
    inputLabel: "You can reset your password by entering your email address",
    inputPlaceholder: "testemail@abc.com",
    confirmButtonText: "Reset Password",
    confirmButtonColor: "#000000",
    
  });
  if (email) {

    loding.style.display ="flex"
    const requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(BASE_URL+"/passwordreset?email="+email, requestOptions)
      .then((response) => {
        loding.style.display ="none"
        if (response.status==200){
          Toast.fire({
            icon: "success",
            title: "Password reset email sent"
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              location.reload();
            }
          }
          );
        }else if(response.status==100){
          Toast.fire({
            icon: "error",
            title: "Server error, please try again later"
          });
        }else if(response.status==400){
          Toast.fire({
            icon: "error",
            title: "Email not found. Please enter a valid email address"
          });
        }else{
          Toast.fire({
            icon: "error",
            title: "An error occurred. Please try again later"
          });
        }
      })
      .catch((error) => {console.error(error)
        loding.style.display ="none"});
        
    }
}


function togglePasswordVisibility() {
  var passwordField = document.getElementById("password");
  var icon = document.getElementById("toggle-icon");

  if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.setAttribute("name", "show");
      
  } else {
      passwordField.type = "password";
      icon.setAttribute("name", "hide");
      
  }
}