const loding = document.querySelector(".loading");
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
          messageDiv.innerHTML = "Registration successful ";
        } else if (response.status === 401) {
          // Unauthorized login (status code 401), display an error message
          messageDiv.innerHTML = "Registration unsuccessful ";
        } else {
          // Handle other status codes or errors
          console.error("Error:", response.status);
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
  