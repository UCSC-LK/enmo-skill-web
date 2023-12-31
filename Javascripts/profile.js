var userId = 51

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:15000/enmo_skill_backend_war/profile?role=Designer&userId="+userId, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)


        document.querySelector(".display-name").textContent = result.display_name;
        document.querySelector(".description").textContent = result.description;

          
          var languagesContainer = document.querySelector(".languages");
          var skillsContainer = document.querySelector(".skills");      

          setArray(languagesContainer,result.language);// set languages-------------
          setArray(skillsContainer,result.skills);     //set skills------------------

        console.log(item.skills)
        
      })
    .catch(error => console.log('error', error));


    function setArray(className,list){

      className.innerHTML = ""; // Clear previous content

      list.forEach(lang => {
        var Element = document.createElement("li");
        Element.textContent = lang;
        className.appendChild(Element);
      });
    }


function editProfile(){
  var parameterValue = "edite";
  var newURL = "../HTML/profileEdit.html?paramName=" + encodeURIComponent(parameterValue);

  window.location = newURL;
}
