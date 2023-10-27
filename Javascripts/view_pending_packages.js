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
        if (element.status == "pending") {
            
            const table = document.getElementById('package_table');
            const tr = document.createElement('tr');
    
            const th_src = document.createElement('th');
            const img = document.createElement('img');
            img.src = element.coverUrl;
            img.setAttribute('width', '30px');
            th_src.appendChild(img);
            tr.appendChild(th_src);
    
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
