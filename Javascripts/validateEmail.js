const url = new URL(window.location.href);
const key = url.searchParams.get('key');

var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
var requestOptions = {
    method: 'POST',
    headers: myHeaders
  };
  
  fetch(BASE_URL+"validate?key="+key, requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result)
    
        const text = document.getElementById('text')
        text.textContent = result;
    
    })
    .catch(error => console.log('error', error));