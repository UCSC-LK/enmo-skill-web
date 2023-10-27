document.addEventListener("DOMContentLoaded", functionCall);

function functionCall() {
  // Replace 'YOUR_API_URL' with the actual URL where your JSON data is hosted.
  const apiUrl = 'http://localhost:15000/enmo_skill_backend_war/package';

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Assuming data is an array of objects similar to your active_packages.
      data.forEach((element) => {
        console.log(element);
        if (element.status == "paused") {
            
            const table = document.getElementById('package_table');
            const tr = document.createElement('tr');
    
            // const th_src = document.createElement('th');
            // const img = document.createElement('img');
            // img.src = element.coverUrl;
            // img.setAttribute('width', '30px');
            // th_src.appendChild(img);
            // tr.appendChild(th_src);
    
            const th_title = document.createElement('th');
            th_title.innerHTML = element.title;
            th_title.setAttribute('class', 'col');
            tr.appendChild(th_title);
    
            const th_clicks = document.createElement('th');
            th_clicks.innerHTML = element.clicks;
            tr.appendChild(th_clicks);
    
            const th_orders = document.createElement('th');
            th_orders.innerHTML = element.orders;
            tr.appendChild(th_orders);
    
            const th_cancellations = document.createElement('th');
            th_cancellations.innerHTML = element.cancellations;
            tr.appendChild(th_cancellations);
    
            const th_buttons = document.createElement('th');
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
    
            span.appendChild(btn1);
            span.appendChild(btn2);
            span.appendChild(btn3);
    
            th_buttons.appendChild(span);
            tr.appendChild(th_buttons);
    
            table.appendChild(tr);
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
  const updae_form_url = "http://127.0.0.1:5500/HTML/package_overview.html"

  const url = updae_form_url +
                '?packageId='+encodeURIComponent(selectedData.packageId)+
                '&title=' + encodeURIComponent(selectedData.title) +
                '&category=' + encodeURIComponent(selectedData.category) +
                '&description=' + encodeURIComponent(selectedData.description);

  window.location = url;


}

function deletePackage(selectedData) {
  const packageId = selectedData.packageId;
  const title = selectedData.title;

  // Show a confirmation dialog to confirm deletion
  const flag = confirm(`Do you want to delete package with title: ${title}`);

  if (flag) {
    const deleteUrl = `http://localhost:15000/enmo_skill_backend_war/package?packageId=${packageId}`;

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // You can adjust the content type if needed
      },
      body: JSON.stringify(selectedData),
    })
      .then((response) => {
        if (response.ok) {
          // Successful deletion, you can handle this as needed
          console.log(`Package with packageId ${packageId} deleted successfully.`);
          window.location = "http://127.0.0.1:5500/HTML/view_paused_packages.html"
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
