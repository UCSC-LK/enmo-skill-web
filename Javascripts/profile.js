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
// var userId = getCookie("User_ID");

const loding = document.querySelector(".loading");

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
  fetch(BASE_URL+"/profile", requestOptions)
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
       
        document.querySelector(".display-name").textContent = result.display_name;
        document.querySelector(".description").textContent = result.description;

          
          var languagesContainer = document.querySelector(".languages");
          var skillsContainer = document.querySelector(".skills");      

          setArray(languagesContainer,result.language);// set languages-------------
          setArray(skillsContainer,result.skills);     //set skills------------------
        
      })
    .catch(error => console.log('error', error));


    function setArray(className,list){

      className.innerHTML = ""; // Clear previous content

      list.forEach(lang => {
        var Element = document.createElement("li");
        Element.textContent = lang;
        className.appendChild(Element);
      });
    }


function editProfile(){
  var parameterValue = "edite";
  var newURL = "../HTML/profileEdit.html?paramName=" + encodeURIComponent(parameterValue);

  window.location = newURL;
}


const imgElement = document.querySelector('.profile-pic');

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", getCookie("JWT"));    

var requestOptions = {
  method: 'OPTIONS',
  headers: myHeaders,
  redirect: 'follow'
};
loding.style.display ="flex"
fetch(BASE_URL+"/profile", requestOptions)
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
    imgElement.src=result.url;

  })
  .catch(error => console.log('error', error));





