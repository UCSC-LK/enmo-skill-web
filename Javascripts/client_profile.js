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

const loding = document.querySelector(".loading");
  

let tags = document.querySelectorAll("p")
let boxes  = document.querySelectorAll(".detail-box")

tags.forEach(x => x.style.display='none')
// boxes.forEach(x => x.style.border="none")

const prfPic = document.querySelector('.prf_pic');
const fileInput = document.getElementById('fileInput');
let file = null;




const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",getCookie("JWT") );



const requestOptions = {
  method: "GET",
  headers: myHeaders,
};
function getdata(){
    fetch(BASE_URL+"/user", requestOptions)
    .then((response) => 
    {if(response.status == 401){
      window.location.href = "../Failed/401.html";
    }else if(response.status == 406){
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
    }else if(response.status == 404){
      window.location.href = "../Failed/404.html";
    }else if(response.status == 200) {
      // boxes.forEach(x => x.classList.remove("gradient"))
      tags.forEach(x => x.style.display='flex')
      return response.json()
    }
    else{
      console.log("Error"+response.status)
      }
    })
    .then((result) =>{ console.log(result)
      if(result.username!=null){
          document.querySelector(".uname").textContent = result.username;
      }
      if(result.url!="null"&&result.url!=null){
          document.querySelector(".prf_pic").src = result.url;
      }
      if(result.email!=null){
          document.querySelector(".email").textContent = ": "+result.email;
          document.querySelector(".email-box").classList.remove("gradient")
      }
      if(result.contact_no!=null&&result.contact_no!=""){
          document.querySelector(".cn").textContent = ": "+result.contact_no;
          document.querySelector(".cn-box").classList.remove("gradient")
      }
      if(result.country!=null){
          document.querySelector(".cou").textContent = ": "+result.country;
          document.querySelector(".cou-box").classList.remove("gradient")
      }
      if(result.name!=null&&result.name!=""){
          document.querySelector(".fname").textContent = ": "+result.name;
          document.querySelector(".fname-box").classList.remove("gradient")
      }
      
      if(result.joinedDate!=null){
          document.querySelector(".jd").textContent = ": "+result.joinedDate;
          document.querySelector(".jd-box").classList.remove("gradient")
      }
      
  
  })
    .catch((error) => console.error(error));
}
getdata()



  document.querySelector(".edit-button").addEventListener("click",()=>{
    document.querySelector(".view").style.display="none"
    document.querySelector(".edit").style.display="block"
    //add input feild text
// remove first two characters from the text content


    document.querySelector(".cn-in").value=document.querySelector(".cn").textContent.slice(2)
    document.querySelector(".name-in").value=document.querySelector(".fname").textContent.slice(2)
    

  })

  document.querySelector(".done-button").addEventListener("click",()=>{
    
    loding.style.display ="flex"
    const myHeaders = new Headers();
    myHeaders.append("endpoint", "profile_pics");
    let RequestData = new FormData();
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch(BASE_URL+'/file', {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            RequestData={"url":data}
            Sendreq(RequestData)

        })
        .catch(error => {
            console.error('Error:', error);
        });
    } 
    else{
        RequestData={"url":document.querySelector(".prf_pic").src}
        Sendreq(RequestData)
    }





  })

  function Sendreq(RequestData){
    
   

    RequestData={...RequestData,"contact_no":document.querySelector(".cn-in").value,"name":document.querySelector(".name-in").value}
    const jsonreq = JSON.stringify(RequestData)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", getCookie("JWT"));

    
    const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: jsonreq
    };

    fetch(BASE_URL+"/user", requestOptions)
    .then((response) => 
  {loding.style.display ="none"
    if(response.status == 401){
    window.location.href = "../Failed/401.html";
  }else if(response.status == 406){
    const currentUrl = encodeURIComponent(window.location.href);
    window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
  }else if(response.status == 404){
    window.location.href = "../Failed/404.html";
  }else if(response.status == 201) {
    return response.text()
  }
  else{
    console.log("Error"+response.status)
    }
}).then(result => {console.log(result)
            window.location.reload();
            
        })
    .catch((error) => console.error(error));

  }

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            prfPic.src = e.target.result;
        }

        reader.readAsDataURL(file);
    }
});


const overlay = document.querySelector(".container");
window.onclick = function(event) {

    if (event.target == overlay) {
      window.history.back()
    }
    
  }