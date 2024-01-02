// Get references to the buttons and the h1 element
const buttons = document.querySelectorAll(".title");
const h1Element = document.querySelector(".headding");

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    var category = button.value;
        // Update the h1 element's innerHTML with the button's innerHTML
    h1Element.innerHTML = button.innerHTML;

    buttons.forEach(btn => btn.classList.remove("active"));

    // Add the 'active' class to the clicked button
    button.classList.add("active");

    loadAllPackages(category)
  });
});

function package(){
  window.location.href = "../HTML/package_view_client.html"
}

document.addEventListener("DOMContentLoaded", loadAllPackages(0))

function loadAllPackages(category){
  fetch(BASE_URL+`/packagelist?category=${category}`)
  .then((response)=>{
    if (!response.ok) {
      throw new Error('An error occured!');
    }
    return response.json();
  })
  .then((packages) => {
    var row = document.getElementById("row");

    row.innerHTML = "";

    packages.forEach((package) =>{

      // Create a new div element
      var columnDiv = document.createElement("div");
      columnDiv.classList.add("column");

      // Create the content div
      var contentDiv = document.createElement("div");
      contentDiv.classList.add("content");

      // Create the image element
      var imgElement = document.createElement("img");
      imgElement.src = "../Assests/package_cover4.jpg";
      imgElement.style.width = "100%";

      // Create the profile tile div
      var profileTileDiv = document.createElement("div");
      profileTileDiv.classList.add("profile-tile");

      // Create the profile image element
      var profileImgElement = document.createElement("img");
      profileImgElement.src = "../Assests/login_img1.jpg";
      profileImgElement.alt = "";
      profileImgElement.classList.add("profile-img");

      // Create the designer name paragraph
      var designerNameParagraph = document.createElement("p");
      designerNameParagraph.classList.add("designer-name");
      designerNameParagraph.textContent = "Joe A.";

      // Create the description paragraph
      var titleParagraph = document.createElement("p");
      titleParagraph.classList.add("truncate-text");
      titleParagraph.textContent = package.title;

      // Create the review tile div
      var reviewTileDiv = document.createElement("div");
      reviewTileDiv.classList.add("review-tile");

      // Create the star span
      var starSpan = document.createElement("span");
      starSpan.classList.add("fa", "fa-star");

      // Create the number of reviews paragraph
      var noReviewsParagraph = document.createElement("p");
      noReviewsParagraph.classList.add("no-reviews");
      noReviewsParagraph.textContent = "5";

      // Create the number of orders paragraph
      var noOrdersParagraph = document.createElement("p");
      noOrdersParagraph.classList.add("no-orders");
      noOrdersParagraph.textContent = "(" + package.orders+")";

      // Create the price paragraph
      var priceParagraph = document.createElement("p");
      priceParagraph.classList.add("price");
      priceParagraph.textContent = "From Rs."+package.starterPrice;

      // Append elements to their respective parents
      profileTileDiv.appendChild(profileImgElement);
      profileTileDiv.appendChild(designerNameParagraph);

      reviewTileDiv.appendChild(starSpan);
      reviewTileDiv.appendChild(noReviewsParagraph);
      reviewTileDiv.appendChild(noOrdersParagraph);

      contentDiv.appendChild(imgElement);
      contentDiv.appendChild(profileTileDiv);
      contentDiv.appendChild(titleParagraph);
      contentDiv.appendChild(reviewTileDiv);
      contentDiv.appendChild(priceParagraph);

      columnDiv.appendChild(contentDiv);

      // Append the column to the body (or any other parent element you want)
      row.appendChild(columnDiv)


    })
  })
}

