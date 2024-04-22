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


const PopupPerent = document.querySelector(".apendUpdates")
const PopupChild = document.querySelector(".body")
const PopupChild2 = document.querySelector(".body2")
const loding = document.querySelector(".loading");
const coverImage = document.querySelector('.gig-image1');
const title = document.querySelector('.gig-title');
const ticketId = document.querySelector('.ticketId');

loding.style.display ="none"

ticketId.textContent="#"+ticketID

viewMore(ticketID)

function getdata(ticketID,flag){
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
      console.log(result)
      result.forEach(element => {
        document.querySelector(".subject").textContent = element.subject;
        document.querySelector(".description").textContent = element.description;
        document.querySelector(".date").textContent = element.date;
        document.querySelector(".role").textContent="Me";
  
        // document.querySelector(".header").textContent = element.date;
  
        var status = element.status
        //get packege details-----------------------------------------------------------------
        if(element.packages>0){
          document.querySelector(".column").style.display = "flex"
          document.querySelector(".body-colum").classList.add("body-colum1")

          getpackage(element.packages)
        }

        if (flag % 2 === 0) {
          document.querySelector(".body-main").classList.add("even-item");
        } else {
          document.querySelector(".body-main").classList.add("odd-item");
        }

        if(status==3 || status==4){
          document.querySelector(".replyBTN").style.display= "none"
        }
     
  
        switch(status){
            
          case 1:
            status="Ongoing"
            document.querySelector(".header").textContent=status
            document.querySelector(".header").style.backgroundColor= "rgba(234, 234, 0, 0.486)" 
          break
  
          case 2:
            status="Ongoing"
            document.querySelector(".header").textContent=status
            document.querySelector(".header").style.backgroundColor=  "rgba(234, 234, 0, 0.486)"
            break
  
          case 3:
            status="Closed"
            document.querySelector(".header").textContent=status
            document.querySelector(".header").style.backgroundColor= "rgba(0, 232, 28, 0.678)" 
            break
  
          case 4:
            status="Rejected"
            document.querySelector(".header").textContent=status
            document.querySelector(".header").style.backgroundColor= "rgba(255, 1, 1, 0.492)"
            break
          }
      })
        
    })
  .catch(error => console.log('error', error));
}

function  viewMore(ticketID){

  var flag= 0
  var roleId=null;
  var role = null
    
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
    
    // if(result.length>0){document.querySelector(".bottom-header").style.display="flex"}
    result.forEach((element,index) => {
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
    });


    })
    .catch(error => console.log('error', error));
    getdata(ticketID,flag+1)
   

    document.querySelector(".replyBTN").addEventListener("click",()=>{
      viewrequest2(ticketID)
    })
} 

//reply------------------------------------------------------------------------------------------------------------------
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

//get packege------------------------------------------------------
function getpackage(packageID){
  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));  
  
  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };
  
  loding.style.display ="flex"
  fetch(BASE_URL+"/package?packageId="+encodeURIComponent(packageID), requestOptions)
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
      console.log(result)
      // result.forEach(element => {
        const coverUrl = result.coverUrl;
        const imageElement = document.createElement('img');
        imageElement.src = coverUrl;
        imageElement.width = '200';
        coverImage.appendChild(imageElement);

        title.textContent = result.title;


      // })
    })
}


//get role----------------------------------------------
function getRole(roleId){
  var role = null;

  if(roleId == "4"){
    role = "Support Center"
  }else if(roleId == "3"){
    role = "Support Center"
  }else if(roleId == "2"){
    role = "Me"
  }

  return role
}

  