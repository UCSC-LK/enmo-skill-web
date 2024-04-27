let flagCreate = false;
let flagUpdate = false;
const listContainer = document.getElementById("table");
const count = document.getElementById("count");

const listItemTemplate = document.querySelector(".row-hidden");

const createbtn = document.querySelector(".create");
const popup = document.querySelector(".overlay");
var closebtn = document.querySelector(".close");
var overlay = document.querySelector(".body");

const title1 = document.querySelector(".title-input");
const Dis = document.querySelector(".description-input");
const Budget = document.querySelector(".budget-input");
const duration = document.querySelector(".duration-input");
const form = document.getElementById("Form");
const form2 = document.getElementById("Form");
const submitbtn = document.querySelector(".submit-button");


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

var requestOptions = {
  method: "GET",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${devideToken}`, // Add JWT token to the headers
  },
};

fetch(
  BASE_URL + "/proposal?", //hardcode
  requestOptions
)
  .then((response) => {
    console.log("RES " + response);
    return response.json();
  })
  .then((result) => {
    console.log("result " + result);
    // count.innerText = result.length;
    result.forEach((item) => {
      const newItem = listItemTemplate.cloneNode(true);

      newItem.querySelector(".requestID").textContent = item.designerId;
      newItem.querySelector(".title2").textContent = item.title;
      newItem.querySelector(".duration").textContent =
        item.deliveryDuration + " Days";
      newItem.querySelector(".price").textContent = "Rs. " + item.price + ".00";
      newItem.querySelector(".package").textContent = item.pricingPackage;
      //   newItem.querySelector(".budget").textContent = "Rs. " + item.budget;
      newItem.addEventListener("click", () => {
        currentItem = item; // Store the current item
        viewrequest(item);
      });

      newItem.classList.remove("row-hidden");
      newItem.classList.add("row");

      listContainer.appendChild(newItem);
    });
  })
  .catch((error) => {
    console.log("error", error);
    // window.location.href = "../HTML/login.html";
  });

const popupview = document.querySelector(".overlay-view");
const titleview = document.querySelector(".tl");
const closetn = document.querySelector(".close-top");
const username = document.querySelector(".name-user");
const userurl = document.querySelector(".image-profile");
const Discriptionview = document.querySelector(".description");
const Budgetview = document.querySelector(".budget-text");
const durationview = document.querySelector(".description-text");

// Define the event listener outside of the viewrequest function
const btn = document.querySelector(".aceptproposal");
btn.addEventListener("click", () => {
  // Assuming currentItem is defined somewhere
  createOrder(currentItem);
});

function viewrequest(item) {
  popupview.style.display = "flex";
  closetn.addEventListener("click", () => {
    console.log("Script is running");
    // Remove the event listener when the popup is closed
    btn.removeEventListener("click", createOrder);

    popupview.style.display = "none";
  });
  titleview.innerHTML = item.title;
  username.innerHTML = item.requestID;
  // userurl
  Discriptionview.innerHTML = item.pricingPackage;
  Budgetview.innerHTML = item.price;
  durationview.innerHTML = item.deliveryDuration;
}

const createOrder = (item) => {
  // Prepare the data for the POST request
  const orderData = {
    requirements: item.discription,
    status: 0,
    designerId: item.designerId,
    packageId: item.packageId,
    price: item.price,
    pricePackageID: item.price_package_id,
    proposalID: item.proposalID,
    deliveryDuration: item.deliveryDuration,
  };

  console.log("orderData: ", orderData);

  const JWTTOk = getCookie("JWT");
  console.log("Token" + JWTTOk);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", getCookie("JWT"));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    Credential: "include", 
    body: JSON.stringify(orderData),
  };

  // Send the POST request
  fetch(BASE_URL + `/order`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data, e.g., redirect to a confirmation page
      console.log("Order created successfully:", data);
      const orderID = data.orderId;
      console.log("deed", orderID)
      
      // window.location.href =
      //    `https://enmoskill.codingblinders.com/HTML/paymentSummary.html?orderID=${orderID}`;
    })
    .catch((error) => {
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again later.");
    });
};

/////////////////////////////////////////////////


function deleteRequest(proposalID) {
  if (confirm("Are you sure you want Delete this request?")) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${devideToken}`, // Add JWT token to the headers
      },
    };

    fetch(BASE_URL + "/proposal?ProposalId=" + proposalID, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        location.reload();
      })
      .catch((error) => console.log("error", error));
  }
}

window.onclick = function (event) {
  if (event.target == overlay) {
    popup.style.display = "none";
  }
  if (event.target == popupview) {
    popupview.style.display = "none";
  }
};

//this is updating request

function editRequest(item) {
  flagUpdate = true;
  popup.style.display = "block";
  submitbtn.innerText = "Update Proposal";
  closebtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  title1.value = item.description;
  // Dis.value = item.date;
  Budget.value = item.budget;
  duration.value = item.duration;

  function handleupdateSubmit(event) {
    if (!flagUpdate) return;
    flagUpdate = false;
    event.preventDefault();
    const valuetitle = title1.value;
    // const valueDis = Dis.value;
    const valueBudget = Budget.value;
    // const valueurl = null;
    const valueduration = duration.value;
    dataupdate(valuetitle, valueduration, valueBudget);

    popup.style.display = "none";
  }
  form2.addEventListener("submit", handleupdateSubmit);

  function dataupdate(valtitle, valduration, valBudget) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      description: valtitle,
      duration: valduration,
      budget: valBudget,
      //   requestID: item.requestID, //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< hardcoded here
      // date: valDis,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${devideToken}`, // Add JWT token to the headers
      },
    };

    fetch(BASE_URL + "/proposal?ProposalId=" + item.proposalID, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        location.reload();
      })
      .catch((error) => console.log("error", error));
  }
}
