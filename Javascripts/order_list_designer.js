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

// var userLevel = 2 //hard coded----------------------

// const all = document.querySelector(".all");
const list = document.getElementById("table");
const list2 = document.getElementById("table2");
const ongoing = document.querySelector(".ongoing");
const delivered = document.querySelector(".delivered");
const completed = document.querySelector(".completed");
const canseled = document.querySelector(".canseled");

const perent = document.querySelector(".parent");
const child = document.querySelector(".row-hidden");



ongoing.addEventListener("click", () => {
  // updateColor(ongoing, "#56D74E");
  tableLoad("ongoing");
});

delivered.addEventListener("click", () => {
  // updateColor(delivered, "#2E4ADE");
  tableLoad("delivered");
});

completed.addEventListener("click", () => {
  // updateColor(completed, "#9446BB");
  tableLoad("completed");
});

canseled.addEventListener("click", () => {
  // updateColor(canseled, "#CC2B1F");
  tableLoad("canseled");
});

function updateColor(element, color) {
  [ongoing, delivered, completed, canseled].forEach((el) => {
    if (el !== element) {
      el.style.color = ""; // Remove color from all other elements
    }
  });
  element.style.color = color; // Set color for the clicked element
}

// Function to programmatically trigger click event on "ongoing" button
function loadOngoingOrders() {
  ongoing.click(); // Simulate a click on the ongoing button
}

// Call the function to load ongoing orders when the page loads
window.onload = loadOngoingOrders;


//get list of Orders----------------------------------------------------------
function tableLoad(view) {

  while (list2.firstChild) {
    list2.removeChild(list2.firstChild);
  }
  
const JWTTOk = getCookie("JWT");
  console.log("Token" + JWTTOk)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", getCookie("JWT"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    Credential: "include",
  };

  console.log("requestOptions" + requestOptions);

  fetch(BASE_URL + "/order", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("Result" + result);
      result.forEach((item) => {
        const newItem = child.cloneNode(true);
        console.log("NEwItem" + newItem);
        console.log("item.package_title" + item.package_title);
        newItem.querySelector(".user").textContent = item.designer_name;
        newItem.querySelector(".gig").textContent = item.package_title;
        newItem.querySelector(".date").textContent = item.createdTime;

        const deliveryDurationInDays = item.deliveryDuration;

        console.log("deliveryDurationInDays", deliveryDurationInDays);
        const createdTime = item.createdTime;

        console.log("createdTime", createdTime);

        // Calculate due date
        const dueDate = new Date(createdTime);
        dueDate.setDate(dueDate.getDate() + deliveryDurationInDays);
        
        const formattedDueDate = dueDate.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        newItem.querySelector(".duration").textContent = formattedDueDate;
        newItem.querySelector(".budget-value").textContent = item.price;
        const statusElement = newItem.querySelector(".status"); // Get the status element
        switch (item.status) {
          case 1:
            statusElement.textContent = "Ongoing";
            statusElement.style.backgroundColor = "#9D9D9D";
            break;
          case 2:
            statusElement.textContent = "Delivered";
            statusElement.style.backgroundColor = "#9D9D9D";
            break;
          case 3:
            statusElement.textContent = "Completed";
            statusElement.style.backgroundColor = "#9D9D9D";
            break;
          case 4:
            statusElement.textContent = "Canceled";
            statusElement.style.backgroundColor = "#9D9D9D";
            break;
          default:
            statusElement.textContent = "unknown";
            break;
        }
        newItem.querySelector(".status").textContent =
          statusElement.textContent;

        console.log("Status" + item.status);

        var itemDivs = [
          newItem.querySelector(".user"),
          newItem.querySelector(".gig"),
          newItem.querySelector(".date"),
          newItem.querySelector(".date"),
          newItem.querySelector(".budget-value"),
          newItem.querySelector(".status"),
          newItem.querySelector(".duration"),
        ];

        console.log("OderID" + item.orderId);

        itemDivs.forEach(function (itemDiv) {
          itemDiv.addEventListener("click", () => {
            vieworder(item.orderId);
          }); //view order--------------------------------------------
        });

        switch (view) {
          case "ongoing":
            if (item.status == 1) {
              newItem.classList.remove("row-hidden");
              newItem.classList.add("row");
              list2.appendChild(newItem);
            }
            break;

          case "delivered":
            if (item.status == 2) {
              newItem.classList.remove("row-hidden");
              newItem.classList.add("row");
              list2.appendChild(newItem);
            }
            break;

          case "completed":
            if (item.status == 3) {
              newItem.classList.remove("row-hidden");
              newItem.classList.add("row");
              list2.appendChild(newItem);
            }
            break;

          case "canseled":
            if (item.status == 4) {
              newItem.classList.remove("row-hidden");
              newItem.classList.add("row");
              list2.appendChild(newItem);
            }
            break;
          default:
            newItem.classList.remove("row-hidden");
            newItem.classList.add("row");
            list2.appendChild(newItem);
        }

        // Add event listener to the newly created anchor tags
        // newItem
        //   .querySelector(".row-hidden")
        //   .addEventListener("click", function (event) {
        //     event.preventDefault();
        //     // const orderId = this.getAttribute("href").split("=")[1];
        //     window.location.href = `../HTML/order_details.html`;
        //   });
      });

    })
    .catch((error) => console.log("error", error));  
}

function vieworder(order_id) {
  var url =
    "../HTML/order_details_designer.html?order_id=" +
    encodeURIComponent(order_id);
  window.location.href = url;
}



// // function deleteRequest(TicketID) {
// //   console.log(TicketID);
// //   if (confirm("Are you sure you want Delete this request?")) {
// //     var myHeaders = new Headers();
// //     myHeaders.append("Content-Type", "application/json");
// //     myHeaders.append("Authorization", getCookie("JWT"));

// //     var raw = JSON.stringify({});

// //     var requestOptions = {
// //       method: "DELETE",
// //       headers: myHeaders,
// //       redirect: "follow",
// //     };

// //     fetch(BASE_URL + "/support?TicketID=" + TicketID, requestOptions)
// //       .then((response) => response.text())
// //       .then((result) => {
// //         alert(result);
// //         location.reload();
// //       })
// //       .catch((error) => console.log("error", error));
// //   }
// // }

// //popup view-----------------------------------------------------------------------------
// // function viewrequest(item,status){
// //   let popup_con=document.querySelector(".pop-up-container");
// //   let popup_details=document.querySelector(".pop-up");
// //   let close=document.querySelector(".close")

// //   let old_bodies= Array.from(popup_details.querySelectorAll(".pop-body"));
// //   old_bodies.slice(1).forEach(element=>{
// //     element.parentNode.removeChild(element);
// //   })

// //   popup_con.style.display="flex";
// //   popup_details.style.display="inline";
// //   popup_details.querySelector(".subject").textContent = item.subject;
// //   popup_details.querySelector(".description").textContent = item.description;
// //   popup_details.querySelector(".date").textContent = item.date;
// //   //popup_details.querySelector(".time").textContent = item.time;
// //   popup_details.querySelector(".status").textContent =  status;

// //   const PopupPerent = document.querySelector(".scroll")
// //   const PopupChild = document.querySelector(".pop-body")

// //   var requestOptions = {
// //     method: 'GET',
// //     redirect: 'follow'
// //   };

// //   fetch("http://localhost:15000/enmo_skill_backend_war/support?Role=Client&UserId=" +encodeURIComponent(item.userId)+"&popup="+encodeURIComponent(item.ref_no), requestOptions)
// //     .then(response => response.json())
// //     .then(result => {
// //       console.log(result)
// //       result.forEach(element => {
// //         const newItem2 = PopupChild.cloneNode(true)
// //         console.log( newItem2);
// //         newItem2.querySelector(".subject").textContent=element.subject;
// //         newItem2.querySelector(".description").textContent=element.description;
// //         newItem2.querySelector(".date").textContent=element.date;

// //         console.log(element.subject)
// //         console.log(element.description)
// //         console.log(element)

// //         PopupPerent.appendChild(newItem2)
// //       });

// //     })
// //    .catch(error => console.log('error', error));

// //   close.onclick=(event)=>{
// //       popup_con.style.display="none";
// //       popup_details.style.display="none";
// //   }
// // }

// //load create ticket page-------------------------------------------------------------------
// function createticketDesigner() {
//   window.location.href = "../HTML/CSA-designer.html";
// }

// function createticketClent() {
//   window.location.href = "../HTML/CSA-client.html";
// }

// //save update ticket details in local storage--------------------------------------------------
// function editTicket(ticketID) {
//   console.log(ticketID);

//   var pValue = "edit";
//   var url =
//     "../HTML/createTicket.html" +
//     "?pValue=" +
//     encodeURIComponent(pValue) +
//     "&TicketID=" +
//     encodeURIComponent(ticketID);

//   // var newURL = "../HTML/createTicket.html?ref_no="+encodeURIComponent(TicketID)+"&subject="+encodeURIComponent(subject)+"&description="+encodeURIComponent(description) ;
//   window.location = url;
// }

// function viewticket(ticketID) {
//   var url =
//     "../HTML/ticketListView.html?ticketID=" + encodeURIComponent(ticketID);
//   window.location.href = url;
// }
