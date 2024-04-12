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
  // console.log("iD: " + getCookie("User_ID"));
  
  const UserId = getCookie("User_ID");
  
  var myHeaders = new Headers();                          ///important
  myHeaders.append("Content-Type", "application/json");   ///important
  myHeaders.append("Authorization", getCookie("JWT"));    ///important
  
  var raw = JSON.stringify({});

  document.addEventListener("DOMContentLoaded", function(){

    var note1 = document.getElementById("note1");
    var note2 = document.getElementById("note2");
    var note3 = document.getElementById("note3");

const p1 = document.getElementById("note1").querySelector("p");
const p2 = document.getElementById("note2").querySelector("p");
const p3 = document.getElementById("note3").querySelector("p");

typeWriter(p1, "Pending orders", 50);
typeWriter(p2, "Total earnings", 50);
typeWriter(p3, "Ratings", 50);

  })

  function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
