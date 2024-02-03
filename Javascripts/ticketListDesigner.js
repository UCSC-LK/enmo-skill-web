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

const all = document.querySelector(".all")
const ongoing = document.querySelector(".ongoing")
const solved = document.querySelector(".solved")
const rejected = document.querySelector(".rejected")


const perent = document.querySelector(".parent")
const child = document.querySelector(".ticket-box-2")

tableLoad("all")
all.style.color="#000000"

all.addEventListener("click",()=>{
  
  tableLoad("all")
  all.style.color="#000000"
})

ongoing.addEventListener("click",()=>{
  tableLoad("ongoing")
  ongoing.style.color="#000000"
})

solved.addEventListener("click",()=>{
  tableLoad("solved")
  solved.style.color="#000000"
})

rejected.addEventListener("click",()=>{
  tableLoad("rejected")
  rejected.style.color="#000000"
})

//get list of tickets----------------------------------------------------------

  function tableLoad(view){
    perent.innerHTML=""
    all.style.color="#9D9D9D"
    ongoing.style.color="#9D9D9D"
    solved.style.color="#9D9D9D"
    rejected.style.color="#9D9D9D"

    var myHeaders = new Headers();                          
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));   

    var raw = JSON.stringify({});


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        Credential:'include'
      };


    fetch(BASE_URL+"/support", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      result.forEach(item => {
        const newItem = child.cloneNode(true)
        newItem.querySelector(".subject").textContent=item.subject
        let status;
        switch(item.status){
          case 0:
            status="Closed"
            newItem.querySelector(".panel").style.display="none"
            break
          
          case 1:
            status="Ongoing"
            break

          case 2:
            status="Ongoing"
            break

          case 3:
            status="Rejected"
            newItem.querySelector(".panel").style.display="none"
            break
 
        }
        newItem.querySelector(".status").textContent=status
        newItem.querySelector(".date").textContent=item.date

        //delete a ticket------------------------------------------------------
        newItem.querySelector(".delete").addEventListener("click",()=>{ 
          deleteRequest(item.ref_no)
         })
        
         //update a ticket----------------------------------------------------
        newItem.querySelector(".edit").addEventListener("click",()=>{ 
          editTicket(item.ref_no,item.subject,item.description)
         }) 
      

        var itemDivs=[newItem.querySelector(".ticket-subject"),newItem.querySelector(".ticket-status"),newItem.querySelector(".ticket-date")];
       
        itemDivs.forEach(function(itemDiv) {
          itemDiv.addEventListener("click",()=>{ viewticket(item.ref_no)})//view tickets--------------------------------------------
          itemDiv.addEventListener("mouseover",()=>{ hoverChnageAddClass(); })
          itemDiv.addEventListener("mouseout",()=>{hoverChnageRemoveClass();})
        });

         function hoverChnageAddClass(){
          itemDivs.forEach(function(itemDiv) {
            itemDiv.classList.add("hoverChange");
          });
         }
         function hoverChnageRemoveClass(){
          itemDivs.forEach(function(itemDiv) {
            itemDiv.classList.remove("hoverChange");
          });
          
         }
        

         switch(view){
          case "ongoing":
            if(item.status==1 || item.status==2){
              perent.appendChild(newItem)
            }
            break

          case "solved":
            if(item.status==0){
              perent.appendChild(newItem)
            }
            break

          case "rejected":
            if(item.status==3){
              perent.appendChild(newItem)
            }
            break
          
          default:
            perent.appendChild(newItem)
          
         }
      
  
      });
      
    })
    .catch(error => console.log('error', error))

  }
  

  
function deleteRequest(TicketID){
  if(confirm('Are you sure you want Delete this request?')){
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));   

    var raw = JSON.stringify({});

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(BASE_URL+"/support?TicketID="+TicketID, requestOptions)
      .then(response => response.text())
      .then(result => {alert(result)
        location.reload();})
      .catch(error => console.log('error', error));
  }
}

//popup view-----------------------------------------------------------------------------
// function viewrequest(item,status){
//   let popup_con=document.querySelector(".pop-up-container");
//   let popup_details=document.querySelector(".pop-up");
//   let close=document.querySelector(".close")

//   let old_bodies= Array.from(popup_details.querySelectorAll(".pop-body"));
//   old_bodies.slice(1).forEach(element=>{
//     element.parentNode.removeChild(element);
//   })
  

//   popup_con.style.display="flex";
//   popup_details.style.display="inline";
//   popup_details.querySelector(".subject").textContent = item.subject;
//   popup_details.querySelector(".description").textContent = item.description;
//   popup_details.querySelector(".date").textContent = item.date;
//   //popup_details.querySelector(".time").textContent = item.time;
//   popup_details.querySelector(".status").textContent =  status;

//   const PopupPerent = document.querySelector(".scroll")
//   const PopupChild = document.querySelector(".pop-body")

//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   fetch("http://localhost:15000/enmo_skill_backend_war/support?Role=Client&UserId=" +encodeURIComponent(item.userId)+"&popup="+encodeURIComponent(item.ref_no), requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       console.log(result)
//       result.forEach(element => {
//         const newItem2 = PopupChild.cloneNode(true)
//         console.log( newItem2);
//         newItem2.querySelector(".subject").textContent=element.subject;
//         newItem2.querySelector(".description").textContent=element.description;
//         newItem2.querySelector(".date").textContent=element.date;
  
//         console.log(element.subject)
//         console.log(element.description)
//         console.log(element)
  
        
//         PopupPerent.appendChild(newItem2)
//       });


//     })
//    .catch(error => console.log('error', error));
    
//   close.onclick=(event)=>{
//       popup_con.style.display="none";
//       popup_details.style.display="none";
//   }
// }

//load create ticket page-------------------------------------------------------------------
function createticket(){
  window.location.href = "../HTML/CSA-main.html"
}

//save update ticket details in local storage--------------------------------------------------
function editTicket(TicketID){ 
  
  var pValue = "edit"
  var url = "../HTML/createTicket.html" + "?pValue=" + encodeURIComponent(pValue)+"&TicketID="+encodeURIComponent(TicketID);

  // var newURL = "../HTML/createTicket.html?ref_no="+encodeURIComponent(TicketID)+"&subject="+encodeURIComponent(subject)+"&description="+encodeURIComponent(description) ;
  window.location = url;
}

function viewticket(ticketID){
  var url ="../HTML/ticketListView.html?ticketID="+ encodeURIComponent(ticketID)
  window.location.href = url
}

