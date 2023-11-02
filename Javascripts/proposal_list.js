// Assume this is the response from your backend API

// Function to set a cookie
// function setCookie(name, value, daysToExpire) {
//     const date = new Date();
//     date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
//     const expires = `expires=${date.toUTCString()}`;
//     document.cookie = `${name}=${value}; ${expires}; path=/`;
//   }

//   // Usage
//   setCookie('username', 'john_doe', 30); // Save a username cookie with a 30-day expiration

// const listContainer = document.getElementById("table");
// const count = document.getElementById("count");

// const listItemTemplate = document.querySelector(".row-hidden");

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

var requestOptions = {
  method: "GET",
  Credential: "include",
};

fetch(
  "http://localhost:15000/enmo_skill_backend_war/proposal?Role=Client&UserId=28",          //hardcode
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    count.innerText = result.length;
    result.forEach((item) => {
      const newItem = listItemTemplate.cloneNode(true);

      //   newItem.querySelector(".user").addEventListener("click", function() {
      //     console.log("Clicked username: " + item.username);
        // });
        
        newItem
          .querySelector(".edit")
          .addEventListener("click", function (event) {
            event.stopPropagation();
            editRequest(item);
          });
        newItem
          .querySelector(".delete")
          .addEventListener("click", function (event) {
            event.stopPropagation();
            deleteRequest(item.proposalID);
          });

      newItem.querySelector(".date").textContent = item.description;
      newItem.querySelector(".user").textContent = item.duration + " Days";
      newItem.querySelector(".dis").textContent = "Rs. " + item.budget + ".00";
      newItem.querySelector(".duration").textContent = item.requestID ;
    //   newItem.querySelector(".budget").textContent = "Rs. " + item.budget;
      newItem.addEventListener("click", () => {
        viewrequest(item);
      });

      newItem.classList.remove("row-hidden");
      newItem.classList.add("row");

      listContainer.appendChild(newItem);
    });
  })
  .catch((error) => console.log("error", error));

const popupview = document.querySelector(".overlay-view");
const titleview = document.querySelector(".tl");
const closetn = document.querySelector(".close-top");
const username = document.querySelector(".name-user");
const userurl = document.querySelector(".image-profile");
const Discriptionview = document.querySelector(".description");
const Budgetview = document.querySelector(".budget-text");
const durationview = document.querySelector(".description-text");



function viewrequest(item) {
  popupview.style.display = "flex";
  closetn.addEventListener("click", () => {
    popupview.style.display = "none";
  });
  titleview.innerHTML = item.title;
  username.innerHTML = item.username;
  // userurl
  Discriptionview.innerHTML = item.discription;
  Budgetview.innerHTML = item.budget;
  durationview.innerHTML = item.duration;
}


function deleteRequest(proposalID) {
  if (confirm("Are you sure you want Delete this request?")) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      "http://localhost:15000/enmo_skill_backend_war/proposal?ProposalId=" +
        proposalID,
      requestOptions
    )
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
    };

    fetch(
      "http://localhost:15000/enmo_skill_backend_war/proposal?ProposalId=" +
        item.proposalID,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        location.reload();
      })
      .catch((error) => console.log("error", error));
  }
}

