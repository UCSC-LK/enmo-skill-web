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

var role = 0;
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

// document.getElementById("row1").addEventListener("click", function(){
//     on()
// })

document.getElementById("overlay").addEventListener("click", function(){
    off()
})

function closePopup() {
  document.getElementById("overlay").style.display = "none";
}

document.getElementById("overlay").addEventListener("click", closePopup);

document.addEventListener("DOMContentLoaded", getActiveUsers)
// var designer_list = [
//     {
//       "userID": 1,
//       "username": "user1",
//       "name": "John Doe",
//       "NIC_passport_driving_license": "ABC123456",
//       "email": "john.doe@example.com",
//       "contact_no": "123-456-7890",
//       "joined_Date": "2023-10-29",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      
//     },
//     {
//       "userID": 2,
//       "username": "user2",
//       "name": "Jane Smith",
//       "NIC_passport_driving_license": "XYZ789012",
//       "email": "jane.smith@example.com",
//       "contact_no": "987-654-3210",
//       "joined_Date": "2023-10-29",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      
//     },
//     {
//       "userID": 3,
//       "username": "user3",
//       "name": "Alice Johnson",
//       "NIC_passport_driving_license": "DEF345678",
//       "email": "alice.johnson@example.com",
//       "contact_no": "555-123-4567",
//       "joined_Date": "2023-10-28",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      
//     },
//     {
//       "userID": 4,
//       "username": "user4",
//       "name": "Bob Wilson",
//       "NIC_passport_driving_license": "GHI901234",
//       "email": "bob.wilson@example.com",
//       "contact_no": "777-888-9999",
//       "joined_Date": "2023-10-28",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
     
      
//     },
//     {
//       "userID": 5,
//       "username": "user5",
//       "name": "Eve Brown",
//       "NIC_passport_driving_license": "JKL567890",
//       "email": "eve.brown@example.com",
//       "contact_no": "111-222-3333",
//       "joined_Date": "2023-10-27",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      
      
//     }
//   ]
  
  
  
//   document.addEventListener("DOMContentLoaded", loadContent)
  
//   function loadContent(){
//     var content = document.getElementById("content");
//     content.innerHTML = ""
//     designer_list.forEach(element => {
  
//       var row = document.createElement("div")
//       var p_id = document.createElement("p")
//       var p_username= document.createElement("p")
//       var p_name = document.createElement("p")
//       var p_email= document.createElement("p")
  
//       // set values
//       p_id.innerHTML = element.userID;
//       p_username.innerHTML = element.username;
//       p_name.innerHTML = element.name;
//       p_email.innerHTML = element.email;
  
//       // setting attributes
//       row.setAttribute("class", "row")
//       p_id.setAttribute("class", "id")
//       p_username.setAttribute("class", "username")
//       p_name.setAttribute("class", "name")
//       p_email.setAttribute("class", "email")
  
//       row.addEventListener("click", function () {
//         popup(element);
//       });
  
//       // append elements
//       row.appendChild(p_id)
//       row.appendChild(p_username)
//       row.appendChild(p_name)
//       row.appendChild(p_email)
  
//       content.appendChild(row)
  
  
//     });
//   }
  
//   // create popup
//   function popup(dataset){
//     createPopup(dataset)
//     document.getElementById("overlay").style.display = "block";
//   }
   
//   function createPopup(dataset){
  
//     var overlay = document.getElementById("overlay");
    
//     var main = document.createElement("div");
//     var body = document.createElement("div")
//     var header = document.createElement("div");
//     var img = document.createElement("img");
//     var p_username = document.createElement("p");
//     var span = document.createElement("span");
//     var close = document.createElement("p");
  
//     var l_nic = document.createElement("label");
//     var l_mail = document.createElement("label");
//     var l_name = document.createElement("label");
//     var l_phone = document.createElement("label");
//     var l_joined_date = document.createElement("label");
//     var l_description = document.createElement("label");
  
//     var lables = [l_nic, l_mail, l_name, l_phone, l_joined_date, l_description];
  
//     var p_nic = document.createElement("p");
//     var p_mail = document.createElement("p");
//     var p_name = document.createElement("p");
//     var p_phone = document.createElement("p");
//     var p_joined_date = document.createElement("p");
//     var p_description = document.createElement("p");
  
//     var data = [p_nic, p_mail, p_name, p_phone, p_joined_date, p_description];
    
//     //create header
//     img.className = "image-profile"
//     img.src = "https://i.ibb.co/Ry2J1Lg/pexels-photo-220453.webp";
//     p_username.setAttribute("class", "username-top");
//     span.className = "name-user";
//     close.className = "close-top";
//     header.className = "header-view";
//     main.className = "main-view";
  
//     p_username.innerHTML = dataset.username + " - ";
//     span.innerHTML = dataset.name;
//     close.innerHTML = "X";
  
//     p_username.appendChild(span);
//     header.appendChild(img);
//     header.appendChild(p_username);
//     header.appendChild(close);
//     main.appendChild(header);
  
//     //create body
//     var label_list = ["NIC/Passport/Driving licence", "Email", "Name", "Contact no", "Joined Date", "Description"];
  
//     body.className = "contain-bottom";
  
//     for (let i = 0; i < label_list.length; i++) {
//       lables[i].className = "tl";
//       data[i].className = "data";
  
//       lables[i].innerHTML = label_list[i];
      
//     }
  
//     p_nic.innerHTML = dataset.NIC_passport_driving_license;
//     p_mail.innerHTML = dataset.email;
//     p_name.innerHTML = dataset.name;
//     p_phone.innerHTML = dataset.contact_no;
//     p_joined_date.innerHTML = dataset.joined_Date;
//     p_description.innerHTML = dataset.description;
  
//     for (let i = 0; i < label_list.length; i++) {
//       body.appendChild(lables[i]);
//       body.appendChild(data[i]);
//     }
  
//     main.appendChild(body)
  
//     overlay.appendChild(main)
  
//     // overlay.style.display = "block"
  
//   }
  

  
  function getActiveUsers(){
    console.log("in active users");
    role = 2
    status_code = 1
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

  // document.getElementById("search-user").addEventListener("click", function(e){
  //   e.preventDefault();

  //   var userId = document.getElementById("byid").value;

  //   if (userId != null) {
  //   console.log(userId);

  //     fetch(`${BASE_URL}/user?userId=${userId}`,{
  //       method: 'GET',
  //       headers: myHeaders
  //     })
  //     .then((response)=>{
  //       if(!response.ok){
  //         throw new Error("Error occured")
  //       } 
  //       return response.json();
  //     })
  //     .then((data)=>{
  //       createRows(data);
  //     })
  //     .catch((error)=>{
  //        console.error(error)
  //        Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Something went wrong!"
  //       });
  //      })
  //   }

    
  // })

  document.getElementById("search-user").addEventListener("click", function(e){
    e.preventDefault();

    search_active = true;

    active_u.classList.remove("active");
    banned_u.classList.remove("active");
    
    var userId = document.getElementById("byid").value;

    if (userId.trim() !== "") { // Check if userId is not empty
        console.log(userId);

        fetch(`${BASE_URL}/user?userId=${userId}`, {
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
