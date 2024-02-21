function createticket(){
    alert("UI is under construction")
}

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

  var userId = 76 //getCookie("User_ID");

const all = document.querySelector(".all")
const me = document.querySelector(".me")


const perent=document.querySelector(".parent")
const child=document.querySelector(".ticket-box-3")
const child2=document.querySelector(".ticket-box-2")

tableLoad("all")
all.style.color="#000000"

all.addEventListener("click",()=>{
  
  tableLoad("all",userId)
  all.style.color="#000000"
})

me.addEventListener("click",()=>{
  tableLoad("me",userId)
  me.style.color="#000000"
  
})


function tableLoad(view,userId){

  perent.innerHTML=""
    all.style.color="#9D9D9D"
    me.style.color="#9D9D9D"


  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var raw = JSON.stringify({});

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        Credential:'include'
      };
  
  //get tickkets--------------------------------------------------------------
    fetch(BASE_URL+"/support", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      result.forEach(item => {
        
        if(view=="me"){
                  
          const newItem = child.cloneNode(true)
          newItem.querySelector(".agent").remove()


          newItem.querySelector(".btn").remove();
          newItem.querySelector('.profile-pic').src=item.url
          newItem.querySelector(".name").textContent=item.userName
          newItem.querySelector(".subject").textContent=item.subject

          if(item.role=="1"){newItem.querySelector(".role").textContent="Client"}
          else if(item.role=="2"){newItem.querySelector(".role").textContent="Designer"}

          if(item.agentID==userId && item.status==2){perent.appendChild(newItem)}

          var itemDivs=[
            newItem.querySelector(".ticket-name"),
            newItem.querySelector(".ticket-role"),
            newItem.querySelector(".ticket-subject"),
            newItem.querySelector(".profile-pic-main"),
            //newItem.querySelector(".hover")
          ]
         
          itemDivs.forEach(function(itemDiv) {
            itemDiv.addEventListener("click",()=>{ viewticket(item.ref_no,true)})//view tickets--------------------------------------------
            itemDiv.addEventListener("mouseover",()=>{ hoverChnageAddClass(itemDivs); })
            itemDiv.addEventListener("mouseout",()=>{hoverChnageRemoveClass(itemDivs);})
          });


        }else{
          const newItem = child.cloneNode(true)

          newItem.querySelector(".profile-pic").src=item.url
          newItem.querySelector(".name").textContent=item.userName
          newItem.querySelector(".subject").textContent=item.subject
          newItem.querySelector(".description").textContent=item.description
          getAgent(newItem)                  

          if(item.role=="1"){newItem.querySelector(".role").textContent="Client"}
          else if(item.role=="2"){newItem.querySelector(".role").textContent="Designer"}
    
          if(item.status==1)perent.appendChild(newItem)
        
        // Get the selected agent ID------------------------------------------------------------------- 
        const agentSelect = newItem.querySelector('.agentSelect');
        let selectValue = 0;
        let name = '';

        agentSelect.addEventListener("change", () => {
          selectValue = agentSelect.value                                 //get selected agent ID-----
          name=agentSelect.options[agentSelect.selectedIndex].textContent //get selected agent name------
        })

        newItem.querySelector(".assignBTN").addEventListener("click",()=>{ 
          viewrequest(item.ref_no,selectValue,name)  //call to popup------           
        })

        var itemDivs=[
          newItem.querySelector(".ticket-name"),
          newItem.querySelector(".ticket-role"),
          newItem.querySelector(".ticket-subject"),
          newItem.querySelector(".profile-pic-main")
        ]
       
        itemDivs.forEach(function(itemDiv) {
          itemDiv.addEventListener("click",()=>{ viewticket(item.ref_no,false)})//view tickets--------------------------------------------
          itemDiv.addEventListener("mouseover",()=>{ hoverChnageAddClass(itemDivs); })
          itemDiv.addEventListener("mouseout",()=>{hoverChnageRemoveClass(itemDivs);})
        });

      }
        
    })
  })            
        
    .catch(error => console.log('error', error))

}


//get agents for deop down----------------------------------------------------------
function getAgent(newItem) {
  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var raw = JSON.stringify({});

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        Credential:'include'
      };
  fetch(BASE_URL + "/supportAgent", requestOptions)
    .then(response => response.json())
    .then(result => {
      const agentSelect = newItem.querySelector('.agentSelect');

      // Adding a default option
      const defaultOption = { userId: 0, userName: 'Select an Agent' };
      result.unshift(defaultOption);

      // Sorting the array by userName
      result.sort((a, b) => {
        if (a.userName === defaultOption.userName) return -1; // Move "Select an Agent" to the top
        if (b.userName === defaultOption.userName) return 1;  // Move "Select an Agent" to the top
        return a.userName.localeCompare(b.userName);
      });
      console.log(result)

      result.forEach(item => {
        const option = document.createElement('option');
        option.value = item.userId;
        option.textContent = item.userName;
        agentSelect.appendChild(option);
      });

    })
    .catch(error => console.log('error', error));
}

//assign agrnt to ticket-------------------------------------------------
function assing(selectedAgentId, ticketID){

  console.log(ticketID)
  console.log(selectedAgentId)

  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var raw = JSON.stringify({});

  var requestOptions = {
    method: 'OPTIONS',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(BASE_URL+"/support?AgentID="+selectedAgentId+"&TicketId="+ticketID, requestOptions)
    .then(response => response.text())
    .then(result => {alert(result)
      location.reload();})
    .catch(error => console.log('error', error));
} 

//viwe popup---------------------------------------------------------------------------------------
function viewrequest(TicketID,agentID,agentName){
  console.log(TicketID)
  console.log(agentID)
  console.log(agentName)
 
  const popup_con = document.querySelector(".pop-up-container2");
  const popup_details = document.querySelector(".pop-up2");

  var massege= "Are you want assing this ticket to \'" + agentName + "\'?"

  popup_con.style.display = "flex";
  popup_details.style.display = "block";
  
  popup_details.querySelector(".massege").textContent = massege;

  var yes = document.querySelector(".yes")
  var no = document.querySelector(".no")

  console.log("01")

  yes.addEventListener("click",()=>{
    if(agentID>0){
      assing(agentID, TicketID)
    }else{
      alert("select a agent")
    }
    
  })

  no.addEventListener("click",()=>{
    location.reload()
  })  

}

function hoverChnageAddClass(itemDivs){
  itemDivs.forEach(function(itemDiv) {
    itemDiv.classList.add("hoverChange");
  });
 }
 function hoverChnageRemoveClass(itemDivs){
  itemDivs.forEach(function(itemDiv) {
    itemDiv.classList.remove("hoverChange");
  });
 }


 function viewticket(ticketID, assigned){

  var url ="../HTML/ticketListViewSupport.html?ticketID="+ encodeURIComponent(ticketID)+"&assigned="+encodeURIComponent(assigned)
    window.location.href = url
  
}
