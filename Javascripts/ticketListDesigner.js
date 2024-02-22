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

// var userLevel = 2 //hard coded----------------------

const createTicket = document.querySelector(".createTicket")
const all = document.querySelector(".all")
const ongoing = document.querySelector(".ongoing")
const solved = document.querySelector(".solved")
const rejected = document.querySelector(".rejected")


const perent = document.querySelector(".parent")
const child = document.querySelector(".ticket-box-2")

createTicket.addEventListener("click",()=>{
  createticketDesigner()
  // if(userLevel==1){
  //   createticketClent()
  // }else if(userLevel==2){
  //   createticketDesigner()
  // }
})

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
         
          case 1:
            status="Ongoing"
            break

          case 2:
            status="Ongoing"
            break

          case 3:
            status="Closed"
            newItem.querySelector(".panel").style.display="none"
            break
            
          case 4:
            status="Rejected"
            newItem.querySelector(".panel").style.display="none"
            break
            
        }
        newItem.querySelector(".status").textContent=status
        newItem.querySelector(".date").textContent=item.date

        if(item.order<=0){
          newItem.querySelector(".order1").style.display="none"
        }

        //delete a ticket------------------------------------------------------
        newItem.querySelector(".delete").addEventListener("click",()=>{ 
          deleteRequest(item.ref_no)
         })
        
         //update a ticket----------------------------------------------------
        newItem.querySelector(".edit").addEventListener("click",()=>{
          editTicket(item.ref_no)
         }) 
      

        var itemDivs=[newItem.querySelector(".ticket-subject"),newItem.querySelector(".ticket-status"),newItem.querySelector(".ticket-date"),newItem.querySelector(".order")];
       
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
            if(item.status==3){
              perent.appendChild(newItem)
            }
            break

          case "rejected":
            if(item.status==4){
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

  let popup_con=document.querySelector(".pop-up-container");
  let popup_details=document.querySelector(".pop-up");

  var massege= "Are you sure you want Delete this request?"  

  popup_con.style.display="flex";
  popup_details.style.display="inline";
  
  popup_details.querySelector(".massege").textContent = massege;

  var textarea = document.getElementById("description");
  textarea.remove();                                    // remove input feeld-------------------

  var Delete = document.querySelector(".updateBTN")
  var cancel = document.querySelector(".cancelBTN")

  Delete.value="Delete"
  cancel.value="Cancel"
 
  Delete.addEventListener("click",()=>{
    
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
  })

  cancel.addEventListener("click",()=>{
    location.reload()
  })
}


function editTicket(ticketID){
  let popup_con=document.querySelector(".pop-up-container");
  let popup_details=document.querySelector(".pop-up");

  var massege= "Add some Updates"  

  popup_con.style.display="flex";
  popup_details.style.display="inline";
  
  popup_details.querySelector(".massege").textContent = massege;

  var submit = document.querySelector(".updateBTN")
  var cancel = document.querySelector(".cancelBTN")

  submit.value="Send"
  cancel.value="Cancel"

  submit.addEventListener("click",()=>{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", getCookie("JWT")); 
        
    var raw = JSON.stringify({
        "ref_no":ticketID,
        "description":document.getElementById("description").value,
    });

    console.log(raw)
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw
    };
        
    fetch(BASE_URL+"/support", requestOptions)
      .then(response => response.text())
      .then(result => {alert(result)
        window.location="../HTML/tikectListDisigner.html"})
      .catch(error => console.log('error', error));
      })

  cancel.addEventListener("click",()=>{
    location.reload()
  })


}

//load create ticket page-------------------------------------------------------------------
function createticketDesigner(){
  window.location.href = "../HTML/CSA-designer.html"
}

function createticketClent(){
  window.location.href = "../HTML/CSA-client.html"
}

//save update ticket details in local storage--------------------------------------------------
// function editTicket(ticketID){ 
//   console.log(ticketID)
  
//   var pValue = "edit"
//   var url = "../HTML/createTicket.html" + "?pValue=" + encodeURIComponent(pValue)+"&TicketID="+encodeURIComponent(ticketID);

//   // var newURL = "../HTML/createTicket.html?ref_no="+encodeURIComponent(TicketID)+"&subject="+encodeURIComponent(subject)+"&description="+encodeURIComponent(description) ;
//   window.location = url;
// }

function viewticket(ticketID){
  var url ="../HTML/ticketListView.html?ticketID="+ encodeURIComponent(ticketID)
  window.location.href = url
}

