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

var raw = JSON.stringify({});

const url = new URL(window.location.href);
const packageId = parseInt(url.searchParams.get('packageId'));
console.log(packageId);

var tableCreated = false;

var package_data;
var designer_data;
var pricing_data;
let overlay_view=document.getElementById("overlay");
let deseignerId = 0;
let Selected_pricing_item = null;

let uploadUrl = null;


// document.addEventListener("DOMContentLoaded", loadData());

// function loadData() {

//     fetch(BASE_URL+`/packageview?packageId=${packageId}`,{
//         method: 'GET',
//         headers: myHeaders,
//     })
//     .then((response) =>{
//         if (!response.ok) {
//             throw new Error('An error occured!');
//         }
//         return response.json();
//     })
//     .then((resultset) =>{
        
//         package_data = resultset.packageModel;
//         designer_data = resultset.profileModel;
//         pricing_data = resultset.pricings;

//         // console.log(pricing_data.pricing[0].noOfRevisions);

//         deseignerId = designer_data.userId;

//         document.getElementById("headding-title").innerHTML = package_data.title;

//         document.getElementById("htmlTitle").innerHTML = package_data.title

//         var designer_pic = document.getElementById("designer-picture");
//         designer_pic.src = "../Assests/user_coloured.png"; // this data has to be store in the db

//         document.getElementById("designer-username1").innerHTML = designer_data.display_name;

//         document.getElementById("no-reviews").innerHTML = 5; // this has to be fetched from the review table
//         document.getElementById("review-count").innerHTML = '(' + 200 + ')'; // this has to be fetched from the review table
//         document.getElementById("no-orders").innerHTML = 4 + ' Orderes in Queue'; // this has to be fetched from the order table

//         var designer_pic = document.getElementById("cover-image");
//         designer_pic.src = package_data.coverUrl; // this data has to be store in the db

//         var pkg_decription = document.getElementById("description");
//         var description = document.createElement('p');
//         description.innerHTML = package_data.description;
//         pkg_decription.appendChild(description);

//         console.log(pricing_data[0].del.categoryId);

//         var categoryData = getCategory(pricing_data[0].del.categoryId)
//         console.log(categoryData);

//         document.getElementById("catogery").innerHTML = categoryData.category;

//         var designer_pic_2 = document.getElementById("designer-img");
//         designer_pic_2.src = "../Assests/user_coloured.png"; // this data has to be store in the db

//         document.getElementById("designer-username2").innerHTML = designer_data.display_name;
//         document.getElementById("reviews-designer").innerHTML = 4.5; // need to fetch from reviews table
//         document.getElementById("review-count-designer").innerHTML = '(' + 471 +')'; // need to fetch from reviews table

//         document.getElementById("member-since").innerHTML = "April 2021" // this data has to be stored in the designer or user or tables
//         document.getElementById("last-deli").innerHTML = "3 hours ago" // fetch from the order table

//         var lang = designer_data.language;
//         document.getElementById("lang").innerHTML = lang.join(' ');

//         document.getElementById('des-designer').innerHTML = designer_data.description;

//         var client_img  = document.getElementById('client-img')
//         client_img.src = "../Assests/user_coloured.png"

//         document.getElementById("client-name").innerHTML = "Joe A."; // need to fetch from review table
//         document.getElementById("client-country").innerHTML = "United States"; // need to fetch from client table

//         // this too has to be fetched from review table
//         document.getElementById("the-review").innerHTML = "Working with this seller for my project was a delight. They grasped my brand's essence and delivered a remarkable logo. The unlimited revisions, quick turnaround, and high-qualit files were exceptional. I couldn't be happier with the outcome. Highly recommend!";

//         document.getElementById("reviewd-date").innerHTML = "3 months ago"

//         var tbody = document.getElementById("table-body");

//         // console.log(pricing_data.pricing[0].deliverables.pricePackageId);

//         var data_rows = [
//             ["Price (Rs)"],
//             ["No of Revisions"],
//             ["Delivery Duration"],
//             ["No of Concepts"],
//             [categoryData.del_1],
//             [categoryData.del_2],
//             [categoryData.del_3],
//             [categoryData.del_4],
//             [categoryData.del_5],
//             [""]  
//         ]

//         pricing_data.forEach(function(pricingItem){
//             data_rows[0].push(pricingItem.price)
//             data_rows[1].push(pricingItem.noOfRevisions)
//             data_rows[2].push((pricingItem.deliveryDuration==1)?"1 Day":pricingItem.deliveryDuration+" Days")
//             data_rows[3].push(pricingItem.noOfConcepts)
//             data_rows[4].push((pricingItem.del.del_1==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
//             data_rows[5].push((pricingItem.del.del_2==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
//             data_rows[6].push((pricingItem.del.del_3==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
//             data_rows[7].push((pricingItem.del.del_4==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
//             data_rows[8].push((pricingItem.del.del_5==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
//             data_rows[9].push('<button class="button-save" onclick="createOrder('+pricingItem.price, +')">Select</button>')
//         })
        
//         data_rows.forEach(function(row){
//             var tr = document.createElement('tr');
//             tbody.appendChild(tr);
        
//             if (row[0] == "Price (Rs)") {
//                 var i = 0
//                 row.forEach(function(cell){
//                     var td = document.createElement('td');
//                     tr.appendChild(td);
//                     td.innerHTML = cell;
//                     if (i > 0) {
//                         td.className = "price"
//                     }
//                     i += 1
        
//                 })
//             } else {
//                 row.forEach(function(cell){
                
//                     var td = document.createElement('td');
//                     tr.appendChild(td);
//                     td.innerHTML = cell;
        
//                 })
             
//             }
        
            
        
//         })



//         // FINALLYYYY REMOVING THE LOADER
//         var loader = document.getElementById("loader-div");
//         var block = document.getElementById("block");
//         var sticky = document.getElementById("sticky");

//         block.style.cssText = "";
//         sticky.style.cssText = "";
//         loader.style.display = "none";







//     })
// }

document.addEventListener("DOMContentLoaded", function(){
    loadData();
});

function loadData() {

    fetch(BASE_URL+`/packageview?packageId=${packageId}`,{
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
        } else{
          // Swal.fire({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong!"
          // });
          console.log("Error"+response.status)
        }
        
        })
    // .then((response) =>{
    //     if (!response.ok) {
    //         throw new Error('An error occured!');
    //     }
    //     return response.json();
    // })
    .then((resultset) =>{
        
        const package_data = resultset.packageModel;
        const designer_data = resultset.profileModel;
        const pricing_data = resultset.pricings;

        const pendingOrders = resultset.pendingOrders;
        const userRatings = resultset.userRatings.toFixed(1);

        // console.log(pricing_data.pricing[0].noOfRevisions);

        deseignerId = designer_data.userId;

        document.getElementById("headding-title").innerHTML = package_data.title;

        document.getElementById("htmlTitle").innerHTML = package_data.title

        var designer_pic = document.getElementById("designer-picture");
        designer_pic.src = (designer_data.url) ? designer_data.url : "../Assests/user_coloured.png"; // this data has to be store in the db

        document.getElementById("designer-username1").innerHTML = designer_data.display_name;

        document.getElementById("no-reviews").innerHTML = package_data.avgRatings; // this has to be fetched from the review table
        // document.getElementById("review-count").innerHTML = '(' + 200 + ')'; // this has to be fetched from the review table
        document.getElementById("no-orders").innerHTML = pendingOrders + ' Orderes in Queue'; // this has to be fetched from the order table

        var designer_pic = document.getElementById("cover-image");
        designer_pic.src = package_data.coverUrl; // this data has to be store in the db

        var pkg_decription = document.getElementById("description");
        var description = document.createElement('p');
        description.innerHTML = package_data.description;
        pkg_decription.appendChild(description);

        // console.log(pricing_data[0].del.categoryId);

        var categoryData = getCategory(pricing_data[0].del.categoryId)
        console.log(categoryData);

        document.getElementById("catogery").innerHTML = categoryData.category;

        var designer_pic_2 = document.getElementById("designer-img");
        designer_pic_2.src = (designer_data.url) ? designer_data.url : "../Assests/user_coloured.png";

        document.getElementById("designer-username2").innerHTML = designer_data.display_name;
        document.getElementById("reviews-designer").innerHTML = userRatings; 
        // document.getElementById("review-count-designer").innerHTML = '(' + 471 +')'; 

        // setting since
        const date = new Date(designer_data.joinedDate);
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[monthIndex];

        document.getElementById("member-since").innerHTML = monthName + " " + year; 
        // document.getElementById("last-deli").innerHTML = "3 hours ago" // fetch from the order table

        // set languages
        let lang = designer_data.language;
        console.log(typeof(lang));
        let langHTML = "";

        document.getElementById("lang").innerHTML = lang.join(' ');

        document.getElementById('des-designer').innerHTML = designer_data.description;

        var client_img  = document.getElementById('client-img')
        client_img.src = "../Assests/user_coloured.png"

        document.getElementById("client-name").innerHTML = "Joe A."; // need to fetch from review table
        document.getElementById("client-country").innerHTML = "United States"; // need to fetch from client table

        // this too has to be fetched from review table
        document.getElementById("the-review").innerHTML = "Working with this seller for my project was a delight. They grasped my brand's essence and delivered a remarkable logo. The unlimited revisions, quick turnaround, and high-qualit files were exceptional. I couldn't be happier with the outcome. Highly recommend!";

        document.getElementById("reviewd-date").innerHTML = "3 months ago"

        


        populatePricingTable(pricing_data)
       

 

        removeLoader()






    })
    .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        console.error('Error fetching data:', error);
      });
}
i = 0
function populatePricingTable(pricing_data){
    i = i + 1    
    getCategory(pricing_data[0].del.categoryId)
        .then((categoryData) => {
            console.log(categoryData);
            document.getElementById("catogery").innerHTML = categoryData.category;
            
            // var data_rows = [
            //     ["Price (Rs)"],
            //     ["No of Revisions"],
            //     ["Delivery Duration"],
            //     ["No of Concepts"],
            //     [categoryData.del_1],
            //     [categoryData.del_2],
            //     [categoryData.del_3],
            //     [categoryData.del_4],
            //     [categoryData.del_5],
            //     [""]  
            // ]

            let data_rows = [
              ["Price (Rs)"],
              ["No of Revisions"],
              ["Delivery Duration"],
              ["No of Concepts"]
          ];

          for (let i = 1; i <= Object.keys(categoryData).length - 2; i++) {
            let delProperty = categoryData["del_" + i];
            if (delProperty !== undefined) {
                data_rows.push([delProperty]);
            }
          }

          data_rows.push([""]);
          console.log(data_rows);
    
            // pricing_data.forEach(function(pricingItem){
            //     data_rows[0].push(pricingItem.price)
            //     data_rows[1].push(pricingItem.noOfRevisions)
            //     data_rows[2].push((pricingItem.deliveryDuration==1)?"1 Day":pricingItem.deliveryDuration+" Days")
            //     data_rows[3].push(pricingItem.noOfConcepts)
            //     data_rows[4].push((pricingItem.del.del_1==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
            //     data_rows[5].push((pricingItem.del.del_2==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
            //     data_rows[6].push((pricingItem.del.del_3==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
            //     data_rows[7].push((pricingItem.del.del_4==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
            //     data_rows[8].push((pricingItem.del.del_5==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
            //     // data_rows[9].push('<button class="button-save" onclick="createOrder('+pricingItem.price+')">Select</button>')
            //     data_rows[9].push('<button class="button-save" onclick="showOrderOverlay(\'' + pricingItem.price + '\', \'' + pricingItem.pricePackageId + '\')">Select</button>');            
            //   });
    
            pricing_data.forEach(function(pricingItem){
              console.log(pricingItem);
                data_rows[0].push(pricingItem.price)
                data_rows[1].push(pricingItem.noOfRevisions)
                data_rows[2].push((pricingItem.deliveryDuration==1)?"1 Day":pricingItem.deliveryDuration+" Days")
                data_rows[3].push(pricingItem.noOfConcepts)
                
                let deliverables_properties = pricingItem.del;

                let j = 0
                for (j = 1; j <= Object.keys(categoryData).length - 2; j++) {
                  let delProperty = deliverables_properties["del_" + j];
                  if (delProperty!== undefined) {
                      data_rows[3+j].push((delProperty==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                  }
                }
                console.log(j);
                // data_rows[4].push((pricingItem.del.del_1==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                // data_rows[5].push((pricingItem.del.del_2==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                // data_rows[6].push((pricingItem.del.del_3==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                // data_rows[7].push((pricingItem.del.del_4==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                // data_rows[8].push((pricingItem.del.del_5==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                // data_rows[9].push('<button class="button-save" onclick="createOrder('+pricingItem.price+')">Select</button>')
                data_rows[3+j].push('<button class="button-save" onclick="showOrderOverlay(\'' + pricingItem.price + '\', \'' + pricingItem.pricePackageId + '\')">Select</button>');            
              });

            if (!tableCreated) {
                var tbody = document.getElementById("table-body");
            
                data_rows.forEach(function(row){
                    var tr = document.createElement('tr');
                    tbody.appendChild(tr);
                
                    if (row[0] == "Price (Rs)") {
                        var i = 0
                        row.forEach(function(cell){
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                            if (i > 0) {
                                td.className = "price"
                            }
                            i += 1
                
                        })
                    } else {
                        row.forEach(function(cell){
                        
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                
                        })
                    
                    }
                
                    
                
                })

                tableCreated = true;
            }

            
        })
        .catch((error) => {
            console.error('Error fetching category data:', error);
    });
}

function removeLoader(){
    var loader = document.getElementById("loader-div");
    var block = document.getElementById("block");
    var sticky = document.getElementById("sticky");

    block.style.cssText = "";
    sticky.style.cssText = "";
    loader.style.display = "none";
}

function getCategory(categoryId){
    return fetch(BASE_URL + `/categorydata?categoryId=${categoryId}`,{
        method: 'GET',
        headers: myHeaders
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
        } else{
          // Swal.fire({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong!"
          // });
          console.log("Error"+response.status)
        }
        
        })
        .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
            console.error('Error fetching data:', error);
          });
}

document.getElementById("contact-btn").addEventListener("click", function(e) {
    e.preventDefault();
    
    window.location.href="../HTML/messages.html?createchat=true&id="+deseignerId

})



function on() {
    console.log("inside on");
    overlay_view.style.display = "block";
    console.log("after on");
  }
  
//   function off() {
//     overlay_view.style.display = "none";
//   }


// overlay_view.addEventListener("click", function(){
//     off()
// })

overlay_view.addEventListener("click", function(event) {
    
    let overlayDiv = document.getElementById("overlay-div");

    // // Check if the click target is outside the overlay div
    // if (overlay_view.contains(event.target) && event.target !== overlayDiv) {
    //     overlay_view.classList.remove("overlay")
    //     overlay_view.classList.add("overlay-hidden")
    //     overlayDiv.style.display = "none"
    // }

    if (!overlayDiv.contains(event.target)) {
        overlay_view.classList.remove("overlay")
        overlay_view.classList.add("overlay-hidden")
        overlayDiv.style.display = "none"
    }
    
    // Stop event propagation if the target is within the overlay div
    if (overlay_view.contains(event.target) && event.target !== overlayDiv) {
        event.stopPropagation();
    }
    

});

// close the popup
document.getElementById("close-top").addEventListener("click", function(event) {
    
    // console.log("close-top clicked");
    let overlayDiv = document.getElementById("overlay-div");

    overlay_view.classList.remove("overlay")
        overlay_view.classList.add("overlay-hidden")
        overlayDiv.style.display = "none"


});


function showOrderOverlay(price, pricePackageId) {
    try {
        // Convert string arguments to appropriate data types if needed
        price = parseFloat(price); // Convert to float if it's a string representation of a number
        pricePackageId = parseInt(pricePackageId, 10); // Convert to integer if it's a string representation of a number

        // Rest of your function
        var overlayDiv = document.getElementById("overlay-div");
        Selected_pricing_item = {
            price: price,
            pricePackageId: pricePackageId
            // Add other properties as needed
        };
        overlayDiv.style.display = "block";
        overlay_view.classList.add('overlay');
        overlay_view.classList.remove('overlay-hidden');
        console.log(price); // Access price
        console.log(pricePackageId); // Access pricePackageId
    } catch (error) {
        console.error("Error parsing arguments:", error);
    }
}


document.getElementById("orderCreateBtn").addEventListener("click", function(){

    // get the requirements
    var req = document.getElementById("order-req").value;
    console.log(req);

    if (req.trim() == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter your requirements!",
            confirmButtonColor: "#000000"
          });
          return;
      
    }

    // const reqBody = {
    //     "packageId": packageId,
    //     "price":Selected_pricing_item.price,
    //     "designerId":deseignerId,
    //     "pricePackageId":Selected_pricing_item.pricePackageId,
    //     "requirements":req
    // }

    Selected_pricing_item = {
        ...Selected_pricing_item,
        requirements: (uploadUrl != null) ? req + " sample work: " + uploadUrl: req,
        designerId: deseignerId,
        packageId: packageId
    }

    console.log(Selected_pricing_item);

    fetch(`${BASE_URL}/order`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(Selected_pricing_item)
    })
    .then(response => 
        {
          if(response.status == 401){
          window.location.href = "../Failed/401.html";
        }else if(response.status == 406){
          const currentUrl = encodeURIComponent(window.location.href);
          window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        }else if(response.status == 404){
          window.location.href = "../Failed/404.html";
        }else if (response.status == 200) {
            console.log("Order created successfully");
            var rsp = response.json();
            rsp.then(data =>{
                console.log("Order ID: " + data.orderId);
                window.location.href=`../HTML/paymentSummary.html?orderID=${data.orderId}`
            })
        }else{
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "Something went Wrong!"
        //   });
          console.log("Error"+response.status)
        }
        })
        .catch((error)=>{
            console.error(error)
            Swal.fire({
             icon: "error",
             title: "Oops...",
             text: "Something went wrong!"
           });
          })
})


document.getElementById("fileUpload").addEventListener("click", function() {
  document.getElementById("uploadInput").click(); // Click the hidden file input
});

document.getElementById("uploadInput").addEventListener("change", function() {
  const files = this.files[0];
  console.log("Selected files:", files);



  if (files) {
    // Store samples
    const headers = new Headers();
    headers.append("endpoint", "profile_pics");
    const formData = new FormData();
    formData.append('file', files);

    fetch(BASE_URL+'/file', {
      method: 'POST',
      headers: headers,
      body: formData
    })
    .then(response => {
      if(response.status == 401) {
        window.location.href = "../Failed/401.html";
      } else if(response.status == 406) {
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
      } else if(response.status == 404) {
        window.location.href = "../Failed/404.html";
      } else if (response.status == 200) {
        return response.text();
      } else {
        throw new Error('Something went wrong!');
      }
    })
    .then(data => {
      console.log('Success:', data);
      uploadUrl = data;
      document.getElementById("uccess-tick").innerHTML = "<box-icon name='check-circle' animation='tada' ></box-icon>"
    })
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
        confirmButtonColor: "#000000"
      });
      console.error('Error:', error);
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No file selected!",
      confirmButtonColor: "#000000"
    });
  }
});
