const url = new URL(window.location.href);
const key = url.searchParams.get('key');
const box1 = document.querySelector('.box1');
const box = document.querySelector('.box');
const text = document.querySelector('.reason');

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var requestOptions = {
  method: 'POST',
  headers: myHeaders
};

fetch(BASE_URL + '/validate?key=' + key, requestOptions)
  .then(response => {
    if (response.status === 409 || response.status === 410 || response.status === 401) {
      box.style.display = 'none'; // Hide box1
      box1.style.display = 'flex'; // Display box
      console.log("bad");
      return response.text(); // Return text content for other error codes
    } else if (response.status === 200) {
      return response.json(); // Parse response as JSON for status 200
    } else {
      throw new Error('Unexpected response');
    }
  })
  .then(data => {
    if (data && data.UserId) {
      const USERID = data.UserId; // Assign UserId to USERID variable
      console.log(data); // Log the entire JSON response
      window.location.href = "../HTML/login.html" 
    } else {
      text.textContent = data; // Set text content from response for non-200 status
    }
  })
  .catch(error => console.error('Error:', error));
