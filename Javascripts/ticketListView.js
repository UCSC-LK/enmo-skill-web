var userId = 69;

// function getCookie(cookieName) {
//     var name = cookieName + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var cookieArray = decodedCookie.split(';');
  
//     for(var i = 0; i < cookieArray.length; i++) {
//         var cookie = cookieArray[i].trim();
//         if (cookie.indexOf(name) == 0) {
//             return cookie.substring(name.length, cookie.length);
//         }
//     }
//     return null;
//   }
// var userId = getCookie("User_ID");


const url = new URL(window.location.href);
var ticketID = url.searchParams.get('ticketID');

const PopupPerent = document.querySelector(".body-main")
const PopupChild = document.querySelector(".body")

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://localhost:15000/enmo_skill_backend_war/support?Role=Client&UserId="+encodeURIComponent(userId)+"&TicketId="+encodeURIComponent(ticketID), requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            document.querySelector(".subject").textContent = element.subject;
            document.querySelector(".description").textContent = element.description;
            document.querySelector(".date").textContent = element.date;
            // document.querySelector(".header").textContent = element.date;

            var status = element.status

            switch(status){
                case 0:
                  status="CLOSED"
                  document.querySelector(".header").textContent=status
                  break
                
                case 1:
                  status="ONGOING"
                  document.querySelector(".header").textContent=status
                  break
      
                case 2:
                  status="ONGOING"
                  document.querySelector(".header").textContent=status
                  break
      
                case 3:
                  status="REJECTED"
                  document.querySelector(".header").textContent=status
                  break
       
              }
        })
        
    })
    .catch(error => console.log('error', error));

    document.querySelector(".HistoryBTN").addEventListener("click",()=>{ 
        getHistroy(userId,ticketID)
       })

function  getHistroy(userId,ticketID){

    document.querySelector(".HistoryBTN").remove();

    fetch("http://localhost:15000/enmo_skill_backend_war/support?Role=Client&UserId=" +encodeURIComponent(userId)+"&popup="+encodeURIComponent(ticketID), requestOptions)
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


    })
    .catch(error => console.log('error', error));
} 
     

  