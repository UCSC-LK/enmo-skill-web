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

var myHeaders = new Headers();                          ///important
myHeaders.append("Content-Type", "application/json");   ///important
myHeaders.append("Authorization", getCookie("JWT"));    ///important

var raw = JSON.stringify({});


// Get references to the buttons and the h1 element
const buttons = document.querySelectorAll(".title");
const h1Element = document.querySelector(".headding");
const budgetDropdown = document.getElementById('budget-dropdown');
const delTimeDropdown = document.getElementById('del-time-dropdown');
const langDropdown = document.getElementById('language-dropdown');
const reviewDropdown = document.getElementById('review-dropdown');
const budgetButton = document.getElementById('filter_budget');
const delTimeButton = document.getElementById('filter_del_time');
const langButton = document.getElementById('filter_lanaguages');
const reviewButton = document.getElementById('filter_reviews');

var loader = document.getElementById("loader-div");
var block = document.getElementById("block");
var budgetFilterFlag = false;
var priceCode = 0;
var delTimeCode = 0;
var languageCode = 0;
var category = 0;
var reviewCode = 0;

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    category = button.value;
        // Update the h1 element's innerHTML with the button's innerHTML
    h1Element.innerHTML = button.innerHTML;

    buttons.forEach(btn => btn.classList.remove("active"));

    // Add the 'active' class to the clicked button
    button.classList.add("active");

    // block.style.display = "none"
    // loader.style.cssText = "";
    activeLoader();


    loadAllPackages(category)
  });
});

function activeLoader(){
  block.style.display = "none"
  loader.style.cssText = "";

}

function removeLoader(){
  block.style.cssText = "";
  loader.style.display = "none";
}

function package(){
  window.location.href = "../HTML/package_view_client.html"
}

document.addEventListener("DOMContentLoaded", loadAllPackages(0))

function loadAllPackages(category){
  fetch(BASE_URL+`/packagelist?category=${category}&price=${priceCode}&delTimeCode=${delTimeCode}&language=${languageCode}&reviewCode=${reviewCode}`, {
    method: 'GET',
    headers: myHeaders,
  })
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
      imgElement.src =package.coverUrl;
      imgElement.style.width = "100%";

      // Create the profile tile div
      var profileTileDiv = document.createElement("div");
      profileTileDiv.classList.add("profile-tile");

      // Create the profile image element
      var profileImgElement = document.createElement("img");
      profileImgElement.src = "../Assests/user_coloured.png";
      profileImgElement.alt = "";
      profileImgElement.classList.add("profile-img");

      // Create the designer name paragraph
      var designerNameParagraph = document.createElement("p");
      designerNameParagraph.classList.add("designer-name");
      designerNameParagraph.textContent = package.designerUserName;

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
      noReviewsParagraph.textContent = package.reviews;

      // Create the number of orders paragraph
      var noOrdersParagraph = document.createElement("p");
      noOrdersParagraph.classList.add("no-orders");
      noOrdersParagraph.textContent = "(" + package.orders+")"; // has to fetch from the order table

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
      removeLoader();
      // block.style.cssText = "";
      // loader.style.display = "none";
  })


}

// Add a click event listener to the Budget button
budgetButton.addEventListener('click', function(event) {
    // Toggle the visibility of the budget dropdown
    budgetDropdown.style.display = (budgetDropdown.style.display === 'none' || budgetDropdown.style.display === '') ? 'block' : 'none';
    delTimeDropdown.style.display = 'none';
    langDropdown.style.display = 'none';
    reviewDropdown.style.display = 'none';
    
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
    reviewDropdown.style.display = 'none';
    
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
    reviewDropdown.style.display = 'none';
    
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

// Add a click event listener to the Budget button
reviewButton.addEventListener('click', function(event) {
    // Toggle the visibility of the budget dropdown
    reviewDropdown.style.display = (reviewDropdown.style.display === 'none' || reviewDropdown.style.display === '') ? 'block' : 'none';
    budgetDropdown.style.display = 'none';
    delTimeDropdown.style.display = 'none';
    langDropdown.style.display = 'none';
    
    // Stop the event propagation to prevent it from reaching the body click event listener
    event.stopPropagation();
});

// Add a click event listener to the document body
document.body.addEventListener('click', function() {
    // Hide the budget dropdown when a click occurs outside of it
    reviewDropdown.style.display = 'none';
});

// Add a click event listener to the budget dropdown to prevent its closure when clicked inside
reviewDropdown.addEventListener('click', function(event) {
    // Stop the event propagation to prevent it from reaching the document body click event listener
    event.stopPropagation();
});


/////// handling filters //////////////////////////////////

//add a budget filter
document.getElementById('btn-budget-apply').addEventListener("click", function(){
  
  activeLoader();

  budgetFilterFlag = true;  

  var budgetCustomInput = document.getElementById('budget-custom');
  var budgetRadioButtons = document.getElementsByName('budget');

  // Function to get the selected radio button value
  function getSelectedRadioValue() {
      for (var i = 0; i < budgetRadioButtons.length; i++) {
          if (budgetRadioButtons[i].checked) {
              return budgetRadioButtons[i].value;
          }
      }
      return null; 
  }

  priceCode = getSelectedRadioValue();
  var budgetValue = ""

  // check whether a radio button is selected
  if (priceCode != null) {

    // if a custon value is entered
    if (priceCode === 'custom') {

      budgetValue = budgetCustomInput.value;

      // if an invalid value is entered
      if (budgetValue < 500) {
        document.getElementById('err_price').innerHTML = "Service starts at Rs.500"
        budgetValue = "-1"
      } else{
        priceCode = budgetValue
        budgetDropdown.style.display = 'none';
      }
    } else{
      budgetDropdown.style.display = 'none';

    }

    console.log("price code: " +priceCode);

    // decide the filters
    var filter_txt =""
    if (budgetValue != "-1") {
      if (priceCode == "1") {
        filter_txt = "Low Under Rs.2000"
      } else if (priceCode == "2"){
        filter_txt = "Mid range Rs.2000 - Rs.5000"
      } else if (priceCode == "3"){
        filter_txt = "High end Rs.5000 and above"
      } else{
        filter_txt = "Budget: Rs."+priceCode
      }

      createFilterBox(filter_txt, "budget")


      // afterwards data fetching
      loadAllPackages(category)
    }



  } else{
    budgetDropdown.style.display = "none"
  }
  

// Example usage:

})

// create filter labels
function createFilterBox(filter_text, filter_type){

  var filter_row =  document.getElementById('filter-row')
  var tag_cloud_span = document.createElement('span');
  tag_cloud_span.classList.add('tag-cloud');

  var paragraph = document.createElement('p');
  paragraph.textContent = filter_text;
  paragraph.classList.add('filter-text-style');

  var closeIcon = document.createElement('i');
  closeIcon.textContent = 'X';
  closeIcon.classList.add('cross-style');
  closeIcon.addEventListener('click', function(){
    filter_row.removeChild(tag_cloud_span);

    // need to check which kind of filter is selected for the removal
    if (filter_type == "budget") {
      removeBudgetFilter();
    } else if (filter_type == "delTime"){
      removeDelTimeFilter();
    } else if (filter_type == "lang"){
      removeLangFilter();
    }
  })

  tag_cloud_span.appendChild(paragraph);
  tag_cloud_span.appendChild(closeIcon);

  filter_row.appendChild(tag_cloud_span);

}


// set the logic of budget filter clear button
document.getElementById('btn-budget-clear').addEventListener('click', function()
{
  document.getElementById('budget-custom').value = '';
  var budgetRadioButtons = document.getElementsByName('budget');

  for (var i = 0; i < budgetRadioButtons.length; i++) {
      budgetRadioButtons[i].checked = false;
      
}
  document.getElementById("err_price").innerHTML =""
  budgetDropdown.style.display = 'none';
  priceCode = 0;
  // loadAllPackages(category)

}
)


// Get the custom radio button and custom input text box
var customInput = document.getElementById('budget-custom');
var customRadioButton = document.getElementById('budget-cust');

// Add event listener to the text box for the focus event
customInput.addEventListener('focus', function() {
    // Check the associated radio button
    customRadioButton.checked = true;

    
});

// remove the budget filter
function removeBudgetFilter(){
  document.getElementById('budget-custom').value = '';
  var budgetRadioButtons = document.getElementsByName('budget');

  for (var i = 0; i < budgetRadioButtons.length; i++) {
      budgetRadioButtons[i].checked = false;
      
  }
  document.getElementById("err_price").innerHTML =""

  console.log("inside remove budget");
  priceCode = 0;

  activeLoader();
  loadAllPackages(category)

}

///////////// add a delivery time filter
document.getElementById('btn-deltime-apply').addEventListener('click', function(){
  activeLoader();

  var delTimeRadioButtons = document.getElementsByName('del-time');

  delTimeCode = getSelectedRadioValue(delTimeRadioButtons)

  console.log("deltime code: " +delTimeCode);

  delTimeDropdown.style.display = 'none';

  var filter_txt = "";
  if (delTimeCode == 1) {
    filter_txt  = "Express 24H";
    createFilterBox(filter_txt, "delTime")
  } else if (delTimeCode == 3) {
    filter_txt  = "Up to 3 days";
    createFilterBox(filter_txt, "delTime")
  } else if (delTimeCode == 7){
    filter_txt  = "Up to 7 days";
    createFilterBox(filter_txt, "delTime")
  }

  // createFilterBox(filter_txt, "delTime")

  // afterwards data fetching
  loadAllPackages(category)
})

// remove the delivary time filter
function removeDelTimeFilter(){

  var delTimeRadioButtons = document.getElementsByName('del-time');

  for (var i = 0; i < delTimeRadioButtons.length; i++) {
    delTimeRadioButtons[i].checked = false;
      
  }
  delTimeCode = 0;

  activeLoader();
  loadAllPackages(category)

  document.getElementById("any_time").checked = true;
}

// set the logic of delivary time filter clear button
document.getElementById('btn-deltime-clear').addEventListener('click', function()
{
  var delTimeRadioButtons = document.getElementsByName('del-time');

  for (var i = 0; i < delTimeRadioButtons.length; i++) {
    delTimeRadioButtons[i].checked = false;
      
}
  
  delTimeDropdown.style.display = 'none';
  delTimeCode = 0;
  // loadAllPackages(category)

}
)

//////// add language filter ////
document.getElementById('btn-lang-apply').addEventListener('click', function(){
  activeLoader();

  var langRadioButtons = document.getElementsByName('lang');

  languageCode = getSelectedRadioValue(langRadioButtons)

  console.log("lang code: " +languageCode);

  langDropdown.style.display = 'none';

  var filter_txt = "";
  if (languageCode == 1) {
    filter_txt = "English";
    createFilterBox(filter_txt, "lang")
  } else if (languageCode == 2) {
    filter_txt = "Sinhala (සිංහල)";
    createFilterBox(filter_txt, "lang")
  } else if (languageCode == 3) {
    filter_txt = "Tamil (தமிழ்)";
    createFilterBox(filter_txt, "lang")
  }

  // afterwards data fetching
  loadAllPackages(category)
})

// remove the language filter

function removeLangFilter(){

  var langRadioButtons = document.getElementsByName('lang');

  for (var i = 0; i < langRadioButtons.length; i++) {
    langRadioButtons[i].checked = false;
      
  }
  languageCode = 0;

  activeLoader();
  loadAllPackages(category)

  document.getElementById("any_lang").checked = true;
}

// set the logic of language filter clear button
document.getElementById('btn-lang-clear').addEventListener('click', function()
{
  var langRadioButtons = document.getElementsByName('lang');
  
  for (var i = 0; i < langRadioButtons.length; i++) {
    langRadioButtons[i].checked = false;

  }

  langDropdown.style.display = 'none';
  languageCode = 0;

})


function getSelectedRadioValue(radiobtnset) {
  for (var i = 0; i < radiobtnset.length; i++) {
      if (radiobtnset[i].checked) {
          return radiobtnset[i].value;
      }
  }
  return null; 
}


///////////////////////////////////////////////////////////

/* by CodePel 
* www.codepel.com
*/
var sheet = document.createElement('style');
var rangeInput = document.querySelectorAll('.range input');
var prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {
  var curVal = el.value;
  var val = (curVal - 1) * 16.666666667;
  var style = '';

  // Set active label
  var rangeLabels = document.querySelectorAll('.range-labels li');
  rangeLabels.forEach(function (label) {
    label.classList.remove('active', 'selected');
  });

  var curLabel = document.querySelector('.range-labels li:nth-child(' + curVal + ')');

  curLabel.classList.add('active', 'selected');
  var prevLabels = Array.from(curLabel.previousElementSibling);
  prevLabels.forEach(function (label) {
    label.classList.add('selected');
  });

  // Change background gradient
  for (var i = 0; i < prefs.length; i++) {
    style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
    style += '.range input::-'+ prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
  }

  return style;
};

rangeInput.forEach(function (input) {
  input.addEventListener('input', function () {
    sheet.textContent = getTrackStyle(this);
  });
});

// Change input value on label click
var rangeLabels = document.querySelectorAll('.range-labels li');
rangeLabels.forEach(function (label) {
  label.addEventListener('click', function () {
    var index = Array.from(rangeLabels).indexOf(label);
    rangeInput.forEach(function (input) {
      input.value = index + 1;
      input.dispatchEvent(new Event('input'));
    });
  });
});




