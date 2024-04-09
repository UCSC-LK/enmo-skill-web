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

var submitbutton = document.getElementById("submitbutton")
const loding = document.querySelector(".loading");

loding.style.display ="none"


submitbutton.addEventListener("click",()=>{

    const template = document.querySelector('.my-template');
    const swalTitle = template.content.querySelector('swal-title');
    swalTitle.textContent = "Make a ticket?"
    Swal.fire({
        template: "#my-template"
      }).then((result) => {
        ticketsubmission()
      })
})

function ticketsubmission(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");                          
    myHeaders.append("Authorization", getCookie("JWT"));    


    var raw = JSON.stringify({
        "description":document.getElementById("description").value,
        "subject":document.getElementById("subject").value,
        "complainantID":document.getElementById("Complainant").value,       
    });


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    loding.style.display ="flex"
    fetch(BASE_URL+"/support", requestOptions)
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
        
    .then(result => {var icons=null
        if(result.includes("Data inserted successfully!")){
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
    .catch(error => {console.log('error', error);
    });
    
}