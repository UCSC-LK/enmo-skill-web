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
const coverImage = document.querySelector('.gig-image1');
const gprice = document.querySelector('.t-price');
const webcharge = document.querySelector('.s-price');
const total = document.querySelector('.total-price');


const addressDetails1 = document.querySelector(".address-details-1")
const addressDetails2 = document.querySelector(".address-details-2")
const add = document.querySelector(".add")
const update = document.querySelector(".update")


loding.style.display ="none"

var packageId = 85259
// 
Promise.all([
  getdata("/billingInformation"),
  getdata("/packageview?packageId="+packageId),
  getdata("/orderTprice?packegeID="+packageId)
])
.then(([billingInfo, packageDetails,priceDetails]) => {
  // Handle billing information
  console.log(billingInfo);
  if (Array.isArray(billingInfo) && billingInfo.length === 0) {
    addressDetails1.style.display = "none";
    addressDetails2.style.display = "inline";
  } else {
    const obj = billingInfo[0];

    fname.textContent = obj.fname;
    lname.textContent = obj.lname;
    pnumber.textContent = obj.pNumber;
    email.textContent = obj.email;
    address.textContent = obj.address;
    city.textContent = obj.city;
    country.textContent = obj.country;
  }

  // Handle package details
  console.log(packageDetails);
    designerName.textContent = packageDetails.profileModel.display_name;
    gigTitle.textContent = packageDetails.packageModel.title;
    price.textContent = "Rs. "+packageDetails.pricings[0].price;
    gigType.textContent = packageDetails.pricings[0].type+" packege";

    const coverUrl = packageDetails.packageModel.coverUrl;
    const imageElement = document.createElement('img');
    imageElement.src = coverUrl;
    imageElement.width = '200';
    coverImage.appendChild(imageElement);
  // }

   // Handle price details
   const obj1 = priceDetails[0];
   gprice.textContent = "Rs. "+obj1.packegePrice;
   webcharge.textContent = "Rs. "+obj1.siteChage;
   total.textContent = "Rs. "+obj1.total;

})
.catch(error => {
  console.error('Error:', error);
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
    // .then(result => {
    //     return result
    // })
}

update.addEventListener("click",()=>{
  window.location.href = "../HTML/billingInformation.html?type=update"
})

add.addEventListener("click",()=>{
  window.location.href = "../HTML/billingInformation.html?type=add"
})


  