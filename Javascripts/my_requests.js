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
          editRequest(item.requestID)
          
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
    console.log(requestID)

}
function deleteRequest(requestID){
    console.log(requestID)
}





