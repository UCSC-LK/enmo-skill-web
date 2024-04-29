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
const closetnv = document.querySelector(".close-top");
const username = document.querySelector(".name-user");
const userurl = document.querySelector(".image-profile");
const Discriptionview = document.querySelector(".description");
const Budgetview = document.querySelector(".budget-text");
const durationview = document.querySelector(".description-text");

// Define the event listener outside of the viewrequest function
const btn = document.querySelector(".aceptproposal");
btn.addEventListener("click", () => {
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


function createOrder(item) {
  
  const closetn = document.querySelector(".close-top");

  closetn.addEventListener("click", () => {
    console.log("Script is running");
    popupview.style.display = "none";
  });
  
  const JWTTOk = getCookie("JWT");
  console.log("Token" + JWTTOk);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", getCookie("JWT"));

  const raw = JSON.stringify({
    requirements: item.discription,
    status: 0,
    designerId: item.designerId,
    packageId: item.packageId,
    price: item.price,
    pricePackageId: item.price_package_id,
    proposalID: item.proposalID,
    deliveryDuration: item.deliveryDuration,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${BASE_URL}/order`, requestOptions)
    .then((response) => {
      if (response.status == 401) {
        window.location.href = "../Failed/401.html";
      } else if (response.status == 406) {
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href =
          "../Failed/Session%20timeout.html?returnUrl=" + currentUrl;
      } else if (response.status == 404) {
        window.location.href = "../Failed/404.html";
      } else if (response.status == 200) {
        console.log("Order created successfully");
        var rsp = response.json();
        rsp.then((data) => {
          console.log("Order ID: " + data.orderId);
          window.location.href = `../HTML/paymentSummary.html?orderID=${data.orderId}`;
        });
      } else {
        console.log("Error" + response.status);
      }
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
};
