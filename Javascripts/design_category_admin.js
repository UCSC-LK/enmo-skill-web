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

  var overlay = document.getElementById("overlay");
  var overlay_div = document.getElementById("overlay-div2");

  document.addEventListener("DOMContentLoaded", function(){

    var content = document.getElementById("content");

    fetch(BASE_URL + `/categorydata?categoryId=${0}`,{
        method: 'GET',
        headers: myHeaders
    })
    .then((respones)=>{
         if (!respones.ok) {
             throw new Error('Error occured');
         } else {
             return respones.json();
         }
     })
    .then((resultset)=>{

        var content = document.getElementById('content');
        content.innerHTML = "";

        resultset.forEach(element => {
            const rowMaxDiv = document.createElement('div');
            rowMaxDiv.className = 'row-max';

            // Create p element for id with class "id-cat"
            const idCatP = document.createElement('p');
            idCatP.className = 'id-cat';
            idCatP.textContent = element.categoryId;
            rowMaxDiv.appendChild(idCatP);

            // Create p element for category name with class "name-cat"
            const nameCatP = document.createElement('p');
            nameCatP.className = 'name-cat';
            nameCatP.textContent = element.category;
            rowMaxDiv.appendChild(nameCatP);

            // Create ul element for sub-categories with class "del-cat"
            const delCatUl = document.createElement('ul');
            delCatUl.className = 'del-cat';

            for (let i = 1; i <= 5; i++) {
                var li = document.createElement('li');
                li.textContent = element["del_"+i];
                delCatUl.appendChild(li);
            }

            // Loop through subCategories to create li elements
            // subCategories.forEach(subCategory => {
            //     const li = document.createElement('li');
            //     li.textContent = subCategory;
            //     delCatUl.appendChild(li);
            // });

            rowMaxDiv.appendChild(delCatUl);

            // Create div for icons with class "icon-handle"
            const iconHandleDiv = document.createElement('div');
            iconHandleDiv.className = 'icon-handle';

            // Create pencil icon
            const pencilIcon = document.createElement('i');
            pencilIcon.className = 'fa fa-pencil-square-o icons';
            pencilIcon.setAttribute('aria-hidden', 'true');
            iconHandleDiv.appendChild(pencilIcon);

            // Create trash icon
            const trashIcon = document.createElement('i');
            trashIcon.className = 'fa fa-trash-o icons';
            trashIcon.setAttribute('aria-hidden', 'true');
            iconHandleDiv.appendChild(trashIcon);

            rowMaxDiv.appendChild(iconHandleDiv);

            // Append the whole structure to a container element (e.g., body or another div)
            content.appendChild(rowMaxDiv);
            });
            

    })
  })

  document.getElementById("create").addEventListener("click", function(){
    overlay.style.display = "block";
  })

  document.getElementById("overlay_close").addEventListener("click", function(){
    overlay.style.display = "none";
  })

  overlay.addEventListener("click", function(){
    overlay.style.display = "none";

  })