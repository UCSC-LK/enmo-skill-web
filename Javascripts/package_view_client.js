// // Replace this with the URL of your Java servlet
// const servletUrl = "/Assests/login_img1.jpg";

// // Make an AJAX request to fetch the image URL
// fetch(`${servletUrl}?imageUrl=image-url-from-database`)
//   .then(response => {
//     if (response.status === 200) {
//       return response.text(); // Assuming the response is a plain text URL
//     } else {
//       // Handle error or no image found
//       console.error("Failed to fetch image URL");
//     }
//   })
//   .then(imageUrl => {
//     // Set the fetched URL as the src attribute of the img element
//     const imgElement = document.getElementById("designer-picture");
//     imgElement.src = imageUrl;
//   })
//   .catch(error => {
//     console.error("Error fetching image URL:", error);
//   });


document.addEventListener( "DOMContentLoaded", functionCall())

function functionCall() {
    // const xhttp = new XMLHttpRequest();
    // xhttp.onload = function() {
        
        
        
    //   }
    // xhttp.open("GET", "../HTML/package_view_client.html", true);
    // xhttp.send();

    document.getElementById("designer-picture").src = "/Assests/login_img1.jpg";
        document.getElementById("designer-img").src = "/Assests/login_img1.jpg";
        document.getElementById("cover-image").src = "/Assests/package_cover4.jpg";
        document.getElementById("description").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC"
        document.getElementById("catogery").innerHTML = "catogery name"
        document.getElementById("designer-username1").innerHTML = "designer username"
        document.getElementById("designer-username2").innerHTML = "designer username"
  }

  // no data fecth to table

