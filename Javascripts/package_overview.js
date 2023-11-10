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
    var img_url = ""
    // store img in a s3 bucket
    const cover_img = document.getElementById("img").files[0];

    var formData = new FormData();
    formData.append('file', cover_img);

    fetch('http://localhost:15000/enmo_skill_backend_war/file', {
        method: 'POST',
        body: formData
        })
         .then(response => response.text())
        .then(data => {
            img_url = data;
            console.log(img_url);
        })
        .catch(error => {
        console.error('Error:', error);
        });
    


    // Determine operation type based on the URL
    const url = new URL(window.location.href);
    const packageId = url.searchParams.get('packageId');
    const operationType = packageId ? "update" : "insert";

    // Create a JavaScript object for the data
    const packageData = {
        title: title,
        description: description,
        category: category,
        // coverUrl: img_url,
        coverUrl: "../Assests/package_cover4", // <<<<<hardcoded
        clicks: 0,
        orders: 0,
        cancellations: "0%",
        status: "active"
    };

    console.log(packageData);

    // Determine the URL for the request based on the operation type
    const requestUrl = operationType === "update"
        // ? `http://localhost:15000/enmo_skill_backend_war/package?packageId=${packageId}`
        ? `${BASE_URL}/package?packageId=${packageId}&UserId=${UserId}`
        // : "http://localhost:15000/enmo_skill_backend_war/package";
        : `${BASE_URL}/package?UserId=${UserId}`

    // fecth data
    try {
        const response = await fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(packageData),
        });

        if (response.ok) {
            console.log(`Package data ${operationType}d successfully.`);
            window.location.href = `../HTML/package_pricing.html?catogery=${category}`
        } else {
            alert("Error occured")
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

    document.getElementById("title").value = title_value;
    document.getElementById("category").value = category_value;
    document.getElementById("description").value = description_value;
}
