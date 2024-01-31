var userId = 69;

// function getCookie(cookieName) {
//     var name = cookieName + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var cookieArray = decodedCookie.split(';');
  
//     for(var i = 0; i < cookieArray.length; i++) {
//         var cookie = cookieArray[i].trim();
//         if (cookie.indexOf(name) == 0) {
//             return cookie.substring(name.length, cookie.length);
//         }
//     }
//     return null;
//   }
// var userId = getCookie("User_ID");


// var pValue=null
var ref_no=null;

const url = new URL(window.location.href);
// var pValue = url.searchParams.get('pValue');
var ref_no = url.searchParams.get('TicketID');

if(ref_no != null){
    loadData()
}


//load current data for update page---------------------------------------
function loadData(){

    console.log("01")

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://localhost:15000/enmo_skill_backend_war/support?Role=Client&UserId="+encodeURIComponent(userId)+"&TicketId="+encodeURIComponent(ref_no), requestOptions)
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

        document.getElementById("subject").value = subject;
        document.getElementById("description").value = description;
}

function ticketsubmission(){
    if(ref_no==null){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw2 = JSON.stringify({
            "requesterID":userId,
            "description":document.getElementById("description").value,
            "subject":document.getElementById("subject").value
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw2
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
