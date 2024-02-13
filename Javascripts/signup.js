const loding = document.querySelector(".loading");
const overlay = document.querySelector(".signup-main");

window.onclick = function(event) {

  if (event.target == overlay) {
    window.history.back()
  }
  
}

loding.style.display ="none"

document
  .getElementById("form-layout")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Create an object with the form data
    var formData = {
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    const messageDiv = document.getElementById("messageDiv");
    

    console.log(formData);

    const jsonData = JSON.stringify(formData);
    loding.style.display ="flex"
    // Make a fetch request
    fetch(BASE_URL+"/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        loding.style.display ="none"
        if (response.ok) {
          window.location = "../HTML/emailValidationsend.html"+'?email='+encodeURIComponent(document.getElementById("email").value)
          // messageDiv.innerHTML = "Registration successful ";
        } else if (response.status === 400) {
          // Unauthorized login (status code 401), display an error message
          //console.error("Error:", response.text().then((text) => console.log(text)));
          response.text().then((text) => {messageDiv.innerHTML =  text});
          showMessage("error","Email or Username already exists", 3000);
        }else if (response.status === 406) {
          // Unauthorized login (status code 401), display an error message
          //console.error("Error:", response.text().then((text) => console.log(text)));
          response.text().then((text) => {messageDiv.innerHTML =  text});
          showMessage("error","Password should be at least 8 characters", 3000);
        } else {
          // Handle other status codes or errors
          console.error("Error:", response.status);
          response.text().then((text) => {messageDiv.innerHTML =  text});
          showMessage("error","Registration Failed!", 3000)
          
        
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("An error occurred:", error);
      });
  });


  function Logi(){
    window.location.href = "../HTML/login.html"
  }
  