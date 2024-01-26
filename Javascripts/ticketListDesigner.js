var userId = 69

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


var requestOptions = {
    method: 'GET',
    Credential:'include'
  };


  function tableLoad(view){
    perent.innerHTML=""
    all.style.color="#9D9D9D"
    ongoing.style.color="#9D9D9D"
    solved.style.color="#9D9D9D"
    rejected.style.color="#9D9D9D"


    fetch(BASE_URL+"/support?Role=Designer&UserId="+userId, requestOptions)
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

        //delete a ticker------------------------------------------------------
        newItem.querySelector(".delete").addEventListener("click",()=>{ 
          deleteRequest(item.ref_no)
         })
        
         //update a ticket----------------------------------------------------
        newItem.querySelector(".edit").addEventListener("click",()=>{ 
          editTicket(item.ref_no,item.subject,item.description)
         })  

        var itemDivs=[newItem.querySelector(".ticket-subject"),newItem.querySelector(".ticket-status"),newItem.querySelector(".ticket-date")];
        itemDivs.forEach(function(itemDiv) {
          itemDiv.addEventListener("click",()=>{ viewrequest(item,status)})
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

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch(BASE_URL+"/support?TicketID="+TicketID, requestOptions)
      .then(response => response.text())
      .then(result => {alert(result)
        location.reload();})
      .catch(error => console.log('error', error));
  }
}

function viewrequest(item,status){
    let popup_con=document.querySelector(".pop-up-container");
    let popup_details=document.querySelector(".pop-up");
    let close=document.querySelector(".close")

    
        popup_con.style.display="flex";
        popup_details.style.display="inline";
        popup_details.querySelector(".subject").textContent = item.subject;
        popup_details.querySelector(".description").textContent = item.description;
        popup_details.querySelector(".date").textContent = item.date;
        //popup_details.querySelector(".time").textContent = item.time;

        popup_details.querySelector(".status").textContent =  status;
    
    close.onclick=(event)=>{
        popup_con.style.display="none";
        popup_details.style.display="none";
    }
}

function createticket(){
  window.location.href = "../HTML/CSA-main.html"
}

function editTicket(TicketID,subject,description){ 

  //store ticket data in local storage
  var ticketData = {
    ticketID:TicketID,
    subject:subject,
    description: description
  };
  localStorage.setItem('ticketData', JSON.stringify(ticketData));

  //set parameter value
  var pValue = "edit"; 
  var url = "../HTML/createTicket.html" + "?pValue=" + encodeURIComponent(pValue);

  // var newURL = "../HTML/createTicket.html?ref_no="+encodeURIComponent(TicketID)+"&subject="+encodeURIComponent(subject)+"&description="+encodeURIComponent(description) ;
  window.location = url;
}

