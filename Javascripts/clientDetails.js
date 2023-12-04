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


// Function to fetch country data from REST Countries API
const select = document.getElementById('countries');
let countryselected =""

// Function to populate the dropdown with countries in alphabetical order
async function populateCountries() {
  try {
    const countries = await fetchCountries();

    // Sort countries alphabetically by country name
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
      option.value = country.name.common; // Use the country name as value
      option.text = country.name.common;
      option.dataset.index = index.toString(); // Store the index as a data attribute
      select.appendChild(option);
    });

    // Add an event listener to the select element after populating the options
    select.addEventListener('change', function() {
      const selectedIndex = select.options[select.selectedIndex].dataset.index;
      const selectedCountry = countries[selectedIndex].name.common;
      countryselected=selectedCountry;
      
    });
  } catch (error) {
    console.error('Error populating countries:', error);
  }
}

// Function to fetch countries
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

// Call the function to populate the dropdown with sorted countries
populateCountries();

  

  const nameuser = document.getElementById("email");
  const cno = document.getElementById("username");
  const description = document.getElementById("textdis");
  const nic = document.getElementById("password");
  const fileInput = document.getElementById('image');
  const submitbtn = document.getElementById('submit');
  let urltext="";


  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    if(countryselected==""){
      showMessage("error","Please Select Your Country",2000)
    }else Validate()
  })

 function Validate(){
   const contactNumber = cno.value.trim();
    const isValidContactNumber = /^\d{10}$/.test(contactNumber);
    if(!isValidContactNumber){
    showMessage("error","Not Valid Phone Number",2000)
  }else  uploadFile();


 }  
    
 function uploadFile() {
  var file = fileInput.files[0];

  var formData = new FormData();
  formData.append('file', file);

  fetch(BASE_URL+'file', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      console.log('File URL: ' + data);
      urltext=data
      Writetodatabase()

  })
  .catch(error => {
      console.error('Error:', error);
      showMessage("error",error,2000)
  });
}

 
  function Writetodatabase(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": "35",
      "name": nameuser.value,
      "contact_no": cno.value,
      "description": description.value,
      "NIC": nic.value,
      "country": countryselected,
      "url": urltext
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:15000/enmo_skill_backend_war/user", requestOptions)
      .then(response => response.text())
      .then(result =>{ console.log(result);showMessage("error",result,4000)})
      .catch(error => {console.log('error', error)
      showMessage("error",error,4000)});
  }