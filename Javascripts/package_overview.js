// getting user id from cookie
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
  
  const UserId = getCookie("User_ID");


const form = document.getElementById("package_form");

// handle both insertions and updates
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form field values
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const cover_img = document.getElementById("img").files[0];

    console.log(category);

    var formData = new FormData();
    formData.append('file', cover_img);

    let img_url = "";

    try {
        // Upload image
        const response = await fetch('http://localhost:15000/enmo_skill_backend_war/file', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            img_url = await response.text(); // Wait for the image upload to complete
            console.log(img_url);
        } else {
            console.error('Error uploading image:', response.statusText);
            return; // Exit the function if there's an error
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return; // Exit the function if there's an error
    }

    // Continue with the rest of your code using img_url
    const url = new URL(window.location.href);
    const packageId = url.searchParams.get('packageId');
    const operationType = packageId ? "update" : "insert";

    const packageData = {
        title: title,
        description: description,
        category: category,
        coverUrl: "../Assests/package_cover4.jpg",
        // coverUrl: img_url,
        clicks: 0,
        orders: 0,
        cancellations: "0%",
        status: "active"
    };

    const requestUrl = operationType === "update"
        ? `${BASE_URL}/package?packageId=${packageId}&UserId=${UserId}`
        : `${BASE_URL}/package?UserId=${UserId}`;

    try {
        const response = await fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(packageData),
        });

        if (response.ok) {
            console.log(`Package data ${operationType}d successfully.`);
            if (operationType === "insert") {
                var rsp = response.json()
                rsp.then(data => {
                    window.location.href = `../HTML/package_pricing.html?packageId=${data.result}&category=${category}`;
                })
                // window.location.href = `../HTML/package_pricing.html?packageId=${data.result}&category=${category}`;
            } else {
                window.location.href = `../HTML/package_pricing.html?packageId=${packageId}&category=${category}&update=true`;
            }
        } else {
            showPopupUnsuccess();
            console.error(`Failed to ${operationType} package data.`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});


// Additional code for loading data for update
document.addEventListener("DOMContentLoaded", loadData);

function loadData(){
    // extract query parameters
    const url = new URL(window.location.href);
    const packageId = url.searchParams.get('packageId');
    const title_value = url.searchParams.get('title');
    const category_value = url.searchParams.get('category');
    const description_value = url.searchParams.get('description');

    fetch(BASE_URL+`/package?packageId=${packageId}&UserId=${0}`)
    .then((response)=>{
        if (!response.ok) {
            throw new Error('Error occured');
        } else {
            return response.json();
        }
    })
    .then((data)=>{
        console.log(data);

        document.getElementById("title").value = data.title;
        document.getElementById("category").value = data.category;
        document.getElementById("description").value = data.description;
       
        
    })

   
}

function showPopupUnsuccess() {
    var popupContainer = document.getElementById('popup-container-success');
    var overlay = document.getElementById('overlay2');
    
    overlay.style.display = 'block';
  }


  document.getElementById("btn-unsuccess").addEventListener("click", function(){

    var popupContainer = document.getElementById('popup-container-unsuccess');
    var overlay = document.getElementById('overlay2');

    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
})