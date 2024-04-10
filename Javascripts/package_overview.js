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

  var myHeaders = new Headers();                          ///important
  myHeaders.append("Content-Type", "application/json");   ///important
  myHeaders.append("Authorization", getCookie("JWT"));    ///important
  
  var raw = JSON.stringify({});

  var url;
  var packageId = 0;
  var title_value = "";
  var category_value = 0;
  var description_value = "";

  const fileInput = document.getElementById('fileID');
  const uploadButton = document.querySelector('.btn-upload');
  const fileSupportText = document.querySelector('.drop_box p');
  var selectedFile;


  document.addEventListener("DOMContentLoaded", function() {

    // extract query parameters
    url = new URL(window.location.href);
    packageId = url.searchParams.get('packageId');
    console.log(packageId); // Moved inside the DOMContentLoaded event listener

    // fetch category data and display them
    fetch(BASE_URL + `/categorydata?categoryId=${0}`, {
        method: 'GET',
        headers: myHeaders
    })
    .then((response)=>{
        if (!response.ok) {
            throw new Error('Error occured');
        } else {
            return response.json();
        }
    })
    .then((data)=>{

        var select_categories = document.getElementById("category");

        for (let i = 1; i <= data.length; i++) {
            
            var option = document.createElement("option");
            option.value = i;
            option.text = data[i-1].category;

            select_categories.appendChild(option);
            
        }
    })

    if (packageId != null) {
        loadData();
    }
});

function loadData(){
    // extract query parameters


    fetch(BASE_URL+`/package?packageId=${packageId}`,{
        method: 'GET',
        headers: myHeaders
    })
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
  
const form = document.getElementById("package_form");


  uploadButton.addEventListener('click', function() {
    fileInput.click();
  //   uploadFile(fileInput)
  });

  fileInput.addEventListener('change', function() {
    selectedFile = fileInput.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    if (selectedFile) {
      // Display the selected file name
      fileSupportText.textContent = 'Selected File: ' + selectedFile.name;
      // You can add further functionality here to handle the selected file
      console.log('File selected:', selectedFile);
      // You can perform file upload operations here, such as sending it to the server via AJAX
    } else {
      // Reset the text if no file is selected
      fileSupportText.textContent = 'Files Supported: JPG, JPEG, PNG';
    }
  });

//   function uploadFile(file){
//     const headers = new Headers();
//     headers.append("endpoint", "profile_pics");
//     let RequestData = new FormData();
//     if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         fetch(BASE_URL+'/file', {
//             method: 'POST',
//             headers: myHeaders,
//             body: formData
//         })
//         .then(response => response.text())
//         .then(data => {
//             console.log('Success:', data);
//             RequestData={"url":data}
            

//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }
//   }


// handle both insertions and updates
document.getElementById("button-next").addEventListener("click", async (e) => {
    e.preventDefault();

    // Get form field values
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    // const cover_img = document.getElementById("img").files[0];

    console.log(category);

    // store cover image
    const headers = new Headers();
    headers.append("endpoint", "profile_pics");
    let RequestData = new FormData();
    if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch(BASE_URL+'/file', {
            method: 'POST',
            headers: headers,
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            RequestData={"url":data}
            console.log(RequestData);

        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#293692"
              });
            console.error('Error:', error);
        });
    }

    var img_url = RequestData.url;


    // var formData = new FormData();
    // formData.append('file', cover_img);



      

    // try {
    //     // Upload image
    //     const response = await fetch('http://localhost:15000/enmo_skill_backend_war/file', {
    //         method: 'POST',
    //         body: formData,
    //     });

    //     if (response.ok) {
    //         img_url = await response.text(); // Wait for the image upload to complete
    //         console.log(img_url);
    //     } else {
    //         console.error('Error uploading image:', response.statusText);
    //         return; // Exit the function if there's an error
    //     }
    // } catch (error) {
    //     console.error('Error uploading image:', error);
    //     return; // Exit the function if there's an error
    // }

    // Continue with the rest of your code using img_url
    const url = new URL(window.location.href);
    const packageId = url.searchParams.get('packageId');
    const operationType = packageId ? "update" : "insert";

    const packageData = {
        title: title,
        description: description,
        category: category,
        // coverUrl: "../Assests/package_cover4.jpg",
        coverUrl: img_url,
        clicks: 0,
        orders: 0,
        cancellations: "0%",
        status: "active"
    };

    const requestUrl = operationType === "update"
        ? `${BASE_URL}/package?packageId=${packageId}`
        : `${BASE_URL}/package`;

    try {
        const response = await fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers: myHeaders,
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
                window.location.href = `../HTML/package_pricing.html?packageId=${packageId}&category=${category}&update=1`;
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#293692"
              });
            // showPopupUnsuccess();
            console.error(`Failed to ${operationType} package data.`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});




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