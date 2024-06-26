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

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userid");
const type = urlParams.get("type");
// const username = urlParams.get("username");

const ticket_id_txtbox = document.getElementById("ticketid")
const userid_txt = document.getElementById("userid-txt")
// const username_txt = document.getElementById("username-txt")

document.querySelector(".subheading2").innerHTML = (type == "warning") ? "Warning Form" : "Bann Form";

document.getElementById("validate-ticket").addEventListener("click", () =>{



  fetch(`${BASE_URL}/support?TicketId=${ticket_id_txtbox.value}`, {
    method: 'GET',
    headers: myHeaders
  })
  .then(response => 
    {
      if(response.status == 401){
      window.location.href = "../Failed/401.html";
      }else if(response.status == 406){
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
      }else if(response.status == 404){
        window.location.href = "../Failed/404.html";
      }else if (response.status == 200) {
        return response.json();
      
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        console.log("Error"+response.status)
      }
    })
    .then((data)=>{

      // check whether the tickt id is valid
      if (data.length == 0){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No ticket found!"
        })
        
      } else{

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Ticket is valid!"
        })
        .then((result) => {
          if (result.isConfirmed) {

             // if ticket id is valid
              const formm = document.getElementById("form-form")
              formm.classList.remove("column-div2-hidden")
              formm.classList.add("column-div2-show")

              ticket_id_txtbox.disabled = true
              userid_txt.value = userId;
              userid_txt.disabled = true
              // username_txt.value = username;
              // username_txt.disabled = true;   
          }
        })

       
      }

      

    })
    .catch((error)=>{
      console.error(error)
      Swal.fire({
       icon: "error",
       title: "Oops...",
       text: "Something went wrong!"
     });
    })
})

document.getElementById("button-save").addEventListener("click", function(e){
  e.preventDefault();

  const reason = document.getElementById("form-reason");
  const form_reason = reason.value;

  console.log(typeof(form_reason.trim().length));
  console.log(typeof(0));

  if (form_reason.trim().length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Reason is required",
      // text: "Reconnecting!"
    });
  } else {

    const requestBody = {
      ticketId: ticket_id_txtbox.value,
      reason: form_reason,
      userId: userId
    }
  
    // get a confirmation message
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!"
    }).then((result) => {
      if (result.isConfirmed) {
  
         // save data
        fetch(`${BASE_URL}/${type}`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(requestBody)
        })
        .then(response => 
          {if(response.status == 401){
            window.location.href = "../Failed/401.html";
          }else if(response.status == 406){
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
          }else if(response.status == 404){
            window.location.href = "../Failed/404.html";
          }else if (response.status == 200) {
            // return response.json();
  
            Swal.fire({
              icon: "success",
              title: "Success",
              confirmButtonColor: "#000000"
            })
            .then((result) => {

              // window.location.href = "../HTML/admin_dashboard.html";

              if (result.isConfirmed) {
                window.location.href = "../HTML/admin_dashboard.html";
              }
            })
          }else{
            console.log("Error"+response.status)
          }
          })
  
        
      }
    })
    .catch((error)=>{
      console.error(error)
      Swal.fire({
       icon: "error",
       title: "Oops...",
       text: "Something went wrong!",
       confirmButtonColor: "#000000"
     });
    })
  }

  

 


})

document.getElementById("button-cancel").addEventListener("click", function(e){
  e.preventDefault();

  document.getElementById("form-reason").value = "";
  document.getElementById("form-form").classList.remove("column-div2-show");
  document.getElementById("form-form").classList.add("column-div2-hidden");

  ticket_id_txtbox.disabled = false;
  userid_txt.disabled = false;
  username_txt.disabled = false;
  
  ticket_id_txtbox.value = "";
})