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
  const skillsArray1 = [];
  const loding = document.querySelector(".loading");

  loding.style.display ="none"


//Get parameter value---------------------------------------------------------
var paramValue = null

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

var paramValue = getQueryParam("paramName");

console.log(paramValue);


//uplod img----------------------------------------------------------------------
const fileInput = document.querySelector('.select-image');
// const fileInput = document.querySelector('file');
const imgArea = document.querySelector('.img-area');

// selectImage.addEventListener('click', function () {
// 	fileInput.click();
// })
var file=null
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        file = fileInput.files[0];
        
        const reader = new FileReader();

        reader.onload = function (e) {
            imgArea.src = e.target.result;
          
        }

        reader.readAsDataURL(file);
    }
});

document.querySelector(".saveBTN").addEventListener("click",()=>{
   
    loding.style.display ="flex"
    const myHeaders = new Headers();
    myHeaders.append("endpoint", "profile_pics");
    let RequestData = ""
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch(BASE_URL+'/file', {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            RequestData=data
            Sendreq(RequestData)

        })
        .catch(error => {
            console.error('Error:', error);
        });
    } 
   





  })

// inputFile.addEventListener('change', function () {
//     const image = this.files[0];
//     if (image.size < 2000000) {
//         const reader = new FileReader();
//         reader.onload = () => {
//             const imgUrl = reader.result;
//             imgArea.innerHTML = '';

//             // Set the background image of .img-area and configure background size
//             imgArea.style.backgroundImage = `url(${imgUrl})`;
//             imgArea.style.backgroundSize = 'cover';
//             imgArea.style.backgroundRepeat = 'no-repeat';

//             imgArea.classList.add('active');
//             imgArea.dataset.img = image.name;
//         };
//         reader.readAsDataURL(image);
//     } else {
//         // alert("Image size more than 2MB");
//         const Toast = Swal.mixin({
//             toast: true,
//             position: "top-end",
//             showConfirmButton: false,
//             timer: 3000,
//             timerProgressBar: true,
//         didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//         }
//         });
//             Toast.fire({
//             icon: "error",
//             title: "Image size more than 2MB"
//         });
//     }
// });

//add image uplord button to edite page-------------------------------------------

// if(paramValue == "edite"){
//     document.querySelector(".img-btn").style.display = 'block';
// }



//drop down skills------------------------------------------------------------------
// const parentSkill = document.querySelector(".skill-selecter-main");
// const childSkill = document.querySelector(".skill-selecter");

// let selectedSkill = []
var skillsArray2 = []
let cloneCount1=0
const maxSkillClones = 2

// const skillDropdowns = document.getElementById('skill');

var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");   
myHeaders.append("Authorization", getCookie("JWT"));    


var requestOptions = {
    method: 'GET',
    headers: myHeaders, 
    redirect: 'follow'
};

loding.style.display ="flex" 
fetch(BASE_URL+"/skill", requestOptions)
.then(response =>{
    loding.style.display ="none"
    if(response.status == 401){
      window.location.href = "../Failed/401.html";
    }else if(response.status == 406){
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
    }else if(response.status == 404){
      window.location.href = "../Failed/404.html";
    }else {
      return response.json()
    }
  })
.then(result => {


    result.forEach(item=>{
        skillsArray1.push(item)
        
    })
    console.log(skillsArray1)
    populateDropdown()
})
.catch(error => console.log('error', error));



 //drop down language----------------------------------------------------------------------------------
// const languageParent = document.querySelector(".languag-selecter-main");
// const languageChild = document.querySelector(".language-selecter");
// const addButton = document.querySelector(".setLanguage");

// let cloneCount = 0;
// const maxClones = 3;
let LanguageArray = []

// const languageDropdown = document.getElementById('language');

var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");   
myHeaders.append("Authorization", getCookie("JWT"));    

var requestOptions = {
    method: 'GET',
    headers: myHeaders, 
    redirect: 'follow'
};

loding.style.display ="flex" 
fetch(BASE_URL+"/languages", requestOptions)
.then(response =>{
    loding.style.display ="none"
    if(response.status == 401){
      window.location.href = "../Failed/401.html";
    }else if(response.status == 406){
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
    }else if(response.status == 404){
      window.location.href = "../Failed/404.html";
    }else {
      return response.json()
    }
  })
.then(result => {
    result.forEach(language => {  
        LanguageArray.push(language)
    });
    console.log(LanguageArray)
    populateDropdownLanguage()
})
.catch(error => console.log('error', error));



if(paramValue == "edite"){

//display current details-------------------------------------------------

var myHeaders = new Headers();                          
myHeaders.append("Content-Type", "application/json");   
myHeaders.append("Authorization", getCookie("JWT"));    

var requestOptions = {
    method: 'GET',
    headers: myHeaders, 
    redirect: 'follow'
};

loding.style.display ="flex"
    fetch(BASE_URL+"/profile", requestOptions)
    .then(response => {
        loding.style.display ="none"
        if(response.status == 401){
          window.location.href = "../Failed/401.html";
        }else if(response.status == 406){
          const currentUrl = encodeURIComponent(window.location.href);
          window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        }else if(response.status == 404){
          window.location.href = "../Failed/404.html";
        }else {
          return response.json()
        }
      })
    .then(userData => {
        console.log(userData)
        // Set initial values for input fields
        document.getElementById("firstName").value = userData.fname;
        document.getElementById("lastName").value = userData.lname;
        document.getElementById("displayName").value = userData.display_name;
        document.getElementById("description").value = userData.description

    })
    .catch(error => console.log('error', error));
//send put request-------------------------------------------------------------

document.querySelector(".saveBTN").addEventListener("click", () => {

    var selectedSkill = []
    var selectedLanguages = []
    const selectedSkills = Array.from(document.querySelectorAll('.skill-tag')).map(tag => ({
        skills: tag.textContent,
        skill_id: tag.dataset.skillId
    }));

    const selectedLanguage = Array.from(document.querySelectorAll('.language-tag')).map(tag => ({
        language: tag.textContent,
        language_id: tag.dataset.languageId
    }));
    

    selectedSkills.forEach(item =>{
        selectedSkill.push(item.skill_id)
    })
    selectedLanguage.forEach(item =>{
        selectedLanguages.push(item.language_id)
    })
    console.log(selectedLanguages)

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", getCookie("JWT"));  

const fname = document.getElementById("firstName").value
const lname = document.getElementById("lastName").value
const display_name = document.getElementById("displayName").value
const description = document.getElementById("description").value

var raw = JSON.stringify({
    "role": "Designer",
    "fname": fname,
    "lname": lname,
    "display_name": display_name,
    "description":description,
    "skills": selectedSkill,
    "language": selectedLanguages
});

var requestOptions = {
    method: 'PUT', 
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch(BASE_URL+"/profile", requestOptions)
.then(response =>{
    loding.style.display ="none"
    if(response.status == 401){
    window.location.href = "../Failed/401.html";
}else if(response.status == 406){
    const currentUrl = encodeURIComponent(window.location.href);
    window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
}else if(response.status == 404){
    window.location.href = "../Failed/404.html";
}else {
    return response.text()
}
})
.then(result => {

    var icons = null;
    if(result.includes("Data Updated successfully!")) {
        icons = "success";
    }else{
        icons = "error";
        result = "Error";
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
        Toast.fire({
        icon: icons,
        title: result
    });
    setTimeout(() => {
        window.location = "../HTML/profile.html";
    }, 2500);
        
    })
    .catch(error => console.log('error', error));
    
    })
}else{}
    
//send post request-------------------------------------------------------------

function Sendreq(url){
    // console.log(url)

        var selectedSkill = []
        var selectedLanguages = []
        const selectedSkills = Array.from(document.querySelectorAll('.skill-tag')).map(tag => ({
            skills: tag.textContent,
            skill_id: tag.dataset.skillId
        }));
    
        const selectedLanguage = Array.from(document.querySelectorAll('.language-tag')).map(tag => ({
            language: tag.textContent,
            language: tag.dataset.languageId
        }));
        
    
        selectedSkills.forEach(item =>{
            selectedSkill.push(item.skill_id)
        })
        selectedLanguage.forEach(item =>{
            selectedLanguages.push(item.language)
        })
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", getCookie("JWT"));  

        const fname = document.getElementById("firstName").value
        const lname = document.getElementById("lastName").value
        const display_name = document.getElementById("displayName").value
        const description = document.getElementById("description").value
        const NIC = document.getElementById("NIC").value

        var raw = JSON.stringify({
            "role": "Designer",
            "fname": fname,
            "lname": lname,
            "display_name": display_name,
            "description":description,
            "skills": selectedSkill,
            "language": selectedLanguages,
            "NIC":NIC,
            "url":url
         
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        loding.style.display ="flex"
        fetch(BASE_URL+"/profile", requestOptions)
            .then(response =>{
                loding.style.display ="none"
                if(response.status == 401){
                window.location.href = "../Failed/401.html";
            }else if(response.status == 406){
                const currentUrl = encodeURIComponent(window.location.href);
                window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
            }else if(response.status == 404){
                window.location.href = "../Failed/404.html";
            }else {
                return response.text()
            }
            })
            .then(result =>  {
                var icons = null;
    if(result.includes("Data inserted successfully!")) {
        icons = "success";
    }else{
        icons = "error";
        result = "Error";
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
        Toast.fire({
        icon: icons,
        title: result
    });
    setTimeout(() => {
        window.location = "../HTML/becomeaseller.html";
    }, 2500);
        
    })

    //  .catch(error => console.log('error', error));
    

}



// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", getCookie("JWT"));  

// var requestOptions = {
//   method: 'OPTIONS',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// loding.style.display ="flex"

// fetch(BASE_URL + "/profile", requestOptions)
//   .then(response => {
//     loding.style.display = "none";
//     if (response.status === 401) {
//       window.location.href = "../Failed/401.html";
//     } else if (response.status === 406) {
//       const currentUrl = encodeURIComponent(window.location.href);
//       window.location.href = "../Failed/Session%20timeout.html?returnUrl=" + currentUrl;
//     } else if (response.status === 404) {
//       window.location.href = "../Failed/404.html";
//     } else {
//       return response.json(); 
//     }
//   })
//   .then(result => {
//     // if (result && result.url) {
//       const imgArea = document.querySelector('.img-area');
//       imgArea.innerHTML = '';
//       imgArea.style.backgroundImage = `url(${result.url})`;
//       imgArea.style.backgroundSize = 'cover';
//       imgArea.style.backgroundRepeat = 'no-repeat';
//       imgArea.classList.add('active');
//       imgArea.dataset.img = result.url;
//     // } else {
//     //   console.error('Invalid response or URL not found.');
//     // }
//   })
//   .catch(error => console.error('Error fetching profile:', error));




  const skillDropdown = document.getElementById('skill-dropdown');
  const skillTagsContainer = document.getElementById('skill-tags');
  const submitButton = document.getElementById('submit-btn');

  // Function to populate the dropdown with skills--------------------------------------------------------------------------------
  function populateDropdown() {
    const option = document.createElement('option');
          option.value = 0;
          option.textContent = "Select Skills";
          skillDropdown.appendChild(option);
      skillsArray1.forEach(skill => {
        console.log(skill)
          const option = document.createElement('option');
          option.value = skill.skill_id;
          option.textContent = skill.skills;
          skillDropdown.appendChild(option);
      });
  }

  function addSkillTag(skill) {
      const tag = document.createElement('span');
      tag.classList.add('skill-tag');
      tag.textContent = skill.skills;
      tag.dataset.skillId = skill.skill_id;
      skillTagsContainer.appendChild(tag);

      tag.addEventListener('click', () => {
          tag.remove();
    
          const option = document.createElement('option');
          option.value = skill.skill_id;
          option.textContent = skill.skills;
          skillDropdown.appendChild(option);
      });
  }

  
  skillDropdown.addEventListener('change', () => {
      const selectedOption = skillDropdown.options[skillDropdown.selectedIndex];
      const selectedSkill = skillsArray1.find(skill => skill.skill_id == selectedOption.value);
      if (selectedSkill) {
          addSkillTag(selectedSkill);
          selectedOption.remove();
      }
  });


//   submitButton.addEventListener('click', () => {
//       const selectedSkills = Array.from(document.querySelectorAll('..skill-tag')).map(tag => ({
//           skills: tag.textContent,
//           skill_id: tag.dataset.skillId
//       }));
//       console.log(selectedSkills);
//   });

  // Populate the dropdown initially
//   populateDropdown();



const languageDropdown = document.getElementById('language-dropdown');
  const languageContainer = document.getElementById('language-tags');
  const submitButtonlanguage = document.getElementById('submit-btn-language');

  // Function to populate the dropdown with skills--------------------------------------------------------------------------------
  function populateDropdownLanguage() {
    const option = document.createElement('option');
          option.value = 0;
          option.textContent = "Select Languages";
          languageDropdown.appendChild(option);
          LanguageArray.forEach(language => {
        console.log(language)
          const option = document.createElement('option');
          option.value = language.language_id;
          option.textContent = language.language;
          languageDropdown.appendChild(option);
      });
  }


  function addLanguageTag(language) {
      const tag = document.createElement('span');
      tag.classList.add('language-tag');
      tag.textContent = language.language;
      tag.dataset.languageId = language.language_id;
      languageContainer.appendChild(tag);
    
      tag.addEventListener('click', () => {
          tag.remove();
          
          const option = document.createElement('option');
          option.value = language.language_id;
          option.textContent = language.language;
          languageDropdown.appendChild(option);
      });
  }


  languageDropdown.addEventListener('change', () => {
      const selectedOptionlanguage = languageDropdown.options[languageDropdown.selectedIndex];
    //   console.log(selectedOptionlanguage)
      const selectedLanguage = LanguageArray.find(language => language.language_id == selectedOptionlanguage.value);
    //   console.log(selectedLanguage)
      if (selectedLanguage) {
        console.log(selectedLanguage)
        addLanguageTag(selectedLanguage);
        selectedOptionlanguage.remove();
      }
  });

 
//   submitButtonlanguage.addEventListener('click', () => {
//       const selectedLanguage = Array.from(document.querySelectorAll('.language-tag')).map(tag => ({
//           language: tag.textContent,
//           language: tag.dataset.languageId
//       }));
//       console.log(selectedLanguage);
//   });