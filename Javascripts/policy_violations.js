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
const username = urlParams.get("username");

const ticket_id_txtbox = document.getElementById("ticketid")
const userid_txt = document.getElementById("userid-txt")
const username_txt = document.getElementById("username-txt")
const reason = document.getElementById("form-reason")

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
      } else if (response.status == 500){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Reconnecting!"
        });
        console.log("Error"+response.status)
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
              const formm = document.getElementById("form")
              formm.classList.remove("column-div2-hidden")
              formm.classList.add("column-div2-show")

              ticket_id_txtbox.disabled = true
              userid_txt.value = userId;
              userid_txt.disabled = true
              username_txt.value = username;
              username_txt.disabled = true;
              
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
