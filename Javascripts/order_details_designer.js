document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to all download buttons
  const downloadButtons = document.querySelectorAll(".download-icon");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the URL of the relevant work associated with this record
      const workURL = this.parentElement.querySelector(".work").textContent;
      // Trigger download of the file
      window.open(workURL, "_blank");
    });
  });

  const dropdownBtn = document.getElementById("dropdownBtn");
  const orderDetails = document.querySelector(".row-main");
  const dropdownContent = document.querySelector(".dropdown-contentup");
  orderDetails.style.height = "40px"; // Set initial height
  dropdownContent.style.display = "none"; // Hide dropdown content initially

  dropdownBtn.addEventListener("click", function () {
    orderDetails.classList.toggle("expanded");
    dropdownContent.style.display = orderDetails.classList.contains("expanded")
      ? "block"
      : "none"; // Show/hide dropdown content based on the expanded class
    if (orderDetails.classList.contains("expanded")) {
      const contentHeight = dropdownContent.scrollHeight;
      orderDetails.style.height = 60 + contentHeight + "px"; // Add static height to the content height
    } else {
      orderDetails.style.height = "40px"; // Reset to initial static height
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.getElementById("dropdownBtn2");
  const orderDetails = document.querySelector(".row-n");
  const dropdownContent = document.querySelector(".dropdown-content2");
  orderDetails.style.height = "40px"; // Set initial height
  dropdownContent.style.display = "none"; // Hide dropdown content initially

  dropdownBtn.addEventListener("click", function () {
    orderDetails.classList.toggle("expanded");
    dropdownContent.style.display = orderDetails.classList.contains("expanded")
      ? "block"
      : "none"; // Show/hide dropdown content based on the expanded class
    if (orderDetails.classList.contains("expanded")) {
      const contentHeight = dropdownContent.scrollHeight;
      orderDetails.style.height = 40 + contentHeight + "px"; // Add static height to the content height
    } else {
      orderDetails.style.height = "40px"; // Reset to initial static height
    }
  });
});
// Get the file input element
// const fileInput = document.getElementById("fileInput");

// // Add event listener to the icon wrapper to trigger file input click
// document.querySelector(".icon-wrapper2").addEventListener("click", function () {
//   fileInput.click();
// });

// Add event listener to the file input to handle file selection
// fileInput.addEventListener("change", function () {
//   const selectedFile = this.files[0]; // Get the selected file
//   console.log("Selected file:", selectedFile);

//   // Check if a file is selected
//   if (selectedFile) {
//     // Create a box element
//     const box = document.createElement("div");
//     box.classList.add("uploaded-file-box");
//     box.textContent = selectedFile.name; // Display file name in the box

//     // Append the box to a container element
//     const container = document.querySelector(".uploaded-files-container");
//     container.appendChild(box);
//   }
// });

// //Timer

// // Set the due time for the timer (e.g., 1 hour from the current time)
// const dueTime = new Date().getTime() + 3600000; // 3600000 milliseconds = 1 hour

// // Function to update the timer every second
// function updateTimer() {
//     const now = new Date().getTime(); // Get the current time
//     const distance = dueTime - now; // Calculate the remaining time

//     // Calculate hours, minutes, and seconds
//     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     // Display the remaining time in the timer
//     document.getElementById('hours').innerText = formatTime(hours);
//     document.getElementById('minutes').innerText = formatTime(minutes);
//     document.getElementById('seconds').innerText = formatTime(seconds);

//     // Check if the timer has expired
//     if (distance < 0) {
//         clearInterval(timerInterval); // Stop the timer interval
//         // You can add code here to handle what happens when the timer expires
//     }
// }

// // Function to format time values (add leading zeros)
// function formatTime(time) {
//     return time < 10 ? '0' + time : time;
// }

// // Update the timer every second
// const timerInterval = setInterval(updateTimer, 1000);

// // Call updateTimer once immediately to avoid delay in displaying the timer
// updateTimer();

function getOrderIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("order_id");
  return orderId;
}

// Example usage:
const orderId = getOrderIDFromURL();
console.log("Order ID:", orderId);

const orderIDParagraph = document.querySelector("p.orderID");
orderIDParagraph.textContent = orderId;

// const list = document.getElementById("table");
const list2 = document.getElementById("table2");
const child = document.querySelector(".row-hidden");

while (list2.firstChild) {
  list2.removeChild(list2.firstChild);
}

const JWTTOk = getCookie("JWT");
console.log("Token " + JWTTOk);

var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", getCookie("JWT"));

var requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${JWTTOk}`, // Add JWT token to the headers
  },
  Credential: "include",
};

console.log("requestOptions" + requestOptions);

fetch(`${BASE_URL}/orderDetails?orderID=${orderId}`, requestOptions)
  .then((response) => {
    console.log("RES " + response);
    return response.json(); // First, convert to text to check it
  })
  .then((result) => {
    console.log("result " + result);
    console.log("Parsed JSON result:", result); // Log the parsed JSON

    let deliveryNumber = 1; // Initialize delivery number
    result.forEach((item, index) => {
      const newItem = child.cloneNode(true);
      console.log("NEwItem" + newItem);

      console.log("ITEEEEEEEEEEM", item.createdTime);

      const deliveryDate = new Date(item.createdTime);
      const month = deliveryDate.toLocaleString("default", {
        month: "short",
      }); // Get the abbreviated month name
      const date = deliveryDate.getDate(); // Get the day of the month
      const hour = deliveryDate.getHours();
      const minute = deliveryDate.getMinutes();

      const formattedDeliveryDate2 = `${month} ${date}, ${hour}:${minute}`;
      const formattedDeliveryDate = `${month} ${date}`;
      newItem.querySelector(".user-np").textContent = formattedDeliveryDate;
      newItem.querySelector(".tabledata").textContent = formattedDeliveryDate2;

      // Check if deliver_work is null or undefined
      // if (item.deliver_work === null || item.deliver_work === undefined) {
      //   const removeDiv = newItem.querySelector(".remove");
      //   console.log("Remove Div:", removeDiv); // Check if removeDiv is selected correctly
      //   if (removeDiv) {
      //     removeDiv.style.display = "none"; // Hide the div instead of removing it, if needed again
      //     console.log("Removed .remove div");
      //   } else {
      //     console.log(".remove div not found");
      //   }

      //   // Find and disable the download icon
      //   const downloadIcon = newItem.querySelector(".download-icon");
      //   if (downloadIcon) {
      //     downloadIcon.style.pointerEvents = "none"; // Disable interaction
      //     downloadIcon.style.opacity = "0.5"; // Visually indicate it's disabled
      //   }
      //   return;
      // } else {
      // Check if the work content is an image URL
      if (
        item.deliver_work.includes(".jpg") ||
        item.deliver_work.includes(".png") ||
        item.deliver_work.includes(".jpeg") ||
        item.deliver_work.includes(".gif")
      ) {
        // Create an <img> element for displaying the image
        const imageElement = document.createElement("img");
        imageElement.src = item.deliver_work;
        imageElement.alt = "Work Image";
        newItem.querySelector(".work").appendChild(imageElement);
      }
      // } else {
      //   // If it's not an image URL, simply display the text
      //   newItem.querySelector(".work").textContent = item.deliver_work;
      // }

      const downloadIcon = newItem.querySelector(".download-icon");

      // Add event listener to the download icon
      downloadIcon.addEventListener("click", function () {
        // Create an anchor element
        const downloadLink = document.createElement("a");
        downloadLink.href = item.deliver_work;
        downloadLink.download = "work_image.jpg"; // Specify the filename for download
        downloadLink.click(); // Simulate click to start download
      });
      // }

      // Set delivery number based on index
      if (index % 2 === 0) {
        newItem.querySelector(
          ".table_inside2"
        ).textContent = `DELIVERY #${deliveryNumber}`;
        newItem.querySelector(".message-text").textContent =
          item.designer_message;
        newItem.querySelector(".mescont").textContent = "You sent message";
        newItem.querySelector(".up").textContent = "You delivered the order";
      } else if (index % 2 === 1) {
        newItem.querySelector(".mescont").textContent = "You recieved message";
        newItem.querySelector(".up").textContent = "You recieved the message";

        newItem.querySelector(".message-text").textContent =
          item.client_message;
        // newItem.querySelector(".up").textContent = "You recieved the message";

        //Remove the Atachment part when no dilivery work
        const removeDiv = newItem.querySelector(".remove");
        console.log("Remove Div:", removeDiv); // Check if removeDiv is selected correctly
        if (removeDiv) {
          removeDiv.style.display = "none"; // Hide the div instead of removing it, if needed again
          console.log("Removed .remove div");
        } else {
          console.log(".remove div not found");
        }
        deliveryNumber = deliveryNumber + 1;
      }

      newItem.classList.remove("row-hidden");
      newItem.classList.add("row");
      list2.appendChild(newItem);
    });
  })
  .catch((error) => {
    console.error("Error during fetch or processing:", error);
  });

//To fetch PackagedID

async function getPackageID(orderID) {
  const JWTTOk = getCookie("JWT");
  console.log("Token" + JWTTOk);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", getCookie("JWT"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    Credential: "include",
  };

  console.log("requestOptions" + requestOptions);

  try {
    const response = await fetch(
      BASE_URL + `/order?orderId=${orderID}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data_1 = await response.json();
    // Assuming the response data contains packageID
    console.log("Data", data_1);
    const packageID = data_1[0].packageId; // Access the packageId property from the first object in the array
    const Price = data_1[0].price; // Access the packageId property from the first object in the array
    const Client_ID = data_1[0].clientId; // Access the packageId property from the first object in the array
    const createdTime = data_1[0].createdTime; // Access the packageId property from the first object in the array
    const requirements = data_1[0].requirements; // Access the packageId property from the first object in the array
    const status = data_1[0].status; // Access the packageId property from the first object in the array
    const package_title = data_1[0].package_title;
    console.log("PackageID", packageID);
    console.log("Priceee", Price);
    console.log("Client_ID", Client_ID);
    console.log("requirements", requirements);
    return {
      packageID,
      Price,
      Client_ID,
      createdTime,
      requirements,
      status,
      package_title,
    };
  } catch (error) {
    console.error("Error fetching packageID:", error);
    return null;
  }
}

//Fetch packageDuration

async function getDeliveryDuration(packageID) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("JWT"), // Assuming you have a function to retrieve JWT token from cookies
    },
    Credential: "include",
  };

  try {
    const response = await fetch(
      BASE_URL + `/packagepricing?packageId=${packageID}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Assuming the response data contains delivery_duration
    const deliveryDuration = data[0].deliveryDuration;
    console.log("PackageID", deliveryDuration);
    return deliveryDuration;
  } catch (error) {
    console.error("Error fetching delivery duration:", error);
    return null;
  }
}

const orderId2 = getOrderIDFromURL();
const orderElement1 = document.querySelector(".orderID");
orderElement1.textContent = orderId2;

getPackageID(orderId2)
  .then(async (result) => {
    console.log("Received from getPackageID:", result);
    const {
      packageID,
      Price,
      Client_ID,
      createdTime,
      requirements,
      status,
      package_title,
    } = result; // Extract packageID and price
    console.log("Package ID:", packageID);
    console.log("Price:", Price);
    console.log("ClientID:", Client_ID);
    console.log("createdTime:", createdTime);
    console.log("requirements:", requirements);
    console.log("status:", status);

    // Call getDeliveryDuration and pass both price and the result of getDeliveryDuration to the next then
    const deliveryDuration = await getDeliveryDuration(packageID);
    const clientName = await getClientName(Client_ID);

    console.log("Delivery Duration:", deliveryDuration);

    // Calculate end time based on delivery duration
    const endTime = calculateEndTime(createdTime, deliveryDuration);
    console.log("End Time:", endTime);

    console.log("clientName:", clientName);
    return {
      deliveryDuration,
      Price,
      clientName,
      createdTime,
      requirements,
      status,
      endTime,
      package_title,
    };
  })
  .then(
    ({
      deliveryDuration,
      Price,
      clientName,
      createdTime,
      requirements,
      status,
      endTime,
      package_title,
    }) => {
      // Destructure both in the next then
      console.log("Delivery Duration:", deliveryDuration);
      console.log("Price:", Price);
      console.log("createdTime:", createdTime);
      console.log("status:", status);

      updateTimer(endTime);
      // Parse the date string
      const deliveryDate = new Date(createdTime);
      const month = deliveryDate.toLocaleString("default", { month: "short" });
      const day = deliveryDate.getDate();
      const hour = deliveryDate.getHours();
      const minute = deliveryDate.getMinutes();

      const formattedDeliveryDate = `${month} ${day}, ${hour}:${minute}`;
      const formattedDeliveryDate2 = `${month} ${day}`;

      const durationElement = document.querySelector(".Duration");
      const priceElement = document.querySelector(".Price");
      const packageElement = document.querySelector(".package");
      const clientNameElement1 = document.querySelector(".ClientName1");
      const clientNameElement2 = document.querySelector(".ClientName2");
      const createdTime1 = document.querySelector(".date1");
      const createdTime2 = document.querySelector(".date2");
      const createdTime3 = document.querySelector(".date3");
      const createdDate = document.querySelector(".user-n");
      const requirementsCl = document.querySelector(".table3_content");

      durationElement.textContent = deliveryDuration;
      priceElement.textContent = Price;
      packageElement.textContent = package_title;
      clientNameElement1.textContent = clientName;
      clientNameElement2.textContent = clientName;
      createdTime1.textContent = formattedDeliveryDate;
      createdTime2.textContent = formattedDeliveryDate;
      createdTime3.textContent = formattedDeliveryDate;
      createdDate.textContent = formattedDeliveryDate2;
      requirementsCl.textContent = requirements;

      if (status === 2 || status === 3 || status === 4) {
        const deliverybu = document.querySelector(".deliverybu");
        deliverybu.style.display = "none";
      }
    }
  )
  .catch((error) => {
    console.error("Error:", error);
  });

// Get Client Name
async function getClientName(ClientID) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("JWT"), // Assuming you have a function to retrieve JWT token from cookies
    },
    Credential: "include",
  };

  try {
    const response = await fetch(
      BASE_URL + `/user?userId=${ClientID}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Assuming the response data contains the user object with username
    const name = data.user.name; // Extract username from the user object
    return name;
  } catch (error) {
    console.error("Error fetching client name:", error);
    return null;
  }
}

// // Function to calculate end date and time based on createdTime and delivery duration
// function calculateEndTime(createdTime, deliveryDuration) {
//     // Convert createdTime to a Date object
//     const startTime = new Date(createdTime);

//     // Calculate end time by adding delivery duration (in minutes) to startTime
//     const endTime = new Date(startTime.getTime() + deliveryDuration * 60000); // Convert minutes to milliseconds

//     return endTime;
// }

// // Function to update the timer every second
//     updateTimer(endTime, timerInterval);
//     function updateTimer(endTime) {
//       const now = new Date().getTime(); // Get the current time
//       const distance = endTime - now; // Calculate the remaining time

//       // Calculate days, hours, minutes, and seconds
//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       // Display the remaining time in the timer
//       document.getElementById("days").innerText = days;
//       document.getElementById("hours").innerText = formatTime(hours);
//       document.getElementById("minutes").innerText = formatTime(minutes);
//       document.getElementById("seconds").innerText = formatTime(seconds);

//       // Check if the timer has expired
//       if (distance < 0) {
//         clearInterval(timerInterval); // Stop the timer interval
//         // You can add code here to handle what happens when the timer expires
//       }
//     }

// // Function to format time values (add leading zeros)
// function formatTime(time) {
//     return time < 10 ? '0' + time : time;
// }

// Call getPackageID to fetch package details
// const orderId2 = getOrderIDFromURL();
// getPackageID(orderId2)
//   .then((result) => {
//     const { packageID, createdTime } = result;

//     // Call getDeliveryDuration to fetch delivery duration
//     return getDeliveryDuration(packageID).then((deliveryDuration) => {
//       const endTime = calculateEndTime(createdTime, deliveryDuration);
//       console.log(" endTime", endTime);
//       return { endTime };
//     });
//   })
//   .then(({ endTime }) => {
//     // Start the timer
//     updateTimer(endTime);

//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

function updateTimer(endTime) {
  const timerContainer = document.getElementById("timer-container");

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      clearInterval(interval);
      timerContainer.innerHTML = "Time's up!";
      // Redirect to another HTML page
      // loadAnotherHTML();
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").innerText = formatTime(days);
      document.getElementById("hours").innerText = formatTime(hours);
      document.getElementById("minutes").innerText = formatTime(minutes);
      document.getElementById("seconds").innerText = formatTime(seconds);
    }
  }, 1000);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// function loadAnotherHTML() {
//   window.location.href = "deliverwork.html";
// }

// Call updateTimer once immediately to avoid delay in displaying the timer

// Function to calculate end date and time based on createdTime and delivery duration
// function calculateEndTime(createdTime, deliveryDuration) {
//     // Convert createdTime to a Date object
//     const startTime = new Date(createdTime);
//     console.log(" startTime", startTime);
//     console.log(" deliveryDuration222", deliveryDuration);
//     // Calculate end time by adding delivery duration (in minutes) to startTime
//     const endTime = new Date(startTime.getTime() + deliveryDuration * 60000); // Convert minutes to milliseconds
//     console.log(" end Date", endTime)
//     return endTime;
// }

function calculateEndTime(createdTime, deliveryDuration) {
  // Convert createdTime to a Date object
  const startTime = new Date(createdTime);
  console.log("startTime", startTime);
  console.log("deliveryDuration", deliveryDuration);

  // Calculate end time by adding delivery duration (in minutes) to startTime
  const endTime = new Date(startTime.getTime() + deliveryDuration * 86400000); // Convert minutes to milliseconds
  console.log("endDate", endTime);

  return endTime;
}

const popupview = document.querySelector(".overlay");
const closetn = document.querySelector(".close");

// const delivery = document.querySelector(".submit");

function loadAnotherHTML() {
  popupview.style.display = "flex";
  closetn.addEventListener("click", () => {
    console.log("Script is running");

    popupview.style.display = "none";
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const description = document.querySelector(".description-input");
  const fileInput = document.querySelector(".title-input");
  const submit = document.querySelector(".submit-button");
  const close = document.querySelector(".close");

  close.addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
  });

  submit.addEventListener("click", () => {
    if (description.value === "" || fileInput.value === "") {
      Toast.fire({
        icon: "error",
        title: "Please fill all the fields",
      });
    } else {
      uploadFile();
    }
  });

  function uploadFile() {
    file = fileInput.files[0];

    if (file.size > 100000000) {
      Toast.fire({
        icon: "error",
        title: "File size is too large. Please upload a file less than 100MB.",
      });
      fileInput.value = "";
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("endpoint", "deliveries");
    let RequestData = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch(BASE_URL + "/file", {
        method: "POST",
        headers: myHeaders,
        body: formData,
      })
        .then((response) => {
          if (response.status == 401) {
            window.location.href = "../Failed/401.html";
          } else if (response.status == 406) {
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href =
              "../Failed/Session%20timeout.html?returnUrl=" + currentUrl;
          } else if (response.status == 404) {
            window.location.href = "../Failed/404.html";
          } else if (response.status == 200) {
            data = response.text();
            data.then((data) => {
              console.log("Success:", data);
              RequestData = data;
              Sendreq(RequestData);
            });
          } else {
            Toast.fire({
              icon: "error",
              title: "An error occurred. Please try again later.",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // const requestOptions = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: getCookie("JWT"), // Assuming you have a function to retrieve JWT token from cookies
  //   },
  //   Credential: "include",
  // };

async function Sendreq(url) {
  
  const orderId2 = getOrderIDFromURL();

  // Call getPackageID to retrieve clientId
  const { Client_ID } = await getPackageID(orderId2);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", getCookie("JWT"));

  const raw = JSON.stringify({
    orderID: orderId2,
    designer_message: description.value,
    clientId: Client_ID, // Use the clientId obtained from getPackageID function
    deliver_work: url,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/orderDetails", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.text();  // Process text if response was ok
      } else {
        throw new Error('Failed to send request');  // Throw error otherwise
      }
    })
    .then((result) => {
      console.log(result);
      window.location.reload();  // Reload the page on successful upload
    })
    .catch((error) => {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: error.message || "An error occurred. Please try again later.",
      });
    });
}

}


