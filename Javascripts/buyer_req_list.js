

const listContainer = document.getElementById("table");
const count = document.getElementById("count");

const listItemTemplate = document.querySelector(".row-hidden");


var requestOptions = {
  method: 'GET',
  Credential:'include',
};

fetch(BASE_URL+"/request?Role=Designer", requestOptions)
  .then(response => response.json())
  .then(result => {
    count.innerText=result.length;
    result.forEach(item => {
    
        const newItem = listItemTemplate.cloneNode(true);
        
      //   newItem.querySelector(".user").addEventListener("click", function() {
      //     console.log("Clicked username: " + item.username);
      // });

        newItem.querySelector(".date").textContent = item.date;
        newItem.querySelector(".user").textContent = item.username;
        newItem.querySelector(".dis").textContent = item.discription;
        newItem.querySelector(".duration").textContent = item.duration +" Days";
        newItem.querySelector(".budget").textContent = "Rs. "+item.budget;
        newItem.addEventListener("click",()=>{
          viewrequest(item);
        })
        
        newItem.classList.remove("row-hidden");
        newItem.classList.add("row"); 
       
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
  const btn = document.querySelector('.proposal');
  btn.addEventListener("click",()=>{
    window.location.href = "../HTML/proposal_add.html"
  })
  
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







