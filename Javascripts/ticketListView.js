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
            document.querySelector(".subject").textContent = element.subject;
            document.querySelector(".description").textContent = element.description;
            document.querySelector(".date").textContent = element.date;
            // document.querySelector(".header").textContent = element.date;

            var status = element.status

            switch(status){
                
                case 1:
                  status="ONGOING"
                  document.querySelector(".header").textContent=status
                  document.querySelector(".header-status").style.backgroundColor= "yellow" //rgba(234, 234, 0, 0.486)
                  break
      
                case 2:
                  status="ONGOING"
                  document.querySelector(".header").textContent=status
                  document.querySelector(".header-status").style.backgroundColor=  "yellow"//rgba(234, 234, 0, 0.486)
                  break
      
                  case 3:
                    status="CLOSED"
                    document.querySelector(".header").textContent=status
                    document.querySelector(".header-status").style.backgroundColor= "green"//rgba(0, 232, 28, 0.678)
                    break

                  case 4:
                    status="REJECTED"
                    document.querySelector(".header").textContent=status
                    document.querySelector(".header-status").style.backgroundColor= "red"//rgba(255, 1, 1, 0.492)
                    break
      
              }
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
        const newItem = PopupChild2.cloneNode(true)
        //  newItem.querySelector(".subject").textContent=element.subject;

        newItem.querySelector(".description2").textContent=element.description;
        newItem.querySelector(".date2").textContent=element.date;

        PopupPerent.appendChild(newItem)
    });


    })
    .catch(error => console.log('error', error));
} 
     

  