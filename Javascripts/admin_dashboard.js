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

const p1 = document.getElementById("note1").querySelector("p");
const p2 = document.getElementById("note2").querySelector("p");
const p3 = document.getElementById("note3").querySelector("p");

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




  document.addEventListener("DOMContentLoaded", loadData()); 

  function loadData(){

    fetch(`${BASE_URL}/admindashboard`,{
        method: 'GET',
        headers: myHeaders,
    })
    .then(response => 
        {if(response.status == 401){
          window.location.href = "../Failed/401.html";
        }else if(response.status == 406){
          const currentUrl = encodeURIComponent(window.location.href);
          window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        }else if(response.status == 404){
          window.location.href = "../Failed/404.html";
        }else if (response.status == 200) {
          return response.json();
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went Wrong!"
          });
          console.log("Error"+response.status)
        }
    })
    .then(data =>{

        typeWriter(p1, "Users", 50);
        typeWriter(p2, "Transactions", 50);
        typeWriter(p3, "Packages", 50);

        console.log(typeof(data));
        let category_analysis ={}
        category_analysis = data.categoryAnalytics
        console.log(category_analysis);

        createPie(category_analysis)
    })
  }

  function createPie(dataSet) {
    // Get the canvas element
    var ctx = document.getElementById('myChart').getContext('2d');

    // Map the dataSet to match the format expected by Chart.js
    var labels = Object.keys(dataSet);
    var dataValues = Object.values(dataSet);

    // Define data
    var data = {
        labels: labels,
        datasets: [{
            label: 'Orders',
            data: dataValues,
            backgroundColor: [
                'rgb(255, 99, 132)',  // Logo designing
                'rgb(54, 162, 235)',  // Illustration
                'rgb(255, 206, 86)',  // Banner designing
                'rgb(75, 192, 192)',  // Flyer designing
            ]
        }]
    };

    // Define options
    var options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 20,
                    padding: 20
                }
            }
        },
        layout: {
            padding: {
                top: 0,
                bottom: 0
            }
        }
    };

    // Create the pie chart
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}


























// // Get the canvas element
// var ctx = document.getElementById('myChart').getContext('2d');

// // Define data
// var data = {
//     labels: ['Logo designing', 'Illustrations', 'Banner designing', 'Flyer designing'],
//     datasets: [{
//         label: 'Orders',
//         data: [100, 135, 100, 85],
//         backgroundColor: [
//             'rgb(255, 99, 132)',  // January
//             'rgb(54, 162, 235)',  // February
//             'rgb(255, 206, 86)',  // March
//             'rgb(75, 192, 192)',  // April
//         ],
//         // borderColor: 'rgba(75, 192, 192, 1)',
//         // borderWidth: 2
//     }]
// };

// // Define options
// var options = {
//     // scales: {
//     //     y: {
//     //         beginAtZero: true
//     //     }
//     // }
//     plugins: {
//         legend: {
//             position: 'bottom',  // Place legend on the right side
//             // align: 'middle',     // Align text to the start
//             labels: {
//                 boxWidth: 20,    // Set the width of the colored box
//                 padding: 20      // Set padding between the legend and chart
//             }
//         }
//     },
//     layout: {
//         padding: {
//             top: 0,
//             bottom: 0
//         }
//     }
// };

// Create the chart
// var myChart = new Chart(ctx, {
//     type: 'pie',
//     data: data,
//     options: options
// });

//  // Get the canvas element
//  var ctx = document.getElementById('revenueChart').getContext('2d');

//  // Define data
//  var data = {
//      labels: ['January', 'February', 'March', 'April'],
//      datasets: [{
//          label: 'Revenue ($)',
//          data: [5000, 5500, 5200, 5800],
//          backgroundColor: 'rgba(75, 192, 192, 0.2)',
//          borderColor: '#081e9a',
//          borderWidth: 2,
//          pointBackgroundColor: '#081e9a',
//          pointBorderColor: '#081e9a',
//          pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//          pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
//      }]
//  };

//  // Define options
//  var options = {
//      scales: {
//          y: {
//              beginAtZero: true,
//              ticks: {
//                  callback: function(value, index, values) {
//                      return '$' + value;  // Add '$' prefix to y-axis ticks
//                  }
//              }
//          }
//      },
//      plugins: {
//          legend: {
//              display: false  // Hide the legend
//          }
//      }
//  };

//  // Create the chart
//  var revenueChart = new Chart(ctx, {
//      type: 'line',
//      data: data,
//      options: options
//  });