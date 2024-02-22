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


// var pValue=null
var ref_no=null;

const url = new URL(window.location.href);
 var value = url.searchParams.get('value');
var ref_no = url.searchParams.get('TicketID');

console.log(value)

if(ref_no != null){
    loadData(ref_no)
}

if(value=="order"){
    perent.appendChild(chaild1)
    const order = document.querySelector(".order")
    
    var result = []//tempary array-----------

    //fetch------------------
    // Adding a default option
    const defaultOption = { order_id: 0, title: 'Select an Order' };
    result.unshift(defaultOption);

    result.forEach(item => {
        const option = document.createElement('option');
        option.value = item.order_id;
        option.textContent = item.title;
        order.appendChild(option);
      });
}else if(value == "packege"){
    perent.appendChild(chaild2)

    const packege = document.querySelector(".packege")

    var result = []//tempary array-----------
    //fetch------------------

    // Adding a default option
    const defaultOption = { package_id: 0, title: 'Select a Package' };
    result.unshift(defaultOption);

    result.forEach(item => {
        const option = document.createElement('option');
        option.value = item.package_id;
        option.textContent = item.title;
        packege.appendChild(option);
    });

}


//load current data for update page---------------------------------------
function loadData(ref_no){


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");                          
    myHeaders.append("Authorization", getCookie("JWT"));   

    var raw = JSON.stringify({})

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(BASE_URL+"/support?TicketId="+encodeURIComponent(ref_no), requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            document.getElementById("subject").value = element.subject;
            document.getElementById("description").value = element.description;
        })
    })
    .catch(error => console.log('error', error));
        
        // // const url = new URL(window.location.href);
        // // const subject = url.searchParams.get('subject');
        // // const description = url.searchParams.get('description');
        // // ref_no=url.searchParams.get('ref_no');

        // console.log(subject)
        // console.log(description)
        // console.log(ref_no)

        // document.getElementById("subject").value = subject;
        // document.getElementById("description").value = description;
}

function ticketsubmission(){
    if(ref_no==null){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");                          
        myHeaders.append("Authorization", getCookie("JWT"));   

    
        var raw = JSON.stringify({
            //"requesterID":userId,
            "description":document.getElementById("description").value,
            "subject":document.getElementById("subject").value
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
        };
        
        fetch(BASE_URL+"/support", requestOptions)
        .then(response => response.text())
        .then(result => {alert(result);
            window.location="../HTML/tikectListDisigner.html"})
        .catch(error => {console.log('error', error);
                        });
        
    }else{

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", getCookie("JWT")); 
        
        var raw = JSON.stringify({
            "ref_no":ref_no,
            "description":document.getElementById("description").value,
            "subject":document.getElementById("subject").value
        });
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw
        };
        
        fetch(BASE_URL+"/support", requestOptions)
          .then(response => response.text())
          .then(result => {alert(result)
            window.location="../HTML/tikectListDisigner.html"})
          .catch(error => console.log('error', error));
      
    
    }
}

