function getCookies(cookieName) {
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

    let user = getCookies("UserLevel");
  if(user=="CUSTOMER"){
    window.location.href = "../HTML/login.html";
  }else if(user=="DESIGNER"){
    url="/Components/sidebar_seller.html"
  }else if(user=="ADMIN"){
    url="/Components/sidebar_admin.html"
  }else if(user=="CSA"){
    url="/Components/sidebar_cs.html"
  }else{
    window.location.href = "../HTML/login.html";
  }


  function loadSideBar(url) {
    
    
    
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load header bar');
        }
        return response.text();
      })
      .then(html => {
        
        var headerElement = document.createElement('div');
        headerElement.innerHTML = html;

        
        document.getElementById('sidebar-placeholder').appendChild(headerElement);

        
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
  loadSideBar(url);