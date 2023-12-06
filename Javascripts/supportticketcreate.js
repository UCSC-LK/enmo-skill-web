document.addEventListener("DOMContentLoaded", loadData);
let ref_no=null;
function loadData(){
    const url = new URL(window.location.href);
    const subject = url.searchParams.get('subject');
    const description_value = url.searchParams.get('description');
    ref_no=url.searchParams.get('ref_no');

    document.getElementById("subject").value = subject;
    document.getElementById("description").value = description_value;
}
function ticketsubmission(){
    if(ref_no==null){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw2 = JSON.stringify({
            "requesterID":"1",//<<<<<<<<<<<<<< hardcoded here
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
