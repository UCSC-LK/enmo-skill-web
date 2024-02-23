
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
const loding = document.querySelector(".loading");

loding.style.display ="none"

var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");  
myHeaders.append("Authorization", getCookie("JWT"));   

var raw = JSON.stringify({});


var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    loding.style.display ="flex"
    fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(ticketID), requestOptions)
    .then(response => {
      loding.style.display ="none"
      if(response.status == 401){
        window.location.href = "../Failed/401.html";
      }else if(response.status == 406){
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
      }else if(response.status == 404){
        window.location.href = "../Failed/404.html";
      }else {
        return response.json()
      }
    })
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

    loding.style.display ="flex"
    fetch(BASE_URL+"/support?popup="+encodeURIComponent(ticketID), requestOptions)
    .then(response => {
      loding.style.display ="none"
      if(response.status == 401){
        window.location.href = "../Failed/401.html";
      }else if(response.status == 406){
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
      }else if(response.status == 404){
        window.location.href = "../Failed/404.html";
      }else {
        return response.json()
      }
    })
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
    viewrequest2(TicketID,desition)
  })

  no.addEventListener("click",()=>{
    location.reload()
  })
}

// add comment to ticket-------------------------------------------------------------------------------------
function viewrequest2(TicketID,desition){
    let popup_con=document.querySelector(".pop-up-container2");
    let popup_details=document.querySelector(".pop-up2");

    massege = "Add a comment "

    popup_con.style.display="flex";
    popup_details.style.display="inline";

    popup_details.querySelector(".massege").textContent = massege;

    var submit = document.querySelector(".submitBTN")
    var cancel = document.querySelector(".cancelBTN")
    

    submit.addEventListener("click",()=>{

        var myHeaders = new Headers();                          
        myHeaders.append("Content-Type", "application/json");  
        myHeaders.append("Authorization", getCookie("JWT"));  

        var raw = JSON.stringify({
            "description":document.getElementById("description").value      
        });
    
    
        var requestOptions = {
            method: 'OPTIONS',
            headers: myHeaders,
            redirect: 'follow',
            body: raw
          };
    
        if(desition=="solved"){
          loding.style.display ="flex" 
            fetch(BASE_URL+"/support?Decision=Clos&TicketId="+encodeURIComponent(TicketID), requestOptions)
            .then(response => {
              loding.style.display ="none"
              if(response.status == 401){
                window.location.href = "../Failed/401.html";
              }else if(response.status == 406){
                const currentUrl = encodeURIComponent(window.location.href);
                window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
              }else if(response.status == 404){
                window.location.href = "../Failed/404.html";
              }else {
                return response.json()
              }
            })
            .then(result => {alert(result)
                window.location="../HTML/ticketListCS.html"})
            .catch(error => console.log('error', error));
    
        }else if(desition=="reject"){
          loding.style.display ="flex"
            fetch(BASE_URL+"/support?Decision=Reject&TicketId="+encodeURIComponent(TicketID), requestOptions)
            .then(response => {
              loding.style.display ="none"
              if(response.status == 401){
                window.location.href = "../Failed/401.html";
              }else if(response.status == 406){
                const currentUrl = encodeURIComponent(window.location.href);
                window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
              }else if(response.status == 404){
                window.location.href = "../Failed/404.html";
              }else {
                return response.json()
              }
            })
            .then(result => {alert(result)
                window.location="../HTML/ticketListCS.html"})
            .catch(error => console.log('error', error));
    
        }
      })

      cancel.addEventListener("click",()=>{
        location.reload()
      })
    
}

     

  