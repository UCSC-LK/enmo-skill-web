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


    fetch(BASE_URL+"/support?UserId=1&Role=Designer", requestOptions)
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
          
          default:
             status="default"
             break  
        }
        newItem.querySelector(".status").textContent=status
        newItem.querySelector(".date").textContent=item.date

        
        newItem.querySelector(".delete").addEventListener("click",()=>{ 
          deleteRequest(item.ref_no)
         })   
         
         newItem.addEventListener("click",()=>{
         viewrequest(item)
         })

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
  

  
function deleteRequest(requestID){
  if(confirm('Are you sure you want Delete this request?')){

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch(BASE_URL+"/support?TicketID="+requestID, requestOptions)
      .then(response => response.text())
      .then(result => {alert(result)
        location.reload();})
      .catch(error => console.log('error', error));
  }
}

function viewrequest(item){
    let popup_con=document.querySelector(".pop-up-container");
    let popup_details=document.querySelector(".pop-up");

    
        popup_con.style.display="flex";
        popup_details.style.display="inline";
        popup_details.querySelector(".subject").textContent = item.subject;
        popup_details.querySelector(".description").textContent = item.description;
        popup_details.querySelector(".date").textContent = item.date;
        //popup_details.querySelector(".time").textContent = item.time;
        popup_details.querySelector(".status").textContent = item.status;
    
    popup_con.onclick=(event)=>{
        popup_con.style.display="none";
        popup_details.style.display="none";
    }
}

function createticket(){
  window.location.href = "../HTML/CSA-main.html"
}

