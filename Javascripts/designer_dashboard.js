function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
  
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
  }
  // console.log("iD: " + getCookie("User_ID"));
  
  const UserId = getCookie("User_ID");
  
  var myHeaders = new Headers();                          ///important
  myHeaders.append("Content-Type", "application/json");   ///important
  myHeaders.append("Authorization", getCookie("JWT"));    ///important
  
  var raw = JSON.stringify({});

const order_count = document.getElementById("order-count");
const earnings_count = document.getElementById("earning-count");
const reviews1 = document.getElementById("reviews1");

const p1 = document.getElementById("note1").querySelector("p");
const p2 = document.getElementById("note2").querySelector("p");
const p3 = document.getElementById("note3").querySelector("p");

// const notifications_div =  document.getElementById("notifications-div")
const no_notificaton = document.getElementById("not-div-hidden");
const notification_container = document.getElementById("notification-container")
const listItemTemplate = document.querySelector(".not-row-hidden");
const listContainer = document.querySelector(".msg-div-inner");

  function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


document.addEventListener('DOMContentLoaded', getData())

function getData() {


    if (!order_count || !earnings_count || !reviews1 || !p1 || !p2 || !p3) {
        console.error("One or more elements not found.");
        return;
    }

    fetch(`${BASE_URL}/designerdashboard`,{
        method: 'GET',
        headers: myHeaders,
    })
    .then((response)=>{
        if(response.status == 401){
            window.location.href = "../Failed/401.html";
          }else if(response.status == 406){
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
          }else if(response.status == 404){
            window.location.href = "../Failed/404.html";
          }else if (response.status == 200) {
            return response.json();
          } else{
            // Swal.fire({
            //   icon: "error",
            //   title: "Oops...",
            //   text: "Something went wrong!"
            // });
            console.log("Error"+response.status)
          }
    })
    .then((data)=>{
        console.log(data);

        // add boxes
        order_count.innerText = data.pendingOrders;
        earnings_count.innerText = "LKR " + data.totalEarnings;
        reviews1.innerHTML = data.userRatings + '<span class="fa fa-star checked"></span>';

        typeWriter(p1, "Pending orders", 50);
        typeWriter(p2, "Total earnings", 50);
        typeWriter(p3, "Ratings", 50);

        // create profile block

        // set profile img
        var profile_img = document.getElementById("designer-img");
        profile_img.src = data.profileImg || "../Assests/user_coloured.png"

        // set username
        document.getElementById("designer-username").innerHTML = data.profileModel.display_name

        //set full name
        document.getElementById("fullname").innerHTML = data.profileModel.fname + " " + data.profileModel.lname;

        document.getElementById("reviews2").innerHTML = data.userRatings + "<span class='fa fa-star checked'></span>"

        document.getElementById("des-description").innerHTML = data.profileModel.description

        // calculate completion rate
        let total_orders = data.completedOrders + data.cancelledOrders;
        let completion_rate = (data.completedOrders / total_orders) * 100;

        // Round the completion_rate to the nearest integer
        completion_rate = Math.round(completion_rate);

        console.log(completion_rate);

        // Set the width of progress bar based on p_value
        const progressValue = document.getElementById("progressValue");
        progressValue.style.width = completion_rate + "%";

        // Update the progress bar text
        const progressText = document.getElementById("progressText");
        progressText.innerText = completion_rate + "%";

        document.getElementById("work-completed").innerHTML = data.completedOrders

        // display notifications
        var notifications = data.notifications;
        console.log(notifications);

        if (notification_container) { 

          notification_container.classList.add("notification-container-show")

          const notification_div = document.createElement("div");
          notification_div.className = "not-div-inner";
      
          let i = 1;
          notifications.forEach(notification => {

            if (notification.status == 1 && i <= 3) {

              // Create not-row element
              const notRow = document.createElement('div');
              notRow.classList.add('not-row');

              // Create notification-left element
              const notificationLeft = document.createElement('div');
              notificationLeft.classList.add('notification-left');

              // Create box-icon element
              notificationLeft.innerHTML = "<box-icon name='info-circle' size='32px'></box-icon>";
       

              // Create notification-body element
              const notificationBody = document.createElement('p');
              notificationBody.classList.add('notification-body');
              notificationBody.textContent = notification.content;
              notificationLeft.appendChild(notificationBody);

              // Create notification-actions element
              const notificationActions = document.createElement('div');
              notificationActions.classList.add('notification-actions');

              // Create notification-date element
              const notificationDate = document.createElement('p');
              notificationDate.classList.add('notification-date');
              notificationDate.textContent = getTimeDifference(notification.date);
              notificationActions.appendChild(notificationDate);

              // Create mark as read button
              const markAsReadBtn = document.createElement('button');
              markAsReadBtn.classList.add('see-more-short');
              markAsReadBtn.textContent = 'Mark as Read';
              notificationActions.appendChild(markAsReadBtn);

              // Append notification-left and notification-actions to not-row
              notRow.appendChild(notificationLeft);
              notRow.appendChild(notificationActions);

              // Append not-row to notifications-div
              notification_div.appendChild(notRow);
   
              i++;
            }
              
          });
      
          const btn = document.createElement("button");
          btn.className = "resolved";
          btn.innerHTML = "Mark as read";
          btn.id = "notification-mark"
          btn.addEventListener("click", switchState)
          // Append notification_div to notification_body
          notification_container.appendChild(notification_div);
          // notification_container.appendChild(btn)
      } else {
          console.error("Element with ID 'notifications-content' not found");
      }

      loadchat()
    })
    // .then(loadchat())
    .catch((error) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
        });
        console.error("Error fetching data:", error);
    });
}

function switchState(){

  notification_container.classList.remove("notification-container-show")
  notification_container.classList.add("notification-container-hidden")
  
  no_notificaton.classList.remove("not-div-hidden")
  no_notificaton.classList.add("not-div-no")
}

function getTimeDifference(timestamp) {
  // Convert timestamp to Date object
  const targetDate = new Date(timestamp);

  // Get current date and time
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate - targetDate;

  // Convert milliseconds to days, hours, and minutes
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Check if difference is more than a day
  if (daysDifference > 0) {
    return `${daysDifference} days ago`;
  } 
  // Check if difference is more than an hour
  else if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`;
  }
  // Otherwise, return difference in minutes
  else {
    return `${minutesDifference} minutes ago`;
  }
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
function loadchat(){
fetch(BASE_URL+"/chats", requestOptions)
  .then(response =>{
  if(response.status === 200){
      return response.json()
  }
  else if(response.status === 401){
      window.location.href = "../Failed/401.html";
  }else if(response.status === 400){
      Swal.fire({
          title: "Bad Request",
          showConfirmButton:false,
          icon: "error"
          }); 
  }
  else if(response.status === 500){
      Swal.fire({
          title: "Internal Server Error",
          
          showConfirmButton:false,
          icon: "error"
          });
  }else if(response.status === 406){
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
  }})
  .then(result =>{
      console.log(result);

      const listItemTemplate = document.querySelector(".not-row-hidden");
      // listContainer.innerHTML="<div class=\"title-bar\"><p class=\"title-text\">Messages</p></div>"

      result.forEach(item => {
          const newItem = listItemTemplate.cloneNode(true);
          newItem.querySelector(".u-name").textContent = item.name;
          newItem.querySelector(".l-msg").textContent = item.lastmsg;
          newItem.querySelector(".u-img").src = item.url;

          // newItem.addEventListener("click",(event )=>{
          //     event.stopPropagation();
              
          //     openchat(item) 
         
              
             
          //   })

          newItem.classList.remove("not-row-hidden");
          newItem.classList.add("not-row");

          listContainer.appendChild(newItem)
      });
      



  } )
  .catch(error => console.log('error', error));

}


