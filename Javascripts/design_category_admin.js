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

  var category_name = document.getElementById("category-name");
    var del_1 = document.getElementById("del-1");
    var del_2 = document.getElementById("del-2");
    var del_3 = document.getElementById("del-3");
    var del_4 = document.getElementById("del-4");
    var del_5 = document.getElementById("del-5");

    var update_flag = false;
    var category_id = 0;

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

        update_flag = false;

        hideOverlay()
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

            rowMaxDiv.appendChild(delCatUl);

            // Create div for icons with class "icon-handle"
            const iconHandleDiv = document.createElement('div');
            iconHandleDiv.className = 'icon-handle';

            // Create pencil icon
            const pencilIcon = document.createElement('i');
            pencilIcon.className = 'fa fa-pencil-square-o icons';
            pencilIcon.setAttribute('aria-hidden', 'true');
            // add ebventlister to update
            pencilIcon.addEventListener('click', function() {
                updataData(element);
            });
            iconHandleDiv.appendChild(pencilIcon);

            // Create trash icon
            const trashIcon = document.createElement('i');
            trashIcon.className = 'fa fa-trash-o icons';
            trashIcon.setAttribute('aria-hidden', 'true');
            
            // add evenet lister to delete
            trashIcon.addEventListener('click', function() {
                deleteData(element.categoryId);
            });

            iconHandleDiv.appendChild(trashIcon);

            rowMaxDiv.appendChild(iconHandleDiv);

            // Append the whole structure to a container element (e.g., body or another div)
            content.appendChild(rowMaxDiv);
            });
            

    })
  })

// Function to show the overlay
function showOverlay() {
    overlay.style.display = 'block';
}

// Function to hide the overlay
function hideOverlay() {
    overlay.style.display = 'none';
}

// Function to handle clicks outside the overlay
function handleClickOutside(event) {
    if (event.target === overlay) {
        hideOverlay();
    }
}

document.getElementById("create").addEventListener('click', createForm);

// Add click event listener to the overlay to hide it when clicked outside
overlay.addEventListener('click', handleClickOutside);

document.getElementById("overlay_close").addEventListener('click', hideOverlay)

function createForm(){
    showOverlay();

    
}

document.getElementById("Form").addEventListener('submit', function(e) {
    e.preventDefault();

    var category_name = document.getElementById("category-name").value;
    var del_1 = document.getElementById("del-1").value;
    var del_2 = document.getElementById("del-2").value;
    var del_3 = document.getElementById("del-3").value;
    var del_4 = document.getElementById("del-4").value;
    var del_5 = document.getElementById("del-5").value;

    // Input validation
    if (!category_name || !del_1 || !del_2 || !del_3 || !del_4 || !del_5) {
        Swal.fire({
            icon: "warning",
            title: "Validation Error",
            text: "Please fill in all fields."
        });
        return;
    }

    var requestBody = {
        category: category_name,
        del_1: del_1,
        del_2: del_2,
        del_3: del_3,
        del_4: del_4,
        del_5: del_5
    };

    console.log(requestBody);
    console.log(update_flag);

    const operationType = update_flag ? "update" : "insert";

    const requestUrl = update_flag
        ? `${BASE_URL}/categorydata?categoryId=${category_id}`
        : `${BASE_URL}/categorydata`;

    fetch(requestUrl, {
        method: update_flag ? 'PUT' : 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestBody)
    })
    .then((response) => {
        if (response.ok) {
            console.log(`Data ${operationType}d successfully`);
            Swal.fire({
                icon: "success",
                    title: update_flag ? "Category data updated" : "New Category Added",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    hideOverlay();
                    location.reload();
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
            console.error('Error occured');
            throw new Error('Error occurred'); 
        }
     
    })
    
});



function updataData(element){
    update_flag = true;
    category_id = element.categoryId;
    console.log(category_id);
    showOverlay();

    category_name.value = element.category;
    del_1.value = element.del_1;
    del_2.value = element.del_2;
    del_3.value = element.del_3;
    del_4.value = element.del_4;
    del_5.value = element.del_5;

}

function deleteData(category_id){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${BASE_URL}/categorydata?categoryId=${category_id}`, {
                method: 'DELETE',
                headers: myHeaders
            })
            .then((response)=>{
                if (response.ok) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    })
                    .then((result)=>{
                        if (result.isConfirmed) {
                            location.reload();
                            
                        }
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!"
                    });
                    console.error('Error occured');
                    throw new Error('Error occurred'); 
                }
            })
        }
      });
   
}