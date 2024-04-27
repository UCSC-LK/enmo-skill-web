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
  
  // var raw = JSON.stringify({});

  let url;
  let packageId = 0;
  let title_value = "";
  let category_value = 0;
  let description_value = "";

  const fileInput = document.getElementById('fileID');
  const uploadButton = document.querySelector('.btn-upload');
  const fileSupportText = document.querySelector('.drop_box p');
  var selectedFile = null;

  let coverUrl_selected = null;
  let upload_btn = false;

  let package = {}

//   document.addEventListener("DOMContentLoaded", function() {

//     // extract query parameters
//     url = new URL(window.location.href);
//     packageId = url.searchParams.get('packageId');
//     console.log(packageId); 

//     // fetch category data and display them
//     fetch(BASE_URL + `/categorydata?categoryId=${0}`, {
//         method: 'GET',
//         headers: myHeaders
//     })
//     .then(response => 
//       {if(response.status == 401){
//         window.location.href = "../Failed/401.html";
//       }else if(response.status == 406){
//         const currentUrl = encodeURIComponent(window.location.href);
//         window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
//       }else if(response.status == 404){
//         window.location.href = "../Failed/404.html";
//       }else if (response.status == 200) {
//         return response.json();
//       }else{
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went Wrong!"
//         });
//         console.log("Error"+response.status)
//       }
//       })
//     .then((data)=>{

//         var select_categories = document.getElementById("category");

//         for (let i = 1; i <= data.length; i++) {
            
//             var option = document.createElement("option");
//             option.value = i;
//             option.text = data[i-1].category;

//             select_categories.appendChild(option);
            
//         }
//     })
//     .catch((error)=>{
//       console.error(error)
//       Swal.fire({
//        icon: "error",
//        title: "Oops...",
//        text: "Something went wrong!"
//      });
//     })

//     if (packageId != null) {
//         loadData();
//     }
// });

document.addEventListener("DOMContentLoaded", async function () {
  url = new URL(window.location.href);
  packageId = url.searchParams.get('packageId');
  console.log(packageId);

  try {
      const response = await fetch(BASE_URL + `/categorydata?categoryId=${0}`, {
          method: 'GET',
          headers: myHeaders
      });

      if(response.status == 401){
        window.location.href = "../Failed/401.html";
      }else if(response.status == 406){
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
      }else if(response.status == 404){
        window.location.href = "../Failed/404.html";
      }else if (response.status == 200) {
        const data = await response.json();
        populateCategories(data);
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went Wrong!"
        });
        console.log("Error"+response.status)
      }

      // if (!response.ok) {
      //     throw new Error('Error occurred');
      // }

      // const data = await response.json();
      // populateCategories(data);

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went Wrong!"
    });
    console.log("Error"+response.status)
  }

  if (packageId) {
      loadData();
  }
});

function populateCategories(data) {
  var select_categories = document.getElementById("category");

  for (let i = 1; i <= data.length; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = data[i - 1].category;

      select_categories.appendChild(option);
  }
}


function loadData(){
    // extract query parameters


    fetch(BASE_URL+`/package?packageId=${packageId}`,{
        method: 'GET',
        headers: myHeaders
    })
    .then(response => 
        {if(response.status == 401){
          window.location.href = "../Failed/401.html";
        }else if(response.status == 406){
          const currentUrl = encodeURIComponent(window.location.href);
          window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        }else if(response.status == 404){
          window.location.href = "../Failed/404.html";
        }else if (response.status == 200) {
          return response.json();
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went Wrong!"
          });
          console.log("Error"+response.status)
        }
        })
    .then((data)=>{
        console.log(data);

        document.getElementById("title").value = data.title;
        document.getElementById("category").value = data.category;
        document.getElementById("description").value = data.description;
        coverUrl_selected = data.coverUrl
        selectedFile = data.selectedFile

        // Split the URL by '/'
        var parts = data.coverUrl.split('/');

        // Get the last part of the URL (which should be the filename)
        fileSupportText.textContent = parts[parts.length - 1];
    
       
        
    })
    .catch((error)=>{
        console.error(error)
        Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Something went wrong!"
       });
      })

   
}
  
const form = document.getElementById("package_form");


  uploadButton.addEventListener('click', function() {
    upload_btn = true;

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
document.getElementById("button-next").addEventListener("click", function (e) {
    e.preventDefault();

    // Get form field values
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    // const cover_img = fileInput.files[0];
    console.log(category);

    if (title.trim() === "" || description.trim()=== "" || category == 0) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Text fields must be filled"
          });
    } else {
        
    var img_url = null;

    console.log(upload_btn);
    console.log("hello before if");
    if (!upload_btn) {
        console.log("hello in the if");
        saveData(title, category, description, coverUrl_selected)
    }

    console.log("hello after if");

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
        .then(response => 
            {if(response.status == 401){
              window.location.href = "../Failed/401.html";
            }else if(response.status == 406){
              const currentUrl = encodeURIComponent(window.location.href);
              window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
            }else if(response.status == 404){
              window.location.href = "../Failed/404.html";
            }else if (response.status == 200) {
              return response.text();
            }else{
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went Wrong!"
              });
              console.log("Error"+response.status)
            }
            })
        // .then(response => response.text())
        .then(data => {
            console.log('Success:', data);

            // call function to save data
            saveData(title, category, description, data)

    //         const url = new URL(window.location.href);
    // const packageId = url.searchParams.get('packageId');
    // const operationType = packageId ? "update" : "insert";

    // const packageData = {
    //     title: title,
    //     description: description,
    //     category: category,
    //     // coverUrl: "../Assests/package_cover4.jpg",
    //     coverUrl: img_url,
    //     clicks: 0,
    //     orders: 0,
    //     cancellations: "0%",
    //     status: "active"
    // };

    // const requestUrl = operationType === "update"
    //     ? `${BASE_URL}/package?packageId=${packageId}`
    //     : `${BASE_URL}/package`;

    // try {
    //     fetch(requestUrl, {
    //         method: operationType === "update" ? "PUT" : "POST",
    //         headers: myHeaders,
    //         body: JSON.stringify(packageData),
    //     })
    //     .then((response)=>{
    //         if (response.ok) {
    //             console.log(`Package data ${operationType}d successfully.`);
    //             if (operationType === "insert") {
    //                 var rsp = response.json()
    //                 rsp.then(data => {
    //                     window.location.href = `../HTML/package_pricing.html?packageId=${data.result}&category=${category}`;
    //                 })
    //                 // window.location.href = `../HTML/package_pricing.html?packageId=${data.result}&category=${category}`;
    //             } else {
    //                 window.location.href = `../HTML/package_pricing.html?packageId=${packageId}&category=${category}&update=1`;
    //             }
    //         } else {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: "Something went wrong!",
    //                 confirmButtonColor: "#293692"
    //               });
    //             // showPopupUnsuccess();
    //             console.error(`Failed to ${operationType} package data.`);
    //         }
    //     })

        
    // } catch (error) {
    //     console.error("An error occurred:", error);
    // }

    //     })
    //     .catch(error => {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Something went wrong!",
    //             confirmButtonColor: "#293692"
    //           });
    //         console.error('Error:', error);
    //     });
    // }



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
    }

    
    
});

function saveData(title, category, description,img_url){

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
        cancellations: 0,
        status: "active"
    };

    const requestUrl = operationType === "update"
        ? `${BASE_URL}/package?packageId=${packageId}`
        : `${BASE_URL}/package`;

   
        fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers: myHeaders,
            body: JSON.stringify(packageData),
        })
        .then(response => 
            {if(response.status == 401){
              window.location.href = "../Failed/401.html";
            }else if(response.status == 406){
              const currentUrl = encodeURIComponent(window.location.href);
              window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
            }else if(response.status == 404){
              window.location.href = "../Failed/404.html";
            }else if (response.status == 200) {
            //   return response.json()
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
            } else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonColor: "#293692"
                    });
                console.error(`Failed to ${operationType} package data.`);
                console.log("Error"+response.status)
            }
            
            })
        // .then((response)=>{
        //     if (response.ok) {
        //         console.log(`Package data ${operationType}d successfully.`);
        //         if (operationType === "insert") {
        //             var rsp = response.json()
        //             rsp.then(data => {
        //                 window.location.href = `../HTML/package_pricing.html?packageId=${data.result}&category=${category}`;
        //             })
        //             // window.location.href = `../HTML/package_pricing.html?packageId=${data.result}&category=${category}`;
        //         } else {
        //             window.location.href = `../HTML/package_pricing.html?packageId=${packageId}&category=${category}&update=1`;
        //         }
        //     } else {
        //         Swal.fire({
        //             icon: "error",
        //             title: "Oops...",
        //             text: "Something went wrong!",
        //             confirmButtonColor: "#293692"
        //           });
        //         // showPopupUnsuccess();
        //         console.error(`Failed to ${operationType} package data.`);
        //     }
        // })
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