const BASE_URL="http://localhost:15000/enmo_skill_backend_war"//fine error later---------------


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

const url = new URL(window.location.href)
var ticketID = url.searchParams.get('ticketID')
var assigned = url.searchParams.get('assigned')

const PopupPerent = document.querySelector(".body-main")
const PopupChild = document.querySelector(".body")

var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");  
myHeaders.append("Authorization", getCookie("JWT"));   

var raw = JSON.stringify({});


var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(ticketID), requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            document.querySelector(".profile-pic").src = element.url;
            document.querySelector(".header").textContent = element.userName;
            document.querySelector(".email").textContent = element.email;
            document.querySelector(".subject").textContent = element.subject;
            document.querySelector(".description").textContent = element.description;
            document.querySelector(".date").textContent = element.date;
            // document.querySelector(".header").textContent = element.date;

        })
        
    })
    .catch(error => console.log('error', error));

    document.querySelector(".HistoryBTN").addEventListener("click",()=>{ 
        getHistroy(ticketID)
       })

function  getHistroy(ticketID){

    document.querySelector(".HistoryBTN").remove();
    

    var myHeaders = new Headers();                          
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));   

    var raw = JSON.stringify({});


    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };


    fetch(BASE_URL+"/support?popup="+encodeURIComponent(ticketID), requestOptions)
    .then(response => response.json())
    .then(result => {
    console.log(result)
    result.forEach(element => {
        const newItem = PopupChild.cloneNode(true)
        newItem.querySelector(".subject").textContent=element.subject;
        newItem.querySelector(".description").textContent=element.description;
        newItem.querySelector(".date").textContent=element.date;

        PopupPerent.appendChild(newItem)
    });
    

        const btns = document.querySelector(".btns")
        PopupPerent.appendChild(btns)

        var cloase = document.querySelector(".closeBTN")
        var reject = document.querySelector(".rejectBTN")
        var desition = null;

        cloase.addEventListener("click",()=>{
            desition="solved"
            viewrequest(ticketID,desition)
        })

        reject.addEventListener("click",()=>{
            desition="reject"
            viewrequest(ticketID,desition)
        })
        

    })
    .catch(error => console.log('error', error));
} 



//popup view-----------------------------------------------------------------------------
function viewrequest(TicketID,desition){
  let popup_con=document.querySelector(".pop-up-container");
  let popup_details=document.querySelector(".pop-up");

  var massege= null  
  if(desition=="solved"){
    massege = "Are you want close this ticket?"
   
  }else if(desition=="reject"){
    massege = "Are you want reject this ticket?"
  }


  popup_con.style.display="flex";
  popup_details.style.display="inline";
  
  
  popup_details.querySelector(".massege").textContent = massege;

  var yes = document.querySelector(".yes")
  var no = document.querySelector(".no")

  yes.addEventListener("click",()=>{

    var myHeaders = new Headers();                          
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));  

    var requestOptions = {
        method: 'OPTIONS',
        headers: myHeaders,
        redirect: 'follow'
      };

    if(desition=="solved"){
          
        fetch(BASE_URL+"/support?Decision=Clos&TicketId="+encodeURIComponent(TicketID), requestOptions)
        .then(response => response.text())
        .then(result => {alert(result)
            window.location="../HTML/ticketListCS.html"})
        .catch(error => console.log('error', error));

    }else if(desition=="reject"){
        fetch(BASE_URL+"/support?Decision=Reject&TicketId="+encodeURIComponent(TicketID), requestOptions)
        .then(response => response.text())
        .then(result => {alert(result)
            window.location="../HTML/ticketListCS.html"})
        .catch(error => console.log('error', error));

    }
  })

  no.addEventListener("click",()=>{
    location.reload()
  })



}

     

  