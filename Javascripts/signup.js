const loding = document.querySelector(".loading");
const overlay = document.querySelector(".signup-main");
const additionalFieldsContainer = document.getElementById("additional-fields");
let flag_next = true
let formData
document.querySelector(".submit").value = "Next";
window.onclick = function(event) {

  if (event.target == overlay) {
    window.history.back()
  }
  
}
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
  }
});

loding.style.display ="none"

document
  .getElementById("form-layout")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    
    const messageDiv = document.getElementById("messageDiv");
    document.querySelector(".submit").value = "Signup";
    if (!flag_next) {
      
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const name= firstName + " " + lastName
      formData = { ...formData, name, country };

      const jsonData = JSON.stringify(formData);

      console.log(jsonData);
    loding.style.display ="flex"
    // Make a fetch request
    fetch(BASE_URL+"/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        loding.style.display ="none"
        if (response.status === 200) {
          window.location = "../HTML/emailValidationsend.html"+'?email='+encodeURIComponent(formData.email);
          // messageDiv.innerHTML = "Registration successful ";
        } else if (response.status === 400) {
          // Unauthorized login (status code 401), display an error message
          //console.error("Error:", response.text().then((text) => console.log(text)));
          response.text().then((text) => {messageDiv.innerHTML =  text});
          Toast.fire({
            icon: "error",
            title: "Uername already exists!",
          });
        }else if (response.status === 406) {
          // Unauthorized login (status code 401), display an error message
          //console.error("Error:", response.text().then((text) => console.log(text)));
          response.text().then((text) => {messageDiv.innerHTML =  text});
          Toast.fire({
            icon: "error",
            title: "Password must be greater than 8 characters!",
          });
        } else {
          // Handle other status codes or errors
          console.error("Error:", response.status);
          response.text().then((text) => {messageDiv.innerHTML =  text});
          Toast.fire({
            icon: "error",
            title: "An error occurred! Code: "+response.status,
          });
          
        
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        Toast.fire({
          icon: "error",
          title: "An error occurred!",
        });
        console.error("An error occurred:", error);
      });


  }else{
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const username = document.getElementById("username").value;
      formData = { email, password ,username};
  }

  if(flag_next){
  addAdditionalFields();
  populateCountries();
  }
    

    
  });


  function Logi(){
    window.location.href = "../HTML/login.html"
  }
  



  const form = document.getElementById("form-layout");

// Function to dynamically add first name and last name fields
function addAdditionalFields() {
    additionalFieldsContainer.innerHTML = `
        <label class="input-label" for="firstName">First Name:</label>
        <input type="text" class="inputs" name="firstName" id="firstName" required>
        <br>
        <label class="input-label" for="lastName">Last Name:</label>
        <input type="text" class="inputs" name="lastName" id="lastName" required>
        <br>
        <label class="input-lable" for="countries">Select a country</label>
                <select id="countries" class="inputs3">
                  <option value="" selected disabled>Select a country</option>
                </select>
    `;
    flag_next = false
}

// Submit event listener for the form
form.addEventListener("submit", function (event) {
  
    event.preventDefault();
    
    
    // If additional fields are visible, add them to the form data
    if (!flag_next) {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        formData = { ...formData, firstName, lastName };
    }else{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;
        formData = { email, password ,username};
    }

    if(flag_next){
    addAdditionalFields();
    populateCountries();
    }
    
});

let country =""
async function populateCountries() {
  const select = document.getElementById('countries');

  try {
    const countries = await fetchCountries();
    console.log(countries);

    
    countries.sort((a, b) => {
      const countryA = a.name.common.toUpperCase();
      const countryB = b.name.common.toUpperCase();
      if (countryA < countryB) {
        return -1;
      }
      if (countryA > countryB) {
        return 1;
      }
      return 0;
    });

    countries.forEach((country, index) => {
      const option = document.createElement('option');
      option.value = country.name.common; 
      option.text = country.name.common;
      option.dataset.index = index.toString(); 
      select.appendChild(option);
    });

   
    select.addEventListener('change', function() {
      const selectedIndex = select.options[select.selectedIndex].dataset.index;
      const selectedCountry = countries[selectedIndex].name.common;
      country=selectedCountry;
      
    });
  } catch (error) {
    console.error('Error populating countries:', error);
  }
}


async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching country data:', error);
    return [];
  }
}


let emailfield = document.getElementById("email")
let userfield = document.getElementById("username")
let usertext = document.querySelector(".username-text")
let emailtext = document.querySelector(".email-text")



const handleInput = (end) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  

  const requestOptions = {
    method: "OPTIONS",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(BASE_URL+"/user?"+end, requestOptions)
    .then((response) => {
      if(response.status === 200){
        emailtext.style.display = "flex"
        emailtext.textContent = "Email can be used"
        emailtext.style.color = "#00ff00"
      }
      else if(response.status === 409){
        emailtext.style.display = "flex"
        emailtext.textContent = "Email already exists"
        emailtext.style.color = "red"
      }
      else if(response.status === 417){
        emailtext.style.display = "flex"
        emailtext.textContent = "Invalid Email"
        emailtext.style.color = "red"
      }
    })
    
    .catch((error) => console.error(error));
}
const handleInputusername = (end) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "OPTIONS",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(BASE_URL+"/user?"+end, requestOptions)
    .then((response) => {
      if(response.status === 200){
        usertext.style.display = "flex"
        usertext.textContent = "Username can be used"
        usertext.style.color = "#00ff00"
      }
      else if(response.status === 409){
        usertext.style.display = "flex"
        usertext.textContent = "Username already exists"
        usertext.style.color = "red"
      }
      
    })
    .catch((error) => console.error(error));
}

const handleBlur = () => {
  // This function will be called when the input field loses focus
  // You can add logging or any other action you want to perform here
  console.log("User finished typing:", inputField.value);
};

emailfield.addEventListener('blur', ()=>handleInput("email="+emailfield.value))
userfield.addEventListener('blur', ()=>handleInputusername("username="+userfield.value))


function togglePasswordVisibility() {
  var passwordField = document.getElementById("password");
  var icon = document.getElementById("toggle-icon");

  if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.setAttribute("name", "show");
      
  } else {
      passwordField.type = "password";
      icon.setAttribute("name", "hide");
      
  }
}
