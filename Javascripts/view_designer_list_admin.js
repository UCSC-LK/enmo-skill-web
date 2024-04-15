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
// console.log("iD: " + getCookie("User_ID"));

const UserId = getCookie("User_ID");

var myHeaders = new Headers();                          ///important
myHeaders.append("Content-Type", "application/json");   ///important
myHeaders.append("Authorization", getCookie("JWT"));    ///important

var raw = JSON.stringify({});

var role = 2;
var status_code = 0
var search_active = false

var active_u = document.getElementById("active_u")
var banned_u = document.getElementById("banned_u")

function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }


document.getElementById("overlay").addEventListener("click", function(){
    off()
})

function closePopup() {
  document.getElementById("overlay").style.display = "none";
}

document.getElementById("overlay").addEventListener("click", closePopup);

document.addEventListener("DOMContentLoaded", getActiveUsers)
  
  function getActiveUsers(){

    console.log("in active users");
    role = 2
    status_code = 1

    document.getElementById("byid").value = "";

    fetch(`${BASE_URL}/user?role=${role}&status=${status_code}`,{
      method: 'GET',
      headers: myHeaders
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Error occured")
      } 
      return response.json();
    })
    .then((data)=>{
      createRows(data);
    })
    .catch((error)=>{
       console.error(error)
       Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
     })
  }
  
  function getBannedUsers(){

    console.log("in banned users");
    role = 2
    status_code = 2

    document.getElementById("byid").value = "";
    
    fetch(`${BASE_URL}/user?role=${role}&status=${status_code}`,{
      method: 'GET',
      headers: myHeaders
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Error occured")
      } 
      return response.json();
    })
    .then((data)=>{
      createRows(data);
    })
    .catch((error)=>{
       console.error(error)
       Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
     })
  }

  function createRows(data){

    var content = document.getElementById("content");
    content.innerHTML = ""

    data.forEach(element => {

      // Create elements
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    rowDiv.id = 'row1';

    const idP = document.createElement('p');
    idP.className = 'id';
    idP.textContent = element.user.id;

    const usernameP = document.createElement('p');
    usernameP.classList.add('username');
    // usernameP.classList.add('truncate-text');
    usernameP.textContent = element.user.username;

    const nameP = document.createElement('p');
    nameP.classList.add('name');
    nameP.classList.add('truncate-text');
    nameP.textContent = element.fname + " "+ element.lname;

    const emailP = document.createElement('p');
    emailP.classList.add('email');
    emailP.classList.add('truncate-text');
    emailP.textContent = element.user.email;

    const seeMoreDiv = document.createElement('div');
    seeMoreDiv.className = 'see-more-btn';

    const seeMoreBtn = document.createElement('button');
    seeMoreBtn.className = 'see-more';
    seeMoreBtn.textContent = 'See more';
    seeMoreBtn.addEventListener('click', function(event){
      event.stopPropagation();
      popup(element);
    });

    // Append elements
    seeMoreDiv.appendChild(seeMoreBtn);

    rowDiv.appendChild(idP);
    rowDiv.appendChild(usernameP);
    rowDiv.appendChild(nameP);
    rowDiv.appendChild(emailP);
    rowDiv.appendChild(seeMoreDiv);

    content.appendChild(rowDiv);
    });
    

  }
  function createRowsSingle(element){

    var content = document.getElementById("content");
    content.innerHTML = ""


      // Create elements
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    rowDiv.id = 'row1';

    const idP = document.createElement('p');
    idP.className = 'id';
    idP.textContent = element.user.id;

    const usernameP = document.createElement('p');
    usernameP.classList.add('username');
    // usernameP.classList.add('truncate-text');
    usernameP.textContent = element.user.username;

    const nameP = document.createElement('p');
    nameP.classList.add('name');
    nameP.classList.add('truncate-text');
    nameP.textContent = element.fname + " "+ element.lname;

    const emailP = document.createElement('p');
    emailP.classList.add('email');
    emailP.classList.add('truncate-text');
    emailP.textContent = element.user.email;

    const seeMoreDiv = document.createElement('div');
    seeMoreDiv.className = 'see-more-btn';

    const seeMoreBtn = document.createElement('button');
    seeMoreBtn.className = 'see-more';
    seeMoreBtn.textContent = 'See more';
    seeMoreBtn.addEventListener('click', function(event){
      event.stopPropagation();
      popup(element);
    });

    // Append elements
    seeMoreDiv.appendChild(seeMoreBtn);

    rowDiv.appendChild(idP);
    rowDiv.appendChild(usernameP);
    rowDiv.appendChild(nameP);
    rowDiv.appendChild(emailP);
    rowDiv.appendChild(seeMoreDiv);

    content.appendChild(rowDiv);
  
    

  }

  function popup(data){

    console.log(data.user.id);
    on();

    document.getElementById("designer-img").src = data.user.url || "https://i.ibb.co/Ry2J1Lg/pexels-photo-220453.webp"
    document.getElementById("data-name").textContent = data.fname + " "+ data.lname;
    document.getElementById("data-displayname").textContent = data.user.username;
    document.getElementById("data-email").textContent = data.user.email;
    document.getElementById("data-contact").textContent = data.user.contact_no;
    document.getElementById("data-joined").textContent = data.joinedDate;
    document.getElementById("data-des").innerHTML = data.user.description || "lorem impsum"
    document.getElementById("data-nic").textContent = data.user.NIC;

  }

 active_u.addEventListener("click", function(e) {
    e.preventDefault();

    active_u.classList.add("active");
    banned_u.classList.remove("active");
    if (status_code == 2 || search_active == true) {
        search_active = false;
        getActiveUsers();
    }
  })

  document.getElementById("banned_u").addEventListener("click", function(e){
    e.preventDefault();
    active_u.classList.remove("active");
    banned_u.classList.add("active");
    if (status_code == 1 || search_active == true) {
      search_active = false;
      getBannedUsers();
    }
  })

  document.getElementById("search-user").addEventListener("click", function(e){
    e.preventDefault();

    search_active = true;

    active_u.classList.remove("active");
    banned_u.classList.remove("active");
    
    var userId = document.getElementById("byid").value;

    if (userId.trim() !== "") { // Check if userId is not empty
        console.log(userId);

        fetch(`${BASE_URL}/user?userId=${userId}&role=${role}`, {
            method: 'GET',
            headers: myHeaders
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error occurred");
            } 
            return response.json();
        })
        .then((data) => {
            createRowsSingle(data);
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        });
    } else {
        // Handle case where userId is empty
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please enter a User ID!"
        });
    }
});
