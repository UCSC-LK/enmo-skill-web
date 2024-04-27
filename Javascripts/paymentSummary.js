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
const fname = document.querySelector(".first_name")
const lname = document.querySelector(".last_name")
const pnumber = document.querySelector(".pnumber")
const email = document.querySelector(".email")
const address = document.querySelector(".address")
const city = document.querySelector(".city")
const country = document.querySelector(".country")
const price = document.querySelector(".price")
const gigTitle = document.querySelector(".gig-title")
const gigType = document.querySelector(".package-type")
const designerName = document.querySelector(".designerName")
const coverImage = document.getElementById('image');
const gigprice = document.querySelector('.t-price');
const webcharge = document.querySelector('.s-price');
const total = document.querySelector('.total-price');


const addressDetails1 = document.querySelector(".address-details-1")
const addressDetails2 = document.querySelector(".address-details-2")
const add = document.querySelector(".add")
const update = document.querySelector(".update")


loding.style.display ="none"

var fetch_1_flag=false
var fetch_2_flag=false

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderID = urlParams.get('orderID')

const comeBackURL = "../HTML/paymentSummary.html"+queryString


//get biliing infor----------------------------------------------------------------------------
var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");  
myHeaders.append("Authorization", getCookie("JWT"));   

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    Credential:'include'
  };

  loding.style.display ="flex"

fetch(BASE_URL+"/billingInformation", requestOptions)
.then(response =>{

  loding.style.display ="none"
  if(response.status == 401){
    window.location.href = "../Failed/401.html";
  }else if(response.status == 406){
    const currentUrl = encodeURIComponent(window.location.href);
    window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
  }else if(response.status == 404){
    window.location.href = "../Failed/404.html";
  }else if(response.status == 429){
    return response.text()
    
  }else {
    return response.json()
  }
})
.then(result => {

  if(result=="No data available"){
    addressDetails2.style.display="inline"
  }else{
    fetch_1_flag=true

    console.log(result)
    addressDetails1.style.display="inline"
    fname.textContent = result.fname;
    lname.textContent = result.lname;
    pnumber.textContent = result.pNumber;
    email.textContent = result.email;
    address.textContent = result.address;
    city.textContent = result.city;
    country.textContent = result.country;

    document.getElementById("first_name").value=result.fname
    document.getElementById("last_name").value=result.lname
    document.getElementById("email").value=result.email
    document.getElementById("phone").value=result.pNumber
    document.getElementById("address").value=result.address
    document.getElementById("city").value=result.city
    document.getElementById("country").value=result.country

  }
  
}).catch(error => {
  console.error('Error:', error);
})


//get order details----------------------------------------------------------------------------
var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");  
myHeaders.append("Authorization", getCookie("JWT"));   

var requestOptions = {
    method: 'OPTIONS',
    headers: myHeaders,
    Credential:'include'
  };

  loding.style.display ="flex"

fetch(BASE_URL+"/payment?orderId="+orderID, requestOptions)
.then(response =>{

  loding.style.display ="none"
  if(response.status == 401){
    window.location.href = "../Failed/401.html";
  }else if(response.status == 406){
    const currentUrl = encodeURIComponent(window.location.href);
    window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
  }else if(response.status == 404){
    // window.location.href = "../Failed/404.html";
  }else {
    return response.json()
  }
})
.then(result => {
  fetch_2_flag=true

  console.log(result)
  gigTitle.textContent=result.title
  gigType.textContent=result.type+" package"
  coverImage.src=result.cover_url
  price.textContent="Rs. "+result.package_price
  total.textContent="Rs. "+result.total_price

  var gigPrice=parseFloat(result.package_price)
  var presentage=parseFloat(result.usercharge)
  var totalPrice=parseFloat(result.total_price)

  var charge=((totalPrice/(presentage+1))*presentage).toFixed(2)
  var package_price=totalPrice-((totalPrice/(presentage+1))*presentage).toFixed(2)

  webcharge.textContent="Rs. "+charge
  gigprice.textContent="Rs. "+package_price

  document.getElementById("order_id").value=orderID
  document.getElementById("amount").value=result.total_price
  document.getElementById("itemd").value=result.title
  document.getElementById("hashInput").value=result.hash

}).catch(error => {
  console.error('Error:', error);
})

update.addEventListener("click",()=>{
  window.location.href = "../HTML/billingInformation.html?type=update&combackURL="+encodeURIComponent(comeBackURL)
})

add.addEventListener("click",()=>{
  window.location.href = "../HTML/billingInformation.html?type=add&combackURL="+encodeURIComponent(comeBackURL)
})

document.querySelector(".place-order-btn").addEventListener("click",()=>{
  if(fetch_1_flag && fetch_2_flag){
    document.getElementById('payhereForm').submit();
  }else{

    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops!",
      text:"We're fixing the issue. Page will reload automatically.",
      showConfirmButton: false,
      timer: 2000
    })
    .then(() => {
      location.reload()
    });
    
  }
})


  