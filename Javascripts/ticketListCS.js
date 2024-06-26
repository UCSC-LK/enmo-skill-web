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

const urlParams = new URLSearchParams(window.location.search);
const massage =  urlParams.get('pvalue')

const header = document.querySelector(".all")
// const me = document.querySelector(".me")
const perent=document.querySelector(".parent")
const child=document.querySelector(".ticket-box-3")
const child2=document.querySelector(".ticket-box-2")
const loding = document.querySelector(".loading");

loding.style.display ="none"

header.textContent=massage //set hedder----------------------------------------------------------------------------------

// tableLoad("all")
// all.style.color="#000000"

// all.addEventListener("click",()=>{
  
//   tableLoad("all",userId)
//   all.style.color="#000000"
// })

// me.addEventListener("click",()=>{
//   tableLoad("me",userId)
//   me.style.color="#000000"
  
// })
if(massage=="Assigned"){
  getAsignTicket()
}
tableLoad(massage)



function tableLoad(view){

  // perent.innerHTML=""
  //   all.style.color="#9D9D9D"
  //   // me.style.color="#9D9D9D"


  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    Credential:'include'
  };
  
  //get tickkets--------------------------------------------------------------
  loding.style.display ="flex"
    fetch(BASE_URL+"/support", requestOptions)
    .then(response =>{
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
      result.forEach(item => {

        if(item.agentID==0 && !(item.status==3||item.status==4) ){
          const newItem = child.cloneNode(true)

          // newItem.querySelector(".profile-pic").src=item.url
          // newItem.querySelector(".name").textContent=item.userName
          newItem.querySelector(".ticketId").textContent="#"+item.ref_no
          newItem.querySelector(".subject").textContent=item.subject
          newItem.querySelector(".description").textContent=item.description

         
          if(item.urgent==0){
            newItem.querySelector(".order2").style.display="none"
          }
          if(item.order==0){
            newItem.querySelector(".order1").style.display="none"
          }

          if(view=="All" || view == null){
            perent.appendChild(newItem)
          }else if(view=="Refunds" && item.order >0  && item.agentID<=0){
            perent.appendChild(newItem)
          }else if(view=="Packeges" && item.packages > 0  && item.agentID<=0){
            perent.appendChild(newItem)
          }
          
          getAgent(newItem)                  

          if(item.role=="1"){newItem.querySelector(".role1").textContent="Client"}
          else if(item.role=="2"){newItem.querySelector(".role1").textContent="Designer"}
    
          // if(item.status==1)perent.appendChild(newItem)
        
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
            // newItem.querySelector(".ticket-name"),
            newItem.querySelector(".ticketId"),
            newItem.querySelector(".ticket-role"),
            newItem.querySelector(".ticket-subject")
            // newItem.querySelector(".profile-pic-main")
          ]
       
          itemDivs.forEach(function(itemDiv) {
            itemDiv.addEventListener("click",()=>{ viewticket(item.ref_no,false,item.status,item.admin)})//view tickets--------------------------------------------
          });             


        }else if(view=="Old" && (item.status == 3 || item.status == 4)){
          
          const newItem = child.cloneNode(true)
          newItem.querySelector(".agent").remove()

          newItem.querySelector(".btn").remove();
          // newItem.querySelector('.profile-pic').src=item.url
          // newItem.querySelector(".name").textContent=item.userName
          newItem.querySelector(".ticketId").textContent="#"+item.ref_no
          newItem.querySelector(".subject").textContent=item.subject

          if(item.urgent==0){
            newItem.querySelector(".order2").style.display="none"
          }
          if(item.order==0){
            newItem.querySelector(".order1").style.display="none"
          }
         
          if(item.role=="1"){newItem.querySelector(".role1").textContent="Client"}
          else if(item.role=="2"){newItem.querySelector(".role1").textContent="Designer"}

          perent.appendChild(newItem)   

          var itemDivs=[
            newItem.querySelector(".ticket-name"),
            newItem.querySelector(".ticket-role"),
            newItem.querySelector(".ticket-subject"),
            newItem.querySelector(".profile-pic-main"),
            //newItem.querySelector(".hover")
          ]
         
          itemDivs.forEach(function(itemDiv) {
            itemDiv.addEventListener("click",()=>{ viewticket(item.ref_no,true,item.status,item.admin)})//view tickets--------------------------------------------
          });
        }
      })
        
    })        
        
    .catch(error => console.log('error', error))

}
//getAsignTicket-----------------------------------------------------------------------------
function getAsignTicket(){

  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    Credential:'include'
  };
  
  loding.style.display ="flex"
    fetch(BASE_URL+"/support?assign=1", requestOptions)
    .then(response =>{
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
      result.forEach(item => {

        const newItem = child.cloneNode(true)
        newItem.querySelector(".agent").remove()

        newItem.querySelector(".btn").remove();
        // newItem.querySelector('.profile-pic').src=item.url
        // newItem.querySelector(".name").textContent=item.userName
        newItem.querySelector(".ticketId").textContent= "#"+item.ref_no
        newItem.querySelector(".subject").textContent=item.subject

        if(item.urgent==0){
          newItem.querySelector(".order2").style.display="none"
        }
        if(item.order==0){
          newItem.querySelector(".order1").style.display="none"
        }
       
        if(item.role=="1"){newItem.querySelector(".role1").textContent="Client"}
        else if(item.role=="2"){newItem.querySelector(".role1").textContent="Designer"}
        perent.appendChild(newItem)  

          var itemDivs=[
            newItem.querySelector(".ticket-name"),
            newItem.querySelector(".ticket-role"),
            newItem.querySelector(".ticket-subject"),
            // newItem.querySelector(".profile-pic-main"),
            //newItem.querySelector(".hover")
          ]
         
          itemDivs.forEach(function(itemDiv) {
            itemDiv.addEventListener("click",()=>{ viewticket(item.ref_no,true,item.status,item.admin)})//view tickets--------------------------------------------
          });
  
      })
  })

}

//get agents for deop down----------------------------------------------------------
function getAgent(newItem) {
  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        Credential:'include'
      };

  loding.style.display ="flex"
  fetch(BASE_URL + "/supportAgent", requestOptions)
  .then(response =>{
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
      const agentSelect = newItem.querySelector('.agentSelect');

      // Adding a default option
      const defaultOption = { userId: 0, userName: 'Select an Agent' };
      result.unshift(defaultOption);

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

//assign agrnt to ticket-----------------------------------------------------------------------------------------------------
function assing(selectedAgentId, ticketID){

  console.log(ticketID)
  console.log(selectedAgentId)

  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var requestOptions = {
    method: 'OPTIONS',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  loding.style.display ="flex"
  fetch(BASE_URL+"/support?AgentID="+selectedAgentId+"&TicketId="+ticketID, requestOptions)
  .then(response =>{
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
    .then(result => {
      var icons=null
      if(result.includes("Ticket assign successful!")){
        icons="success"
      }else{
      icons="error"
      result="Error"
    }  
      Swal.fire({        
        icon: icons,
        title: result,
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        location.reload();
      }, 2500);
    })
    .catch(error => console.log('error', error));
} 

//viwe popup---------------------------------------------------------------------------------------
function viewrequest(TicketID,agentID,agentName){
  console.log(TicketID)
  console.log(agentID)
  console.log(agentName)
 
  let popup_details=document.querySelector(".pop-up2");
  const template = popup_details.querySelector('.my-template');
  const swalTitle = template.content.querySelector('swal-title');

  var massege= "Are you want assing this ticket to \'" + agentName + "\'?"

  swalTitle.textContent = massege;
  if(agentID>0){
    Swal.fire({
      template: "#my-template"
    }).then((result) => {
      if (result.isConfirmed) {
        assing(agentID, TicketID)
      }
      
    })
  }else{
    Swal.fire({        
      icon: "warning",
      title: "Select an Agent",
      showConfirmButton: false,
      timer: 2000
    });
  }    
}
//create ticket--------------------------------------------------------------------------------------------------------------
function createticket(){
  window.location.href="../HTML/createTicket-CSA.html"
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

//show a ticket details------------------------------------------ 
 function viewticket(ticketID, assigned,status,admin){
 
  var url ="../HTML/ticketListViewSupport.html?ticketID="+ encodeURIComponent(ticketID)+"&assigned="+encodeURIComponent(assigned)+"&status="+encodeURIComponent(status)+"&admin="+encodeURIComponent(admin)
    window.location.href = url
  
}



