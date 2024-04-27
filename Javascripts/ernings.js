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
// const amount = document.querySelector(".amount")
// const orderID = document.querySelector(".order")
// const description = document.querySelector(".description")
const activity = document.querySelector(".activity")
// const date = querySelector(".date")
const parent = document.querySelector(".parent")


loding.style.display ="none"
getdata("/ernings")

Promise.all([
  getdata("/ernings?price=1"),
  getdata("/ernings")
])
.then(([priceInfo, listInfo]) => {
  // Price data
  const obj = priceInfo[0];
  available.textContent = "Rs. " + obj.available;
  being.textContent = "Rs. " + obj.begin;
  active.textContent = "Rs. " + obj.active;
  all.textContent = "Rs. " + obj.all;
  lastAmount.textContent = "Rs. " + obj.lastAmount;

  // List data
  listInfo.forEach(element => {
   
    const newItem = orderBox.cloneNode(true);  
    
    var dateString = element.date;
    var parts = dateString.split(" ");
    var datePart = parts[0];
    newItem.querySelector(".date").textContent = datePart;
    newItem.querySelector(".amount").textContent= element.amount;
    newItem.querySelector(".order").textContent="#"+element.orderId

    if (element.status == 0 || element.status == 1) {
      newItem.querySelector(".description").textContent = "Active";
      newItem.querySelector(".activity1").style.display="inline"
      parent.appendChild(newItem); 
    }else if(element.status == 2){
      newItem.querySelector(".description").textContent = "Deliverd";
      newItem.querySelector(".activity1").style.display="inline"
      parent.appendChild(newItem);
    }else if(element.status == 3){
      newItem.querySelector(".description").textContent = "Comleted";
      newItem.querySelector(".activity2").style.display="inline"
      parent.appendChild(newItem);
    }
  });
});

  function getdata(endpoint){
    var myHeaders = new Headers();                          
    myHeaders.append("Content-Type", "application/json");  
    myHeaders.append("Authorization", getCookie("JWT"));   

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        Credential:'include'
      };

      loding.style.display ="flex"

    return fetch(BASE_URL+endpoint, requestOptions)
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
      
}


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