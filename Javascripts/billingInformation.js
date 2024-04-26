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


const fname = document.querySelector(".f-name");
const lname = document.querySelector(".l-name");
const pnumber = document.querySelector(".p-number");
const email = document.querySelector(".email");
const address = document.querySelector(".address");
const city = document.querySelector(".city");
const country = document.querySelector(".country");

const loding = document.querySelector(".loading");
const submit = document.querySelector(".button");
const template = document.querySelector('.my-template');
const swalTitle = template.content.querySelector('swal-title');


loding.style.display ="none"

const url = new URL(window.location.href);
const type = url.searchParams.get('type');
const caombackURL = url.searchParams.get('combackURL')


//get data-------------------------------------------
if(type=="add"){
  getdata('OPTIONS',"/billingInformation?update=1")
  .then(result => {
    result.forEach(item => {
      pnumber.value=item.pNumber;
      email.value=item.email;
      
    })      
  })
}else if(type=="update"){
  getdata('GET',"/billingInformation")
  .then(item => {
    // result.forEach(item => {
      fname.value=item.fname;
      lname.value=item.lname;
      pnumber.value=item.pNumber;
      email.value=item.email;
      address.value=item.address;
      city.value=item.city;
      country.value=item.country;      
    // })      
  })
}

//set data--------------------------------------------------
var method = null
if(type=="add"){
  
    method = "POST"

}else{
  method = "PUT"
}
submit.addEventListener("click",()=>{
  if(!fname.value.trim()  || !lname.value.trim() || !pnumber.value.trim()  || !email.value.trim() || !address.value.trim()  || !city.value.trim() || !country.value.trim()){
    Swal.fire({        
      icon: "warning",
      title: "No field can be empty",
      showConfirmButton: false,
      timer: 2000
    });
  }else if(!isInternationalFormat(pnumber.value)){
    Swal.fire({        
      icon: "warning",
      title: "Phone number must be in international format",
      showConfirmButton: false,
      timer: 2000
    });
  }else if(!isValidEmail(email.value)){
    Swal.fire({        
      icon: "warning",
      title: "Incorrect email format",
      showConfirmButton: false,
      timer: 2000
    });
  }else{
    swalTitle.textContent = "Are the details correct?"
    Swal.fire({
      template: "#my-template"    
    }).then((result) => {  
      if (result.isConfirmed) {
        setdata(method)
      }    
      
    })
  }
})



function getdata(method,endpoint){
  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   
  
  var requestOptions = {
      method: method,
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

function setdata(method){
  var myHeaders = new Headers();                          
  myHeaders.append("Content-Type", "application/json");  
  myHeaders.append("Authorization", getCookie("JWT"));   

  var raw = JSON.stringify({
    
    "fname":fname.value,
    "lname":lname.value,
    "pNumber":pnumber.value,
    "email": email.value,
    "address": address.value,
    "city": city.value,
    "country": country.value
  });
  
  var requestOptions = {
      method: method,
      headers: myHeaders,
      Credential:'include',
      body: raw
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
  }else {
    return response.text()
  }
})
.then(result => {
  if(result.includes("Data update successfully!") || result.includes("Data inserted successfully!")){
    icons="success"
  }else{
    icons="error"
    result="Data insert failed"
  }  
  Swal.fire({        
    icon: icons,
    title: result,
    showConfirmButton: false,
    timer: 2000
  });
  
  setTimeout(() => {
    window.location=caombackURL;
  }, 2500);
    })

  .catch(error => {
    console.log('error', error);
  });
          
}

//check phone number type--------------------------------------
function isInternationalFormat(number) {
  const regex = /^\+[0-9]{7,}$/;
  return regex.test(number);
}
//check email type----------------------------------------------
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
