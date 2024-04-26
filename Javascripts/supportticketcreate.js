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

  var perent = document.querySelector(".attachFile")
  var chaild1 = document.querySelector(".order-main1")
  var chaild2 = document.querySelector(".packege-main1")
  var attachFile = document.querySelector(".attachFile")
  var submitbutton = document.getElementById("submitbutton")
  var packages = document.getElementById("packege")
  var orders = document.getElementById("order")
  const loding = document.querySelector(".loading");


// var pValue=null
// var ref_no=null;

const url = new URL(window.location.href);
 var value = url.searchParams.get('value');
 var role = url.searchParams.get('role');
// var ref_no = url.searchParams.get('TicketID');


// if(ref_no != null){
//     loadData(ref_no)
// }

loding.style.display ="none"

if(value=="order"){
    perent.appendChild(chaild1)
    const order = document.querySelector(".order")
    
    // var result = []//tempary array-----------


    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");                          
        myHeaders.append("Authorization", getCookie("JWT")); 
        
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      loding.style.display ="none"
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
          return response.json()
        }
      })
        .then((result) =>{
          console.log(result)
            // Adding a default option
            const defaultOption = { orderId: 0, orderId: 'Select' };
            result.unshift(defaultOption);
            var title=" Order ID: "
            result.forEach(item => {
              
                const option = document.createElement('option');
                option.value = item.orderId;
                option.textContent =title+item.orderId;
                order.appendChild(option);
            });
        })
        .catch((error) => console.error(error));

}else if(value == "packege"){
    perent.appendChild(chaild2)


    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");                          
        myHeaders.append("Authorization", getCookie("JWT")); 
        
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      loding.style.display ="none"
      fetch(BASE_URL+"/package?packageId=0", requestOptions)
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
        .then((result) =>{
          console.log(result)

            // Adding a default option
            const defaultOption = { packageId: 0, title: 'Select a Package' };
            result.unshift(defaultOption);

            result.forEach(item => {
                const option = document.createElement('option');
                option.value = item.packageId;
                option.textContent = item.title;
                packege.appendChild(option);
            });
        })
        .catch((error) => console.error(error));


}
//select values-----------------------------------------------------
var packageID = 0;
var orderID = 0;

if(value=="order"){
  orders.addEventListener("change", () => {
    orderID = orders.value
  })
}else if(value == "packege"){
  packages.addEventListener("change", () => {
    packageID = packages.value
  })
}


//load current data for update page---------------------------------------
// function loadData(ref_no){


//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");                          
//     myHeaders.append("Authorization", getCookie("JWT"));   

//     var raw = JSON.stringify({})

//     var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(ref_no), requestOptions)
//     .then(response => response.json())
//     .then(result => {
//         result.forEach(element => {
//             document.getElementById("subject").value = element.subject;
//             document.getElementById("description").value = element.description;
//         })
//     })
//     .catch(error => console.log('error', error));
        
//         // // const url = new URL(window.location.href);
//         // // const subject = url.searchParams.get('subject');
//         // // const description = url.searchParams.get('description');
//         // // ref_no=url.searchParams.get('ref_no');

//         // console.log(subject)
//         // console.log(description)
//         // console.log(ref_no)

//         // document.getElementById("subject").value = subject;
//         // document.getElementById("description").value = description;
// }

function ticketsubmission(fileURL,packageID,orderID,role){
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");                          
  myHeaders.append("Authorization", getCookie("JWT"));    
  

  var raw = JSON.stringify({
    //"requesterID":userId,
    "description":document.getElementById("description").value,
    "subject":document.getElementById("subject").value,
    "fileURL":fileURL,
    "order": orderID,
    "packages": packageID,
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
    
.then(result => {
  if(result.includes("Data inserted successfully!")){
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
    if(role=="\"Designer\""){
      window.location="../HTML/tikectListDisigner.html";
    }else if(role=="Client"){
      window.location="../HTML/tikectListClient.html"
    }
    
  }, 25000);
    })

  .catch(error => {console.log('error', error);
  });
      
}

//upload file-------------------------------------------------------------------
var fileURL = null
function uploadFile() {
  var fileInput = document.getElementById('attachFile');
  var file = fileInput.files[0];

  var formData = new FormData();
  formData.append('file', file);

  fetch(BASE_URL+'/file', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    // document.getElementById('fileUrl').innerText = 'File URL: ' + data;
    fileURL=data
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// const document.querySelector("")
submitbutton.addEventListener("click",()=>{
 
  if(!document.getElementById("description").value.trim()  || !document.getElementById("subject").value.trim()){
    Swal.fire({        
      icon: "warning",
      title: "No field can be empty",
      showConfirmButton: false,
      timer: 2000
    });
    
  }else{
    const template = document.querySelector('.my-template');
    const swalTitle = template.content.querySelector('swal-title');
    swalTitle.textContent = "Make a ticket?"
    Swal.fire({
      template: "#my-template"
    }).then((result) => {  
      if (result.isConfirmed) {
        console.log(orderID)
        ticketsubmission(fileURL,packageID,orderID,role)
      }    
      
    })
  }
  
})

