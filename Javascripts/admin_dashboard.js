// Get the canvas element
var ctx = document.getElementById('myChart').getContext('2d');

// Define data
var data = {
    labels: ['Logo designing', 'Illustrations', 'Banner designing', 'Flyer designing'],
    datasets: [{
        label: 'Orders',
        data: [100, 135, 100, 85],
        backgroundColor: [
            'rgb(255, 99, 132)',  // January
            'rgb(54, 162, 235)',  // February
            'rgb(255, 206, 86)',  // March
            'rgb(75, 192, 192)',  // April
        ],
        // borderColor: 'rgba(75, 192, 192, 1)',
        // borderWidth: 2
    }]
};

// Define options
var options = {
    // scales: {
    //     y: {
    //         beginAtZero: true
    //     }
    // }
    plugins: {
        legend: {
            position: 'bottom',  // Place legend on the right side
            // align: 'middle',     // Align text to the start
            labels: {
                boxWidth: 20,    // Set the width of the colored box
                padding: 20      // Set padding between the legend and chart
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

// Create the chart
var myChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});

 // Get the canvas element
 var ctx = document.getElementById('revenueChart').getContext('2d');

 // Define data
 var data = {
     labels: ['January', 'February', 'March', 'April'],
     datasets: [{
         label: 'Revenue ($)',
         data: [5000, 5500, 5200, 5800],
         backgroundColor: 'rgba(75, 192, 192, 0.2)',
         borderColor: '#081e9a',
         borderWidth: 2,
         pointBackgroundColor: '#081e9a',
         pointBorderColor: '#081e9a',
         pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
         pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
     }]
 };

 // Define options
 var options = {
     scales: {
         y: {
             beginAtZero: true,
             ticks: {
                 callback: function(value, index, values) {
                     return '$' + value;  // Add '$' prefix to y-axis ticks
                 }
             }
         }
     },
     plugins: {
         legend: {
             display: false  // Hide the legend
         }
     }
 };

 // Create the chart
 var revenueChart = new Chart(ctx, {
     type: 'line',
     data: data,
     options: options
 });