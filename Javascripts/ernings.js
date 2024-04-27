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

const loding = document.querySelector(".loading")
const available = document.querySelector(".available")
const being = document.querySelector(".being")
const active = document.querySelector(".active")
const all = document.querySelector(".all")
const lastAmount = document.querySelector(".lastAmount")
const withdrwbtn = document.querySelector(".withdrw-btn")
const orderBox = document.querySelector(".order-box")
const activity = document.querySelector(".activity")
const parentPending = document.querySelector(".parentPending")
const parentToClaimd = document.querySelector(".parentToClaimd")
const parentClaimd = document.querySelector(".parentClaimd")
const parentDelived = document.querySelector(".parentDelived")


loding.style.display ="none"

//get prices--------------------------------------------------------------------
var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");  
myHeaders.append("Authorization", getCookie("JWT"));   

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    Credential:'include'
  };

  loding.style.display ="flex"

fetch(BASE_URL+"/ernings?price=1", requestOptions)
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
  result.forEach(ithem => {
    available.textContent = "Rs. " + ithem.available;
    being.textContent = "Rs. " + ithem.begin;
    active.textContent = "Rs. " + ithem.active;
    all.textContent = "Rs. " + ithem.all;
    lastAmount.textContent = "Rs. " + ithem.lastAmount;
  })
})
.catch(error => console.log('error', error));


// get list----------------------------------------------------------------------------------
var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");  
myHeaders.append("Authorization", getCookie("JWT"));   

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    Credential:'include'
  };

  loding.style.display ="flex"

fetch(BASE_URL+"/ernings", requestOptions)
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
.then(result =>{
  result.forEach(element =>{
    const newItem = orderBox.cloneNode(true);  
    var isAvailble = element.isAvailable
    var dateString = element.date
    var parts = dateString.split(" ");
    var datePart = parts[0];
    newItem.querySelector(".date").textContent = datePart
    newItem.querySelector(".amount").textContent= "Rs. "+element.amount
    newItem.querySelector(".order").textContent="#"+element.orderId

    if (element.status == 0 || element.status == 1 || element.status == 2) {
      newItem.querySelector(".description").textContent = "-"
      newItem.querySelector(".activityPenging").style.display="inline"
      parentPending.appendChild(newItem); 
    }else if(element.status == 3){
      if(isAvailble){
        newItem.querySelector(".description").textContent = "Now"
        newItem.querySelector(".activityToClimed").style.display="inline"
        parentToClaimd.appendChild(newItem);
      }else{
        if(element.remainingDays==1){ newItem.querySelector(".description").textContent = element.remainingDays + " day"}
        else{ newItem.querySelector(".description").textContent = element.remainingDays + " days"}
        newItem.querySelector(".activityPenging").style.display="inline"
        parentDelived.appendChild(newItem);
      }
 
    }else if(element.status == 4){
      newItem.querySelector(".description").textContent = "-"
      newItem.querySelector(".activityCancel").style.display="inline"
      parentClaimd.appendChild(newItem);
    }else if(element.status == 5){
      newItem.querySelector(".description").textContent = "-"
      newItem.querySelector(".activityClimed").style.display="inline"
      parentPending.appendChild(newItem);
    }

    newItem.querySelector(".activityToClimed").addEventListener("click",()=>{
      Swal.fire({
        title: "Add to account?",
        icon: "question",
        // iconHtml: "؟",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        // showCloseButton: true
      })
      .then((result) => {  
            if (result.isConfirmed) {
              toClaimed(element.orderId)
            }
          })
    // swalTitle.textContent = "Add to account?"
    //  Swal.fire({
    //     template: "#my-template"    
    //   }).then((result) => {  
    //     if (result.isConfirmed) {
    //       toClaimed(element.orderId)
    //     }    
        
    //   })
       
    // })
    })
  })
})
.catch(error => console.log('error', error));

  
  



withdrwbtn.addEventListener("click",()=>{
  withdrawal()
})




//reply------------------------------------------------------------------------------------------------------------------
async function withdrawal(){

// const { value: text } = await Swal.fire({
//   input: "textarea",
//   inputLabel: "Message",
//   inputPlaceholder: "Enter amount message here...",
//   inputAttributes: {
//   "aria-label": "Enter amount message here"
// },
//   showCancelButton: true
// });
const { value: amount } = await Swal.fire({
  input: "text",
  inputLabel: "Enter amount",
  inputPlaceholder: "Enter amount LKR.."
});
if (amount) {
  console.log(amount)

  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));

  var raw = JSON.stringify({
    "amount":amount
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow',
    body: raw
  };

  loding.style.display ="flex"
  fetch(BASE_URL+"/ernings", requestOptions)
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
    console.log(result)
    if(result.includes("Withdrawal successfully!")) {
      icons = "success";
    }else if(result.includes("Invalid Amount!")){
      icons = "error";
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

function toClaimed(orderID){

  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var requestOptions = {
      method: 'OPTIONS',
      headers: myHeaders,
      Credential:'include'
    };

    loding.style.display ="flex"

  fetch(BASE_URL+"/ernings?orderID="+orderID, requestOptions)
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
  .then(result =>{
    if(result.includes("Money added to account!")){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Money added to account!"
      })
      setTimeout(() => {
        location.reload()
      }, 2500);
      
    }else{
      icons="error"
      result="Failed to add money to the account!"
      Swal.fire({        
        icon: icons,
        title: result,
        showConfirmButton: false,
        timer: 2000
      });
    }  

    
  
    
  })
}