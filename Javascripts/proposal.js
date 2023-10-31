document
  .getElementById("form-layout")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Create an object with the form data
      var formData = {
        duration: document.getElementById("time").value,
        budget: document.getElementById("amount").value,
        userID: "33",                         //hardcode
        // date: document.getElementById("date").value,
        description: document.getElementById("discription").value,
      };

    const messageDiv = document.getElementById("messageDiv");

    console.log(formData);

    const jsonData = JSON.stringify(formData);

    // Make a fetch request
    fetch(
      "http://localhost:15000/enmo_skill_backend_war/proposal?RequestId=33",   //hardcode
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      }
    )
      .then((response) => {
        if (response.ok) {
          messageDiv.innerHTML = "Proposal submition successful ";

          setTimeout(function () {
            location.reload();
          }, 2000);
        } else if (response.status === 401) {
          // Unauthorized login (status code 401), display an error message
          messageDiv.innerHTML = "Proposal submition unsuccessful ";
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




