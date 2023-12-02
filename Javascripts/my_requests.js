

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
console.log("iD: " + getCookie("User_ID"));


let flagCreate=false;
let flagUpdate=false;
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
const form2 = document.getElementById('Form');
const submitbtn = document.querySelector('.submit-button');



createbtn.addEventListener("click",(event)=>{
  flagCreate =true;
  submitbtn.innerText = "Create Request";
  title1.value=""
  Dis.value=""
  Budget.value=""
  duration.value=""

  popup.style.display="block"

  closebtn.addEventListener("click",()=>{
    popup.style.display="none"
    return;
  })
  
  
  //create request start here
  
  function handleSubmit(event) {
    if(!flagCreate){return}
    flagCreate=false;
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
    
    var raw2 = JSON.stringify({
      "title":valtitle,
      "duration": valduration,
      "budget": valBudget,
      "userID": getCookie("USer_Id"),
      "discription": valDis,
      "sample_work_url": "https://abc.xyz"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw2
    };
    
    fetch(BASE_URL+"/request", requestOptions)
      .then(response => response.text())
      .then(result => {alert(result);
        location.reload();})
      .catch(error => {console.log('error', error);
                      });
    
  }


})







//creating list start here

var requestOptions = {
  method: 'GET',
  Credential:'include'
};

fetch(BASE_URL+"/request?Role=Client&UserId=28", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    count.innerText=result.count;
    result.data.forEach(item => {
    
        const newItem = listItemTemplate.cloneNode(true);
        newItem.addEventListener("click",(event )=>{
          event.stopPropagation();
          viewrequest(item) 
         
        })
        newItem.querySelector(".edit").addEventListener("click", function(event ) {
          event.stopPropagation();
          editRequest(item)
          
        });
        newItem.querySelector(".delete").addEventListener("click", function(event ) {
          event.stopPropagation();
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
  const popupview = document.querySelector('.overlay-view');
  const titleview = document.querySelector('.tl');
  const closetn = document.querySelector('.close-top');
  const username = document.querySelector('.name-user');
  const userurl = document.querySelector('.image-profile');
  const Discriptionview = document.querySelector('.description');
  const Budgetview = document.querySelector('.budget-text');
  const durationview = document.querySelector('.description-text');

  
function viewrequest(item){
  popupview.style.display="flex";
  closetn.addEventListener("click", ()=> {
  popupview.style.display="none"
  })
  titleview.innerHTML=item.title
  username.innerHTML=item.username;
  // userurl
  Discriptionview.innerHTML=item.discription
  Budgetview.innerHTML=item.budget;
  durationview.innerHTML=item.duration;


}

//delete request start here

function deleteRequest(requestID){
  if(confirm('Are you sure you want Delete this request?')){

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch(BASE_URL+"/request?requestID="+requestID, requestOptions)
      .then(response => response.text())
      .then(result => {alert(result)
        location.reload();})
      .catch(error => console.log('error', error));
  }
}

window.onclick = function(event) {

  if (event.target == overlay) {
    popup.style.display = "none";
  }
  if(event.target==popupview){
    popupview.style.display="none"
  }
}


//this is updating request

function editRequest(item){
  flagUpdate=true
  popup.style.display="block"
  submitbtn.innerText = "Update Request";
  closebtn.addEventListener("click",()=>{
    popup.style.display="none"
  })
  
title1.value=item.title;
Dis.value=item.discription;
Budget.value=item.budget;
duration.value=item.duration;
  
  function handleupdateSubmit(event) {
    if(!flagUpdate)return;
    flagUpdate=false;
    event.preventDefault();
    const valuetitle = title1.value;
    const valueDis = Dis.value;
    const valueBudget = Budget.value;
    const valueurl = null;
    const valueduration = duration.value;
    dataupdate(valuetitle,valueDis,valueduration,valueBudget)
  
    
    popup.style.display = "none";
  }
  form2.addEventListener('submit', handleupdateSubmit);
  
  function dataupdate(valtitle,valDis,valduration,valBudget){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "title":valtitle,
      "duration": valduration,
      "budget": valBudget,
      "requestID": item.requestID,
      "discription": valDis,
      "sample_work_url": "https://abc.xyz"
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw
    };
    
    fetch(BASE_URL+"/request", requestOptions)
      .then(response => response.text())
      .then(result => {alert(result)
        location.reload();})
      .catch(error => console.log('error', error));
  
  }



}