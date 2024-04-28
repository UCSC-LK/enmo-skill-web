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

loding.style.display ="none"

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const orderID = urlParams.get('order_id')

const orderID = 38
console.log(orderID)

  document.querySelector(".back").addEventListener("click",()=>{
    window.location.href = "../HTML/orderlist_client.html";
  })

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
    window.location.href = "../Failed/404.html";
  }else {
    return response.json()
  }
})
.then(result =>{
    console.log(result)

    document.getElementById("orderID").textContent="#"+result.orderId
    document.getElementById("title").textContent=result.title
    document.getElementById("price").textContent="Rs. "+result.total_price
    
    confetti({
        particleCount: 500,
        spread: 150,
        origin: { y: 0.9 },
      });
})