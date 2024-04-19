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
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
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
      
          notifications.forEach(notification => {

            if (notification.status == 1) {
              const not_row = document.createElement("div");
              not_row.className = "not-row";
      
              not_row.innerHTML = "<box-icon name='info-circle' size='32px'></box-icon>";
      
              const not_text = document.createElement("p");
              not_text.className = "notification-body";
              not_text.innerHTML = notification.content;
      
              not_row.appendChild(not_text);
              notification_div.appendChild(not_row);
            }
              
          });
      
          const btn = document.createElement("button");
          btn.className = "resolved";
          btn.innerHTML = "Mark as read";
          btn.id = "notification-mark"
          btn.addEventListener("click", switchState)
          // Append notification_div to notification_body
          notification_container.appendChild(notification_div);
          notification_container.appendChild(btn)
      } else {
          console.error("Element with ID 'notifications-content' not found");
      }

        



    })
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

