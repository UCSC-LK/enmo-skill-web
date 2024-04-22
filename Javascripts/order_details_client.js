document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.getElementById("dropdownBtn");
  const orderDetails = document.querySelector(".row-main");
  const dropdownContent = document.querySelector(".dropdown-content");
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
const fileInput = document.getElementById("fileInput");

// Add event listener to the icon wrapper to trigger file input click
document.querySelector(".icon-wrapper2").addEventListener("click", function () {
  fileInput.click();
});

// Add event listener to the file input to handle file selection
fileInput.addEventListener("change", function () {
  const selectedFile = this.files[0]; // Get the selected file
  console.log("Selected file:", selectedFile);

  // Check if a file is selected
  if (selectedFile) {
    // Create a box element
    const box = document.createElement("div");
    box.classList.add("uploaded-file-box");
    box.textContent = selectedFile.name; // Display file name in the box

    // Append the box to a container element
    const container = document.querySelector(".uploaded-files-container");
    container.appendChild(box);
  }
});

//Timer

// Set the due time for the timer (e.g., 1 hour from the current time)
const dueTime = new Date().getTime() + 3600000; // 3600000 milliseconds = 1 hour

// Function to update the timer every second
function updateTimer() {
  const now = new Date().getTime(); // Get the current time
  const distance = dueTime - now; // Calculate the remaining time

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the remaining time in the timer
  document.getElementById("hours").innerText = formatTime(hours);
  document.getElementById("minutes").innerText = formatTime(minutes);
  document.getElementById("seconds").innerText = formatTime(seconds);

  // Check if the timer has expired
  if (distance < 0) {
    clearInterval(timerInterval); // Stop the timer interval
    // You can add code here to handle what happens when the timer expires
  }
}

// Function to format time values (add leading zeros)
function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000);

// Call updateTimer once immediately to avoid delay in displaying the timer
updateTimer();
