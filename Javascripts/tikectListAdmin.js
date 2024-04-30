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

const all = document.querySelector(".all")
const me = document.querySelector(".me")
const packages = document.querySelector(".package")
const refunds = document.querySelector(".refund")
const old = document.querySelector(".old")
// const me = document.querySelector(".me")
const perent=document.querySelector(".parent")
const child=document.querySelector(".ticket-box-3")
const child2=document.querySelector(".ticket-box-2")
const loding = document.querySelector(".loading");

loding.style.display ="none"

tableLoad("me")
me.style.color="#000000"

all.addEventListener("click",()=>{
  
  tableLoad("all")
  all.style.color="#000000"
})

me.addEventListener("click",()=>{
  tableLoad("me")
  me.style.color="#000000"
})

packages.addEventListener("click",()=>{
  tableLoad("packages")
  packages.style.color="#000000"
})

refunds.addEventListener("click",()=>{
  tableLoad("refunds")
  refunds.style.color="#000000"
})
old.addEventListener("click",()=>{
    tableLoad("old")
    old.style.color="#000000"
  })


function tableLoad(view){

    perent.innerHTML=""
    all.style.color="#9D9D9D"
    me.style.color="#9D9D9D"
    packages.style.color="#9D9D9D"
    refunds.style.color="#9D9D9D"
    old.style.color="#9D9D9D"


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
        
        if(!(item.admin==1 || item.status == 3 || item.status == 4)){
          getAgent(newItem)  
        }
                          

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
          // newItem.querySelector(".ticketId"),
          newItem.querySelector(".ticketId"),
          newItem.querySelector(".ticket-role"),
          newItem.querySelector(".ticket-subject")
          // newItem.querySelector(".profile-pic-main")
          
        ]
     
        itemDivs.forEach(function(itemDiv) {
          
          itemDiv.addEventListener("click",()=>{ viewticket(item.ref_no,item.admin,item.status)})//view tickets--------------------------------------------
        });          


        switch(view){

            case "me":
              if(item.admin==1 && (item.status == 1 || item.status == 2)){
                newItem.querySelector(".agent").remove()
                newItem.querySelector(".btn").remove();
                perent.appendChild(newItem)
              }
              break
  
            case "packages":
              if(item.admin!=1 && item.packages>0 && (item.status == 1 || item.status == 2) && item.agentID<=0){
                perent.appendChild(newItem)
              }
              break
  
            case "refunds":
              if(item.admin!=1 && item.order>0 && (item.status == 1 || item.status == 2) && item.agentID<=0){
                perent.appendChild(newItem)
              }
              break
            case "old":
                if(item.status == 3 || item.status == 4){
                    newItem.querySelector(".agent").remove()
                    newItem.querySelector(".btn").remove();
                    perent.appendChild(newItem)
                }
            break  
            
            default:
              if(item.admin!=1 && (item.status == 1 || item.status == 2) && item.agentID<=0){
                perent.appendChild(newItem)
              }
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
// function createticket(){
//   window.location.href="../HTML/createTicket-CSA.html"
// }

// function hoverChnageAddClass(itemDivs){
//   itemDivs.forEach(function(itemDiv) {
//     itemDiv.classList.add("hoverChange");
//   });
//  }
//  function hoverChnageRemoveClass(itemDivs){
//   itemDivs.forEach(function(itemDiv) {
//     itemDiv.classList.remove("hoverChange");
//   });
//  }

//show a ticket details------------------------------------------ 
 function viewticket(ticketID,admin,status){ 
  var url ="../HTML/ticketListViewAdmin.html?ticketID="+ encodeURIComponent(ticketID)+"&admin="+encodeURIComponent(admin)+"&status="+encodeURIComponent(status)
    window.location.href = url
  
}



