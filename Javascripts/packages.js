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

// const UserId = getCookie("User_ID");

var myHeaders = new Headers();                          ///important
myHeaders.append("Content-Type", "application/json");   ///important
myHeaders.append("Authorization", getCookie("JWT"));    ///important

var raw = JSON.stringify({});

document.addEventListener("DOMContentLoaded", laodActivePkg);

const act = document.getElementById("active")
const pend = document.getElementById("pending")
const paus = document.getElementById("paused")

act.addEventListener("click", laodActivePkg)
pend.addEventListener("click", laodPendingPkg)
paus.addEventListener("click", laodPausedPkg)

function laodActivePkg() {
  // Replace 'YOUR_API_URL' with the actual URL where your JSON data is hosted.
  // const apiUrl = 'http://localhost:15000/enmo_skill_backend_war/package'; not needed

    act.setAttribute("class", "active")
    pend.removeAttribute("class", "active")
    paus.removeAttribute("class", "active")

    document.getElementById("title").innerHTML = "Active Packages"

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,                                   ///important
      body: raw,
      redirect: 'follow'
    };

    // console.log(BASE_URL+"/package");
  fetch(BASE_URL+"/package?UserId="+UserId+"&packageId="+0, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Assuming data is an array of objects similar to your active_packages.

        const content = document.getElementById('content');
        content.innerHTML = ""

      data.forEach((element) => {

        const row = document.createElement('div');
        row.setAttribute("class", "row")
        
        if (element.status == "active") {
            
            const p_img = document.createElement('p')
            const img = document.createElement('img')
            p_img.setAttribute("class", "pkg-img")
            img.setAttribute("src", element.coverUrl)
            p_img.appendChild(img)
            row.appendChild(p_img)
    
            const p_title = document.createElement('p');
            p_title.innerHTML = element.title;
            p_title.setAttribute('class', 'pakg');
            row.appendChild(p_title);
    
            const p_clicks = document.createElement('p');
            p_clicks.innerHTML = element.clicks;
            p_clicks.setAttribute("class", "clicks")
            row.appendChild(p_clicks);
    
            const p_orders = document.createElement('p');
            p_orders.innerHTML = element.orders;
            p_orders.setAttribute("class", "orders")
            row.appendChild(p_orders);
    
            const p_cancellations = document.createElement('p');
            p_cancellations.innerHTML = element.cancellations;
            p_cancellations.setAttribute("class", "cancellations")
            row.appendChild(p_cancellations);
    
            const p_buttons = document.createElement('p');
            const span = document.createElement('span');
            const btn1 = document.createElement('button');
            const btn2 = document.createElement('button');
            const btn3 = document.createElement('button');
    
            btn1.setAttribute('class', 'pause-icon');
            btn2.setAttribute('class', 'edit-icon');
            btn3.setAttribute('class', 'delete-icon');

             // adding attributes
             btn1.setAttribute("id", "pause-package");
             btn2.setAttribute("id", "update-package");
             btn3.setAttribute("id", "delete-package");
 
             // Add a click event listener to the "update" button
             btn2.addEventListener('click', () => {
               // Call a function to populate the form with data from the selected row
               populateForm(element);
             });

            btn3.addEventListener("click",()=>{
              deletePackage(element)
            })

            btn1.addEventListener("click", ()=>{
              changeStatus("paused", element)
            })
    
            span.appendChild(btn1);
            span.appendChild(btn2);
            span.appendChild(btn3);
    
            p_buttons.appendChild(span);
            row.appendChild(p_buttons);
    
            content.appendChild(row);
        }
       
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function laodPausedPkg() {
    // Replace 'YOUR_API_URL' with the actual URL where your JSON data is hosted.
    // const apiUrl = 'http://localhost:15000/enmo_skill_backend_war/package';

    paus.setAttribute("class", "active")
    pend.removeAttribute("class", "active")
    act.removeAttribute("class", "active")

    document.getElementById("title").innerHTML = "Paused Packages"

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,                                   ///important
      body: raw,
      redirect: 'follow'
    };
  
    fetch(BASE_URL+"/package?UserId="+UserId+"&packageId="+0, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an array of objects similar to your active_packages.

        const content = document.getElementById('content');
        
        content.innerHTML = ""

        data.forEach((element) => {
          
          if (element.status == "paused") {
              
            const row = document.createElement('div');
            row.setAttribute("class", "row")
    
      
              // const th_src = document.createElement('th');
              // const img = document.createElement('img');
              // img.src = element.coverUrl;
              // img.setAttribute('width', '30px');
              // th_src.appendChild(img);
              // tr.appendChild(th_src);
  
              const p_img = document.createElement('p')
              const img = document.createElement('img')
              p_img.setAttribute("class", "pkg-img")
              img.setAttribute("src", element.coverUrl)
              p_img.appendChild(img)
              row.appendChild(p_img)
      
              const p_title = document.createElement('p');
              p_title.innerHTML = element.title;
              p_title.setAttribute('class', 'pakg');
              row.appendChild(p_title);
      
              const p_clicks = document.createElement('p');
              p_clicks.innerHTML = element.clicks;
              p_clicks.setAttribute("class", "clicks")
              row.appendChild(p_clicks);
      
              const p_orders = document.createElement('p');
              p_orders.innerHTML = element.orders;
              p_orders.setAttribute("class", "orders")
              row.appendChild(p_orders);
      
              const p_cancellations = document.createElement('p');
              p_cancellations.innerHTML = element.cancellations;
              p_cancellations.setAttribute("class", "cancellations")
              row.appendChild(p_cancellations);
      
              const p_buttons = document.createElement('p');
              const span = document.createElement('span');
              const btn1 = document.createElement('button');
              const btn2 = document.createElement('button');
              const btn3 = document.createElement('button');
      
              btn1.setAttribute('class', 'upload-icon');
              btn2.setAttribute('class', 'edit-icon');
              btn3.setAttribute('class', 'delete-icon');
  
               // adding attributes
               btn1.setAttribute("id", "unpause-package");
               btn2.setAttribute("id", "update-package");
               btn3.setAttribute("id", "delete-package");
   
               // Add a click event listener to the "update" button
               btn2.addEventListener('click', () => {
                 // Call a function to populate the form with data from the selected row
                 populateForm(element);
               });
  
              btn3.addEventListener("click",()=>{
                deletePackage(element)
              })

              btn1.addEventListener("click", ()=>{
                changeStatus("active", element)
              })
      
              span.appendChild(btn1);
              span.appendChild(btn2);
              span.appendChild(btn3);
      
              p_buttons.appendChild(span);
              row.appendChild(p_buttons);
      
              content.appendChild(row);
          }
         
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

function laodPendingPkg() {
  // Replace 'YOUR_API_URL' with the actual URL where your JSON data is hosted.
  const apiUrl = 'http://localhost:15000/enmo_skill_backend_war/package';

    pend.setAttribute("class", "active")
    act.removeAttribute("class", "active")
    paus.removeAttribute("class", "active")

    document.getElementById("title").innerHTML = "Pending Packages"

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,                                   ///important
      body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL+"/package?UserId="+UserId+"&packageId="+0, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Cannot get data');
      }
      return response.json();
    })
    .then((data) => {
      // Assuming data is an array of objects similar to your active_packages.

        const content = document.getElementById('content');
        content.innerHTML = ""
        
      
      data.forEach((element) => {
        
        if (element.status == "pending") {
            
            const row = document.createElement('div');
            row.setAttribute("class", "row")
    
            const p_img = document.createElement('p')
            const img = document.createElement('img')
            p_img.setAttribute("class", "pkg-img")
            img.setAttribute("src", element.coverUrl)
            p_img.appendChild(img)
            row.appendChild(p_img)
    
            const p_title = document.createElement('p');
            p_title.innerHTML = element.title;
            p_title.setAttribute('class', 'pakg');
            row.appendChild(p_title);
    
            const p_clicks = document.createElement('p');
            p_clicks.innerHTML = element.clicks;
            p_clicks.setAttribute("class", "clicks")
            row.appendChild(p_clicks);
    
            const p_orders = document.createElement('p');
            p_orders.innerHTML = element.orders;
            p_orders.setAttribute("class", "orders")
            row.appendChild(p_orders);
    
            const p_cancellations = document.createElement('p');
            p_cancellations.innerHTML = element.cancellations;
            p_cancellations.setAttribute("class", "cancellations")
            row.appendChild(p_cancellations);
    
            const p_buttons = document.createElement('p');
            const span = document.createElement('span');

            span.setAttribute("style","opacity:0.5;")
            const btn1 = document.createElement('button');
            const btn2 = document.createElement('button');
            const btn3 = document.createElement('button');
    
            btn1.setAttribute('class', 'pause-icon');
            btn2.setAttribute('class', 'edit-icon');
            btn3.setAttribute('class', 'delete-icon');

             // adding attributes
             btn1.setAttribute("id", "pause-package");
             btn2.setAttribute("id", "update-package");
             btn3.setAttribute("id", "delete-package");
 
             //Add a click event listener to the "update" button
             btn2.addEventListener('click', () => {
               // Call a function to populate the form with data from the selected row
               alert("Pending package cannot be updated")
             });

            btn3.addEventListener("click",()=>{
              alert("Pending package cannot be deleted")

            })
    
            // span.appendChild(btn1);
            span.appendChild(btn2);
            span.appendChild(btn3);
    
            p_buttons.appendChild(span);
            row.appendChild(p_buttons);
    
            content.appendChild(row);
        }
       
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to populate the HTML form with data from the selected row
function populateForm(selectedData) {
  // Assuming you have a form element with the id "update-form"
  const updae_form_url = "../HTML/package_overview.html"

  const url = updae_form_url +
                '?packageId='+encodeURIComponent(selectedData.packageId)
                // '&title=' + encodeURIComponent(selectedData.title) +
                // '&category=' + encodeURIComponent(selectedData.category) +
                // '&description=' + encodeURIComponent(selectedData.description);

  window.location = url;


}

function deletePackage(selectedData) {
  const packageId = selectedData.packageId;
  const title = selectedData.title;

  // Show a confirmation dialog to confirm deletion
  const flag = confirm(`Do you want to delete package with title: ${title}`);

  if (flag) {
    const deleteUrl = `http://localhost:15000/enmo_skill_backend_war/package?packageId=${packageId}`;

    fetch(BASE_URL+"/package?packageId="+packageId+"&UserId="+UserId, {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify(selectedData),
    })
      .then((response) => {
        if (response.ok) {
          // Successful deletion, you can handle this as needed
          console.log(`Package with packageId ${packageId} deleted successfully.`);
          location.replace(location.href);
        } else {
          // Handle errors
          alert("Failed to delete package");
          console.error(`Failed to delete package with packageId ${packageId}.`);
        }
      })
      .catch((error) => {
        console.error('Error deleting package:', error);
      });
  }
}

document.getElementById("create").addEventListener("click", function(){
  window.location.href = '../HTML/package_overview.html'
})

function changeStatus(newStatus, selectedData){
  const packageId = selectedData.packageId;
  selectedData.status = newStatus

  const updateUrl = `http://localhost:15000/enmo_skill_backend_war/package?packageId=${packageId}`;

  fetch(BASE_URL+"/package?packageId="+packageId+"&UserId="+UserId, {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(selectedData),
  })
    .then((response) => {
      if (response.ok) {
        // Successful deletion, you can handle this as needed

        if (newStatus == "paused") {
          // laodPausedPkg()
          laodActivePkg()
        } else {
          laodActivePkg()
        }
       
        
        // Handle errors
        // alert("Failed to delete package");
        console.error(`status changed with packageId ${packageId}.`);
      }
    })
    .catch((error) => {
      console.error('Error updating status:', error);
    });



}
