// if (!isAuthenticated()) {
//    // Redirect to the login page or show an authentication message
//    console.log("User not authenticated. Redirecting to login page.");
//    window.location.href = "../HTML/login.html";
// }

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

const jwtToken = getCookie("JWT");
function divideToken(token) {
  return token.split("Bearer")[1];
}

const devideToken = divideToken(jwtToken);
console.log(devideToken);
console.log("aaaaa", jwtToken);

if (!devideToken) {
  console.log("JWT token not found in the cookie. Redirecting to login page.");
  window.location.href = "../HTML/login.html";
}

console.log("proposal.js loaded");

// Global variable to hold pricing packages data
let pricingPackagesData = [];

// Function to fetch pricing packages based on the selected package ID
function fetchPricingPackages(packageId) {
    // Make a fetch request to your backend API to get pricing packages
    fetch(BASE_URL + "/packagepricing?packageId=" + packageId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${devideToken}`, // Include the JWT token in the headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pricing packages");
        }
        return response.json();
      })
      .then((data) => {
        pricingPackagesData = data; // Store the data
        const pricingDropdown = document.getElementById("pricingPackages");
        pricingDropdown.innerHTML = "";

        // Append option elements for each pricing package
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.type; // Use index as value
          option.text = item.type;
          pricingDropdown.appendChild(option);
        });

        if (data.length > 0) {
          updatePricingDetails(); // Update fields for the first package initially
        }

      })
      .catch((error) => {
        console.error("Error fetching pricing packages:", error);
      });
}

function fetchPackageIds() {
  fetch(BASE_URL + "/package?packageId=0", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${devideToken}`, // Include the JWT token in the headers
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch package details");
      }
      return response.json();
    })
    .then((data) => {
      const packageDropdown = document.getElementById("packageId");
      packageDropdown.innerHTML = "";

      data.forEach((package) => {
        const option = document.createElement("option");
        option.value = package.packageId;
        option.text = package.packageId;
        option.dataset.title = package.title; // Store the title as a data attribute
        packageDropdown.appendChild(option);
      });

      if (data.length > 0) {
        handlePackageSelectionChange(); // To update title and other details on initial load
      }
    })
    .catch((error) => {
      console.error("Error fetching package IDs:", error);
    });
}

// Call the fetchPackageIds function to populate the dropdown on page load
fetchPackageIds();

// Function to update delivery duration and price based on selected pricing package
function updatePricingDetails() {
  const selectedPackageType = document.getElementById("pricingPackages").value; // Get the selected package type
  console.log("selectedPackageType" + selectedPackageType);
    const selectedPackage = pricingPackagesData.find(item => item.type === selectedPackageType); // Find the selected package by its type

    if (selectedPackage) {
        document.getElementById("deliveryDuration").value = selectedPackage.deliveryDuration;
        // document.getElementById("price").value = selectedPackage.price;
    }
}

function handlePackageSelectionChange() {
  const packageDropdown = document.getElementById("packageId");
  const selectedPackageId = packageDropdown.value;
  const selectedOption = packageDropdown.options[packageDropdown.selectedIndex];
  document.getElementById("title").value = selectedOption.dataset.title;

  fetchPricingPackages(selectedPackageId);
}

// Add event listener for pricingPackages selection change
document.getElementById("pricingPackages").addEventListener("change", updatePricingDetails);

// Add event listener for package selection change
document.getElementById("packageId").addEventListener("change", handlePackageSelectionChange);

document
  .getElementById("form-layout")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Create an object with the form data

    // Get the JWT token from the cookie
    // const jwtToken = getCookie("JWT");

    if (!devideToken) {
      console.log(
        "JWT token not found in the cookie. Redirecting to login page."
      );
      window.location.href = "../HTML/login.html";
      return;
    }

    var formData = {
      description: document.getElementById("discription").value,
      packageId: document.getElementById("packageId").value,
      title: document.getElementById("title").value,
      pricingPackage: document.getElementById("pricingPackages").value,
      deliveryDuration: document.getElementById("deliveryDuration").value,
      price: document.getElementById("price").value,
    };

    const messageDiv = document.getElementById("messageDiv");

    console.log("formdata"+ formData);

    const jsonData = JSON.stringify(formData);

    console.log("jsonData"+ jsonData)

    const urlParams = new URLSearchParams(window.location.search);
    const requestID = urlParams.get("requestID");

    fetch(
      BASE_URL + `/proposal?RequestId=${requestID}`, //hardcode
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${devideToken}`, // Add JWT token to the headers
        },
        body: jsonData,
      }
    )
      .then((response) => {
        if (response.ok) {
          window.location = "../HTML/proposal_list.html";
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
        window.location.href = "../HTML/login.html";
        // Handle network errors or other exceptions
        console.error("An error occurred:", error);
      });
  });

  




