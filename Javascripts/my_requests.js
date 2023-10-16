// Assume this is the response from your backend API

// Function to set a cookie
// function setCookie(name, value, daysToExpire) {
//     const date = new Date();
//     date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
//     const expires = `expires=${date.toUTCString()}`;
//     document.cookie = `${name}=${value}; ${expires}; path=/`;
//   }
  
//   // Usage
//   setCookie('username', 'john_doe', 30); // Save a username cookie with a 30-day expiration
  


const listContainer = document.getElementById("table");
const count = document.getElementById("count");

const listItemTemplate = document.querySelector(".row-hidden");


const createbtn = document.querySelector(".create");
const popup = document.querySelector(".overlay")
var closebtn = document.querySelector('.close');
var overlay = document.querySelector('.body');

const title1 = document.querySelector('.title-input');
const Dis = document.querySelector('.description-input');
const Budget = document.querySelector('.budget-input');
const duration = document.querySelector('.duration-input');
const form = document.getElementById('Form');


createbtn.addEventListener("click",()=>{
  popup.style.display="block"
})
closebtn.addEventListener("click",()=>{
  popup.style.display="none"
})
window.onclick = function(event) {
  if (event.target == overlay) {
    popup.style.display = "none";
  }
}


function handleSubmit(event) {
  event.preventDefault();
  const valtitle = title1.value;
  const valDis = Dis.value;
  const valBudget = Budget.value;
  const valurl = null;
  const valduration = duration.value;
  dataWrite(valtitle,valDis,valduration,valBudget)

  
  popup.style.display = "none";
}
form.addEventListener('submit', handleSubmit);

function dataWrite(valtitle,valDis,valduration,valBudget){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "duration": valduration,
    "budget": valBudget,
    "userID": 2,//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< hardcoded here
    "discription": valDis,
    "sample_work_url": "https://abc.xyz"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };
  
  fetch("http://localhost:15000/enmo_skill_backend_war/request", requestOptions)
    .then(response => response.text())
    .then(result => {alert(result)
      location.reload();})
    .catch(error => console.log('error', error));

}
// createbtn.addEventListener("click",()=> {
//   iframe.style.display="block"
//   var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
//   var bodyElement = iframeDocument.querySelector('body');
//   var closeElement = iframeDocument.querySelector('.close');
//   var SubmitElement = iframeDocument.querySelector('.submit-button');
  

// if (bodyElement) {
//     bodyElement.style.display = 'block'; // Apply your desired styles here
//   }
//   closeElement.addEventListener("click",()=>{
//     bodyElement.style.display = 'none';
//     iframe.style.display="none"
//   })
//   SubmitElement.addEventListener("click",()=>{
//     // bodyElement.style.display = 'none';
//     // iframe.style.display="none"
//   })
  
// })



//window.location.href = "add_buyer_request.html"


var requestOptions = {
  method: 'GET',
  Credential:'include'
};

fetch("http://localhost:15000/enmo_skill_backend_war/request?Role=Client&UserId=002", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    count.innerText=result.count;
    result.data.forEach(item => {
    
        const newItem = listItemTemplate.cloneNode(true);
        
        newItem.querySelector(".edit").addEventListener("click", function() {
          editRequest(item)
          
        });
        newItem.querySelector(".delete").addEventListener("click", function() {
            deleteRequest(item.requestID)
            
          });



        newItem.querySelector(".date").textContent = item.date;
        
        newItem.querySelector(".dis").textContent = item.discription;
        newItem.querySelector(".duration").textContent = item.duration +" Days";
        newItem.querySelector(".budget").textContent = "Rs. "+item.budget;
        
        
        newItem.classList.remove("row-hidden");
        if(item.status==1){
            newItem.classList.add("row"); 
        }else{
            newItem.classList.add("row-disable");
            newItem.querySelector(".panel").innerHTML='<p class="done">Competed <box-icon type=\'solid\'size="17px" name=\'check-circle\'></box-icon></p>' 
        }
        
       
        listContainer.appendChild(newItem);
    })

  })
  .catch(error => console.log('error', error));
    

function editRequest(requestID){
    console.log(item)

}
function deleteRequest(requestID){
    console.log(requestID)
}
