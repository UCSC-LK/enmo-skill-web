// Get references to the buttons and the h1 element
const buttons = document.querySelectorAll(".title");
const h1Element = document.querySelector(".headding");
const budgetDropdown = document.getElementById('budget-dropdown');
const delTimeDropdown = document.getElementById('del-time-dropdown');
const langDropdown = document.getElementById('language-dropdown');
const budgetButton = document.getElementById('filter_budget');
const delTimeButton = document.getElementById('filter_del_time');
const langButton = document.getElementById('filter_lanaguages');

var loader = document.getElementById("loader-div");
var block = document.getElementById("block");


// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    var category = button.value;
        // Update the h1 element's innerHTML with the button's innerHTML
    h1Element.innerHTML = button.innerHTML;

    buttons.forEach(btn => btn.classList.remove("active"));

    // Add the 'active' class to the clicked button
    button.classList.add("active");

    block.style.display = "none"
    loader.style.cssText = "";


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

      columnDiv.addEventListener("click", function(e) {
        console.log(package.packageId);

        var pkg_view = "../HTML/package_view_client_new.html"

        var url = pkg_view +
                '?packageId='+encodeURIComponent(package.packageId)
                
            // Open a new browser tab/window with the specified URL
            var newWindow = window.open(url, '_blank');

      });

    })

      // FINALLYYYY REMOVING THE LOADER
      block.style.cssText = "";
      loader.style.display = "none";
  })


}

// Add a click event listener to the Budget button
budgetButton.addEventListener('click', function(event) {
    // Toggle the visibility of the budget dropdown
    budgetDropdown.style.display = (budgetDropdown.style.display === 'none' || budgetDropdown.style.display === '') ? 'block' : 'none';
    delTimeDropdown.style.display = 'none';
    langDropdown.style.display = 'none';
    
    // Stop the event propagation to prevent it from reaching the body click event listener
    event.stopPropagation();
});

// Add a click event listener to the document body
document.body.addEventListener('click', function() {
    // Hide the budget dropdown when a click occurs outside of it
    budgetDropdown.style.display = 'none';
});

// Add a click event listener to the budget dropdown to prevent its closure when clicked inside
budgetDropdown.addEventListener('click', function(event) {
    // Stop the event propagation to prevent it from reaching the document body click event listener
    event.stopPropagation();
});

// Add a click event listener to the Budget button
delTimeButton.addEventListener('click', function(event) {
    // Toggle the visibility of the budget dropdown
    delTimeDropdown.style.display = (delTimeDropdown.style.display === 'none' || delTimeDropdown.style.display === '') ? 'block' : 'none';
    langDropdown.style.display = 'none';
    budgetDropdown.style.display = 'none';
    
    // Stop the event propagation to prevent it from reaching the body click event listener
    event.stopPropagation();
});

// Add a click event listener to the document body
document.body.addEventListener('click', function() {
    // Hide the budget dropdown when a click occurs outside of it
    delTimeDropdown.style.display = 'none';
});

// Add a click event listener to the budget dropdown to prevent its closure when clicked inside
delTimeDropdown.addEventListener('click', function(event) {
    // Stop the event propagation to prevent it from reaching the document body click event listener
    event.stopPropagation();
});

// Add a click event listener to the Budget button
langButton.addEventListener('click', function(event) {
    // Toggle the visibility of the budget dropdown
    langDropdown.style.display = (langDropdown.style.display === 'none' || langDropdown.style.display === '') ? 'block' : 'none';
    budgetDropdown.style.display = 'none';
    delTimeDropdown.style.display = 'none';
    
    // Stop the event propagation to prevent it from reaching the body click event listener
    event.stopPropagation();
});

// Add a click event listener to the document body
document.body.addEventListener('click', function() {
    // Hide the budget dropdown when a click occurs outside of it
    langDropdown.style.display = 'none';
});

// Add a click event listener to the budget dropdown to prevent its closure when clicked inside
langDropdown.addEventListener('click', function(event) {
    // Stop the event propagation to prevent it from reaching the document body click event listener
    event.stopPropagation();
});


