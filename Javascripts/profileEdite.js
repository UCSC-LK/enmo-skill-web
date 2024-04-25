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
const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
    const image = this.files[0];
    if (image.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
            const imgUrl = reader.result;
            imgArea.innerHTML = '';

            // Set the background image of .img-area and configure background size
            imgArea.style.backgroundImage = `url(${imgUrl})`;
            imgArea.style.backgroundSize = 'cover';
            imgArea.style.backgroundRepeat = 'no-repeat';

            imgArea.classList.add('active');
            imgArea.dataset.img = image.name;
        };
        reader.readAsDataURL(image);
    } else {
        // alert("Image size more than 2MB");
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
            icon: "error",
            title: "Image size more than 2MB"
        });
    }
});

//add image uplord button to edite page-------------------------------------------

if(paramValue == "edite"){
    document.querySelector(".img-btn").style.display = 'block';
}



//drop down skills------------------------------------------------------------------
const parentSkill = document.querySelector(".skill-selecter-main");
const childSkill = document.querySelector(".skill-selecter");

let selectedSkill = []
let cloneCount1=0
const maxSkillClones = 2

const skillDropdown = document.getElementById('skill');

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

    result.push({"skills": "Select a skill","skill_id": "0"})

    result.sort(function(a, b) {
        return (a.skill_id - b.skill_id);
    }).sort(function(a, b) {
        return (a.skill_id - b.skill_id);
    });

    console.log(result)

    // Populate the skill dropdown with options 
    result.forEach(skill => {  
        const option = document.createElement('option');
        option.value = skill.skill_id;
        option.textContent = skill.skills;
        skillDropdown.appendChild(option);
        console.log(option)

    });
})
.catch(error => console.log('error', error));

document.querySelector(".setSkills").addEventListener("click",()=>{

    if(cloneCount1<maxSkillClones){
        const newItemSkill = childSkill.cloneNode(true);
        parentSkill.appendChild(newItemSkill);
        cloneCount1++
    }
    

document.querySelectorAll(".skill").forEach((select) => {
    select.addEventListener("change", () => {

        const selectedValue = select.value;
        
        selectedSkill.push(selectedValue)

        // Reset display for all options in all dropdowns
        document.querySelectorAll(".skill").forEach((option) => {
            option.style.display = "";
        });

        // Hide the selected option 
        document.querySelectorAll(".skill").forEach((otherSelect) => {
            const optionToHide = otherSelect.querySelector(`[value="${selectedValue}"]`);
            if (optionToHide) {
                optionToHide.style.display = "none";
            }
        });

        const optionToHide = select.querySelector(`[value="0"]`);
        if (optionToHide) {
            optionToHide.style.display = "none";
        }

    });
});

if(cloneCount1 == maxSkillClones){
    document.querySelector(".add-skill-btn").style.display="none"
}

})




//drop down language----------------------------------------------------------------------------------
const languageParent = document.querySelector(".languag-selecter-main");
const languageChild = document.querySelector(".language-selecter");
const addButton = document.querySelector(".setLanguage");

let cloneCount = 0;
const maxClones = 3;
let selectedLanguages = []

const languageDropdown = document.getElementById('language');

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

    result.push({"language": "Select a language","language_id": "0"})
    result.sort(function(a, b) {
        return (a.language_id - b.language_id);
    }).sort(function(a, b) {
        return (a.language_id - b.language_id);
    });

    console.log(result)

    // Populate the skill dropdown with options 
    result.forEach(language => {  
        const option = document.createElement('option');
        option.value = language.language_id;
        option.textContent = language.language;
        languageDropdown.appendChild(option);
        console.log(option)

    });
})
.catch(error => console.log('error', error));

document.querySelector(".add-btn").addEventListener("click",()=>{

    if(cloneCount1<maxClones){
        const newItemSkill = languageChild.cloneNode(true);
        languageParent.appendChild(newItemSkill);
        cloneCount1++
    }


    document.querySelectorAll(".language").forEach((select) => {
        select.addEventListener("change", () => {

        const selectedValue = select.value;

        if(select.value==1){
            selectedLanguages.push("Sinhala")
        }else if(select.value==2){
            selectedLanguages.push("English")
        }else if(select.value==3){
            selectedLanguages.push("Tamil")
        }
        

        // Reset display for all options in all dropdowns
        document.querySelectorAll(".language").forEach((option) => {
            option.style.display = "";
        });

        // Hide the selected option 
        document.querySelectorAll(".language").forEach((otherSelect) => {
            const optionToHide = otherSelect.querySelector(`[value="${selectedValue}"]`);
            if (optionToHide) {
                optionToHide.style.display = "none";
            }
        });

        const optionToHide = select.querySelector(`[value="0"]`);
        if (optionToHide) {
            optionToHide.style.display = "none";
        }

    });
});

if(cloneCount1 == maxClones){
    document.querySelector(".add-btn").style.display="none"
}

})

console.log(selectedLanguages)

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
    console.log("ssaa")

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
}else{
    
//send post request-------------------------------------------------------------

    document.querySelector(".saveBTN").addEventListener("click",()=>{
        
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
        window.location = "../HTML/profile.html";
    }, 2500);
        
    })
    })
     .catch(error => console.log('error', error));
    

}



var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", getCookie("JWT"));  

var requestOptions = {
  method: 'OPTIONS',
  headers: myHeaders,
  redirect: 'follow'
};

loding.style.display ="flex"

fetch(BASE_URL + "/profile", requestOptions)
  .then(response => {
    loding.style.display = "none";
    if (response.status === 401) {
      window.location.href = "../Failed/401.html";
    } else if (response.status === 406) {
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = "../Failed/Session%20timeout.html?returnUrl=" + currentUrl;
    } else if (response.status === 404) {
      window.location.href = "../Failed/404.html";
    } else {
      return response.json(); 
    }
  })
  .then(result => {
    // if (result && result.url) {
      const imgArea = document.querySelector('.img-area');
      imgArea.innerHTML = '';
      imgArea.style.backgroundImage = `url(${result.url})`;
      imgArea.style.backgroundSize = 'cover';
      imgArea.style.backgroundRepeat = 'no-repeat';
      imgArea.classList.add('active');
      imgArea.dataset.img = result.url;
    // } else {
    //   console.error('Invalid response or URL not found.');
    // }
  })
  .catch(error => console.error('Error fetching profile:', error));




