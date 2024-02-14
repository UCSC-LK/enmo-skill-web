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

    let userLevel = getCookie("UserLevel");
  if(userLevel=="CUSTOMER"){
    url="/Components/navbar_customer.html"
  }else if(userLevel=="DESIGNER"){
    url="/Components/navbar_seller.html"
  }else if(userLevel=="ADMIN"){
    url="/Components/navbar_admin.html"
  }else if(userLevel=="CSA"){
    url="/Components/navbar_cs.html"
  }else{
    url="/Components/navbar_no_user.html"
  }


  function loadHeaderBar(url) {
    // Specify the path to the header HTML file based on the user role
    
    
    // Use fetch to get the header HTML file
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load header bar');
        }
        return response.text();
      })
      .then(html => {
        // Create a new DOM element to hold the HTML content
        var headerElement = document.createElement('div');
        headerElement.innerHTML = html;

        // Append the header content to the placeholder
        document.getElementById('header-placeholder').appendChild(headerElement);

        // Execute scripts in the loaded HTML content
        var scripts = headerElement.querySelectorAll('script');
        scripts.forEach(script => {
          var newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          script.parentNode.replaceChild(newScript, script);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Call the function to load the appropriate header bar
  loadHeaderBar(url);