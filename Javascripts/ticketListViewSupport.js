
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


const url = new URL(window.location.href)
var ticketID = url.searchParams.get('ticketID')
var assigned = url.searchParams.get('assigned')
var statuss = url.searchParams.get('status')

const PopupPerent = document.querySelector(".apendUpdates")
const PopupChild = document.querySelector(".body")
const PopupChild2 = document.querySelector(".body2")
const loding = document.querySelector(".loading");


viewMore(ticketID)

function getdata(ticketID,flag){
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
    result.forEach(element => {

      var role= getRole(element.role)
      
        document.querySelector(".profile-pic").src = element.url;
        document.querySelector(".header").textContent = element.userName;
        document.querySelector(".email").textContent = element.email;
        document.querySelector(".subject").textContent = element.subject;
        document.querySelector(".description").textContent = element.description;
        document.querySelector(".date").textContent = element.date;
        document.querySelector(".role").textContent = role;
        document.querySelector(".ticketId").textContent = "Ticket Id: #"+ element.ref_no;
        // document.querySelector(".header").textContent = element.date;


      if(element.order){
        document.querySelector(".refund").style.display="inline"
      }
      if(element.urgent){
        document.querySelector(".urgent").style.display="inline"
      }else if(element.urgent==0 && !(element.status == 3 || element.status == 4)){
        const urgentMark = document.querySelector(".urgentMark")
        urgentMark.style.display="inline"
        urgentMark.addEventListener("click",()=>{
          markUgent(element.ref_no)}
        ) 
      }

      if(element.admin==1){
        document.querySelector(".toaddmin").style.display="inline"
        document.querySelector(".closeBTN").style.display = "none";
        document.querySelector(".assignBTN").style.display = "none";
        document.querySelector(".rejectBTN").style.display = "none";
        document.querySelector(".commentBTN").style.display = "none";        
      }

    setpackage(element.packages)// to display packege img-----------------------------------------



    if (flag % 2 === 0) {
      document.querySelector(".body-main").classList.add("even-item");
    } else {
      document.querySelector(".body-main").classList.add("odd-item");
    }
  
    })
      
  })
  .catch(error => console.log('error', error));
  
}



function  viewMore(ticketID){

  var flag= 0
  var roleId=null;
  var role = null

  console.log(ticketID)
 
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
 
  result.forEach((element, index) => {

    roleId=element.roleID
    role = getRole(roleId)

      const newItem = PopupChild2.cloneNode(true)
      newItem.querySelector(".role2").textContent=role;
      newItem.querySelector(".description2").textContent=element.description;
      newItem.querySelector(".date2").textContent=element.date;
  

      flag=flag+1

    if (index % 2 === 0) {
        newItem.classList.add("even-item");
    } else {
        newItem.classList.add("odd-item");
    }

      PopupPerent.appendChild(newItem)
  })

  getdata(ticketID,flag)

  //bottom buttons----------------------------------------------
  var cloase = document.querySelector(".closeBTN")
  var assignBTN = document.querySelector(".assignBTN")
  var reject = document.querySelector(".rejectBTN")
  var comment = document.querySelector(".commentBTN")
  var desition = null;


  if(statuss==3 || statuss ==4){
    cloase.style.display = "none";
    assignBTN.style.display = "none";
    reject.style.display = "none";
    comment.style.display = "none";
  }
  // console.log(addmin)
  // if(addmin == 1){
  //   console.log(addmin)

  //   cloase.style.display = "none";
  //   assignBTN.style.display = "none";
  //   reject.style.display = "none";
  //   comment.style.display = "none";
  // }

  assignBTN.addEventListener("click",()=>{    
    toAdmin(ticketID)
  })

  cloase.addEventListener("click",()=>{
    desition="solved"
      viewrequest(ticketID,desition)
  })


  reject.addEventListener("click",()=>{
    desition="reject"
    viewrequest(ticketID,desition)
  })

  comment.addEventListener("click",()=>{
    viewrequest2(ticketID)
  })
      

  })
  .catch(error => console.log('error', error));
} 

function setpackage(ispackage){
  if(ispackage>0){
    console.log(ispackage)
    document.querySelector(".column").style.display = "flex"
    document.querySelector(".body-colum").classList.add("body-colum1")
  }
}



//popup view-----------------------------------------------------------------------------
function viewrequest(TicketID,desition){

  let popup_details=document.querySelector(".pop-up");
  const template = popup_details.querySelector('.my-template');
  const swalTitle = template.content.querySelector('swal-title');
  const swalIcon = template.content.querySelector('swal-icon');  

  var massege= null 
  var pvalue = null 
  if(desition=="solved"){
    massege = "Are you want close this ticket?"
    pvalue="Clos"
    swalIcon.setAttribute('color', 'green');
   
  }else if(desition=="reject"){
    massege = "Are you want reject this ticket?"
    pvalue = "Reject"
  }


  // popup_con.style.display="flex";
  // popup_details.style.display="inline";
  
  
  // popup_details.querySelector(".massege").textContent = massege;
  
  swalTitle.textContent = massege;

  Swal.fire({
    template: "#my-template"
  }).then((result) => {
 
    if (result.isConfirmed) {
      
      var myHeaders = new Headers();                          
      myHeaders.append("Content-Type", "application/json");  
      myHeaders.append("Authorization", getCookie("JWT"));  
    
    
      var requestOptions = {
        method: 'OPTIONS',
        headers: myHeaders,
        redirect: 'follow',
      };
    
      loding.style.display ="flex" 
      fetch(BASE_URL+"/support?Decision="+pvalue+"&TicketId="+encodeURIComponent(TicketID), requestOptions)
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
          return response.text()
        }
      })
      .then(result => { 
        var icons=null
        if(result.includes("The ticket was Closed") || result.includes("The ticket was Rejected") ){
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
          window.location="../HTML/ticketListCS.html";
        }, 2500);
      })
      .catch(error => console.log('error', error));    
       
    } else if (result.isDismissed) {
      location.reload()
    }
  })
} 


// add reply to ticket-------------------------------------------------------------------------------------
async function viewrequest2(TicketID){

  const { value: text } = await Swal.fire({
    input: "textarea",
    inputLabel: "Message",
    inputPlaceholder: "Type your message here...",
    inputAttributes: {
      "aria-label": "Type your message here"
    },
    showCancelButton: true
  });

  if (text) {
    console.log(text)

    var myHeaders = new Headers();                          
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));

    var raw = JSON.stringify({
      "ref_no":TicketID,
      "description":text 
    });
  
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: raw
    };

    loding.style.display ="flex"
    fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(TicketID), requestOptions)
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
        return response.text()
      }
    })
    .then(result => {
      var icons = null;
      if(result.includes("Data Updated successfully!")) {
          icons = "success";
      }else{
          icons = "error";
          result = "Error";
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
    
  }

  // let popup_con=document.querySelector(".pop-up-container2");
  // let popup_details=document.querySelector(".pop-up2");

  // massege = "Add a comment "

  // popup_con.style.display="flex";
  // popup_details.style.display="inline";

  // popup_details.querySelector(".massege").textContent = massege;

  // var submit = document.querySelector(".submitBTN")
  // var cancel = document.querySelector(".cancelBTN")
  


//Mark As Ugent-----------------------------------------------------------------------------------------------------
function markUgent(ticketId){

  let popup_details=document.querySelector(".pop-up");
  const template = popup_details.querySelector('.my-template');
  const swalTitle = template.content.querySelector('swal-title'); 
  const swalIcon = template.content.querySelector('swal-icon');

swalIcon.setAttribute('type', 'question');// Update the icon
swalIcon.setAttribute('color', '#3085d6');// Update the color

  var massege= null 

  massege = "Mark as ugent?"
  swalTitle.textContent = massege;

  Swal.fire({
    template: "#my-template"
  }).then((result) => {

    if (result.isConfirmed) {

      loding.style.display ="none"

      var myHeaders = new Headers();                          
      myHeaders.append("Content-Type", "application/json");  
      myHeaders.append("Authorization", getCookie("JWT"));   
    
      
      var requestOptions = {
      method: 'OPTIONS',
      headers: myHeaders,
      redirect: 'follow'
      };
      
      loding.style.display ="flex"
      fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(ticketId)+"&Urgent=1", requestOptions)
      .then(response => {
        loding.style.display ="none";
        if(response.status == 401){
          window.location.href = "../Failed/401.html";
        } else if(response.status == 406){
          const currentUrl = encodeURIComponent(window.location.href);
          window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        } else if(response.status == 404){
          window.location.href = "../Failed/404.html";
        } else {
          return response.text();
        }
      })
      .then(result => {
        var icons=null
        console.log(result)
      if(result.includes("Marked")){
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
    }else if (result.isDismissed) {
      location.reload()
    }

  })


}


//assign to admin-----------------------------------------------------------------------------------------------------
function toAdmin(ticketId){

  let popup_details=document.querySelector(".pop-up");
  const template = popup_details.querySelector('.my-template');
  const swalTitle = template.content.querySelector('swal-title'); 
  const swalIcon = template.content.querySelector('swal-icon');

swalIcon.setAttribute('type', 'question');// Update the icon
swalIcon.setAttribute('color', '#3085d6');// Update the color

  var massege= null 

  massege = "Assign this ticket to admin?"
  swalTitle.textContent = massege;

  Swal.fire({
    template: "#my-template"
  }).then((result) => {

    if (result.isConfirmed) {

      loding.style.display ="none"

      var myHeaders = new Headers();                          
      myHeaders.append("Content-Type", "application/json");  
      myHeaders.append("Authorization", getCookie("JWT"));   
    
      
      var requestOptions = {
      method: 'OPTIONS',
      headers: myHeaders,
      redirect: 'follow'
      };
      
      loding.style.display ="flex"
      fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(ticketId)+"&toAdmin=1", requestOptions)
      .then(response => {
        loding.style.display ="none";
        if(response.status == 401){
          window.location.href = "../Failed/401.html";
        } else if(response.status == 406){
          const currentUrl = encodeURIComponent(window.location.href);
          window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        } else if(response.status == 404){
          window.location.href = "../Failed/404.html";
        } else {
          return response.text();
        }
      })
      .then(result => {
        var icons=null
        console.log(result)
      if(result.includes("Assign successful!")){
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
          location.reload()
      }, 2500);
      })
      .catch(error => console.log('error', error));
    }else if (result.isDismissed) {
      location.reload()
    }

  })


}



//get role----------------------------------------------
function getRole(roleId){
  var role = null;

  if(roleId == "4"){
    role = "Support Center"
  }else if(roleId == "3"){
    role = "Addmin"
  }else if(roleId == "2"){
    role = "Designer"
  }else if(roleId == "1"){
    role = "Client"
  }

  return role
}


     

  