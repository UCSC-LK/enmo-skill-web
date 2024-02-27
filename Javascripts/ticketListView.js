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

const url = new URL(window.location.href);
var ticketID = url.searchParams.get('ticketID');


const PopupPerent = document.querySelector(".body-main")
const PopupChild = document.querySelector(".body")
const PopupChild2 = document.querySelector(".body2")
const loding = document.querySelector(".loading");

loding.style.display ="none"

var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");  
myHeaders.append("Authorization", getCookie("JWT"));   



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
    console.log(result)
    result.forEach(element => {
      document.querySelector(".subject").textContent = element.subject;
      document.querySelector(".description").textContent = element.description;
      document.querySelector(".date").textContent = element.date;

      // document.querySelector(".header").textContent = element.date;

      var status = element.status

      setpackage(element.packages)// to display packege img-----------------------------------------
   

      switch(status){
          
        case 1:
          status="Ongoing"
          document.querySelector(".header").textContent=status
          document.querySelector(".header").style.backgroundColor= "rgba(234, 234, 0, 0.486)" 
        break

        case 2:
          status="Ongoing"
          document.querySelector(".header").textContent=status
          document.querySelector(".header").style.backgroundColor=  "rgba(234, 234, 0, 0.486)"
          break

        case 3:
          status="Closed"
          document.querySelector(".header").textContent=status
          document.querySelector(".header").style.backgroundColor= "rgba(0, 232, 28, 0.678)" 
          break

        case 4:
          status="Rejected"
          document.querySelector(".header").textContent=status
          document.querySelector(".header").style.backgroundColor= "rgba(255, 1, 1, 0.492)"
          break
        }
    })
      
  })
.catch(error => console.log('error', error));

//call getHistroy() for show ticket updates---------------------------------------------------------
document.querySelector(".HistoryBTN").addEventListener("click",()=>{ 
  getHistroy(ticketID)
})

//is packege issue-----------------------------------------------------------------------------------
function setpackage(ispackage){
  if(ispackage>0){
    console.log(ispackage)
    document.querySelector(".column").style.display = "flex"
    document.querySelector(".body-colum").classList.add("body-colum1")
  }
}


function  getHistroy(ticketID){

    document.querySelector(".HistoryBTN").remove();
    
    var myHeaders = new Headers();                          
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));   

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
    
    if(result.length>0){document.querySelector(".bottom-header").style.display="flex"}
    result.forEach((element,index) => {
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
    });


    })
    .catch(error => console.log('error', error));
} 
     

  