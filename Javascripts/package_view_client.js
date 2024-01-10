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


const url = new URL(window.location.href);
const packageId = url.searchParams.get('packageId');
console.log(packageId);

document.addEventListener( "DOMContentLoaded", loadData() );

function loadData() {
    
}



