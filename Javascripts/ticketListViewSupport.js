
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

const PopupChild = document.querySelector(".body")
const PopupChild2 = document.querySelector(".body2")
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

      if(element.order){
        document.querySelector(".urgent").style.display="inline"
        document.querySelector(".refund").style.display="inline"
      }else if(element.urgent){
        document.querySelector(".urgent").style.display="inline"
      }

        setpackage(element.packages)// to display packege img-----------------------------------------

    })
    
})
.catch(error => console.log('error', error));

document.querySelector(".HistoryBTN").addEventListener("click",()=>{ 

  document.querySelector(".HistoryBTN").remove();

  var massage = "Updates"
  viewMore(ticketID,massage)//get updates-----------------------------------------

  var massage = "Comments"
  viewMore(ticketID,massage)//get comments-----------------------------------------
 

})

function  viewMore(ticketID,massage){

  if(massage == "Updates"){
    var pvalue = "popup" 
    var PopupPerent = document.querySelector(".body-main") 

  }else if(massage == "Comments"){
    var pvalue = "comment" 
     var PopupPerent = document.querySelector(".c-append") 
  }

  
  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   


  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };
 
  loding.style.display ="flex"
  fetch(BASE_URL+"/support?"+encodeURIComponent(pvalue)+"="+encodeURIComponent(ticketID), requestOptions)
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
  
  if(result.length > 0 && massage == "Updates"){document.querySelector(".bottom-header").style.display="flex"}
  else if(result.length > 0 && massage == "Comments"){document.querySelector(".bottom-header2").style.display="flex"}
  
  result.forEach((element, index) => {
      const newItem = PopupChild2.cloneNode(true)
      //  newItem.querySelector(".subject").textContent=element.subject;

      newItem.querySelector(".description2").textContent=element.description;
      newItem.querySelector(".date2").textContent=element.date;

    if (index % 2 === 0) {
        newItem.classList.add("even-item");
    } else {
        newItem.classList.add("odd-item");
    }

      PopupPerent.appendChild(newItem)
  })
      

  const btns = document.querySelector(".btns")
  document.querySelector(".c-append").appendChild(btns)

  var cloase = document.querySelector(".closeBTN")
  var reject = document.querySelector(".rejectBTN")
  var comment = document.querySelector(".commentBTN")
  var desition = null;

  cloase.addEventListener("click",()=>{
      desition="solved"
      viewrequest(ticketID,desition)
  })

  reject.addEventListener("click",()=>{
    desition="reject"
    viewrequest(ticketID,desition)
  })

  comment.addEventListener("click",()=>{
    viewrequest2(ticketID)
  })
      

  })
  .catch(error => console.log('error', error));
} 

function setpackage(ispackage){
  if(ispackage>0){
    console.log(ispackage)
    document.querySelector(".column").style.display = "flex"
    document.querySelector(".body-colum").classList.add("body-colum1")
  }
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
    redirect: 'follow',
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
      window.location="../HTML/ticketListCS.html"
    })
    .catch(error => console.log('error', error));

    }
  })

  no.addEventListener("click",()=>{
    location.reload()
  })
}

// add comment to ticket-------------------------------------------------------------------------------------
function viewrequest2(TicketID){
  let popup_con=document.querySelector(".pop-up-container2");
  let popup_details=document.querySelector(".pop-up2");

  massege = "Add a comment "

  popup_con.style.display="flex";
  popup_details.style.display="inline";

  popup_details.querySelector(".massege").textContent = massege;

  var submit = document.querySelector(".submitBTN")
  var cancel = document.querySelector(".cancelBTN")
  

  submit.addEventListener("click",()=>{

    var comment = document.getElementById("description").value
    console.log(comment)

    var myHeaders = new Headers();                          
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));

    var raw = JSON.stringify({
      "description": comment
    });
  
    var requestOptions = {
      method: 'OPTIONS',
      headers: myHeaders,
      redirect: 'follow',
      body: raw
    };

    loding.style.display ="flex"
    fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(TicketID), requestOptions)
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
        return response.text()
      }
    })
    .then(result => {alert(result)
      location.reload();})
    .catch(error => console.log('error', error));

    })
  
    cancel.addEventListener("click",()=>{
      location.reload()
    })
    
}

     

  