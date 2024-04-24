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

document.addEventListener("DOMContentLoaded", setDeliverables);


// extract type of the package
const url = new URL(window.location.href);
const category = url.searchParams.get('category');
const packageId = url.searchParams.get('packageId');
const updateFlag = parseInt(url.searchParams.get('update')); // this is not sent as the parameters
console.log(category);

// setting flag variables
var btn_bronze = false;
var btn_silver = false;
var btn_platinum = false;

var errFlag = 0

var pricePackageId_bronze = 0;
var pricePackageId_silver = 0;
var pricePackageId_platinum = 0;

var deliverablesId_bronze = 0;
var deliverablesId_silver = 0;
var deliverablesId_platinum = 0;

var update_b = 0;
var update_s = 0;
var update_p = 0;

function loadData(){

    fetch(BASE_URL+`/packagepricing?packageId=${packageId}`,{
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
          return response.json()
        } else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#293692"
              });
          console.log("Error"+response.status)
        }
        
        })
    // .then((response)=>{
    //     if(!response.ok){
    //         throw new Error('Cannot get data');
    //     }
    //     return response.json();
    // })
    .then((pricePackageList) => {

        pricePackageList.forEach(pricingData => {
            console.log(pricingData);


            if (pricingData.type == "bronze") {

                pricePackageId_bronze = pricingData.pricePackageId;
                deliverablesId_bronze = pricingData.del.deliverablesId;

                
                document.getElementById("price_b").value = pricingData.price;
                document.getElementById("concepts_b").value = pricingData.noOfConcepts;
                document.getElementById("rev_b").value = pricingData.noOfRevisions;
                document.getElementById("duration_b").value = pricingData.deliveryDuration;
                
                var deliverables = pricingData.del;
                console.log(deliverables.deliverabId);
                
                var chk = document.getElementsByClassName("chk_bronze");

                // console.log(chk.length);


                
                for (var key in deliverables) {
                    if (deliverables.hasOwnProperty(key)) {
                        var value = deliverables[key];
                        for (let i = 0; i < chk.length; i++) {
                            // console.log(chk[i].getAttribute("value"));
                            var ele = chk[i].getAttribute("value")

                            if (key == ele && value == 1) {
                                // Check the checkbox if the value is 1
                                chk[i].checked = true;
                            }
                            
                        }


                    }
                }
            } else if (pricingData.type == "silver") {

                pricePackageId_silver = pricingData.pricePackageId;
                deliverablesId_silver = pricingData.del.deliverablesId;


                document.getElementById("price_s").value = pricingData.price;
                document.getElementById("concepts_s").value = pricingData.noOfConcepts;
                document.getElementById("rev_s").value = pricingData.noOfRevisions;
                document.getElementById("duration_s").value = pricingData.deliveryDuration;
                
                var deliverables = pricingData.del;
                
                var chk = document.getElementsByClassName("chk_silver");

                // console.log(chk.length);
                
                for (var key in deliverables) {
                    if (deliverables.hasOwnProperty(key)) {
                        var value = deliverables[key];
                        console.log(key + " "+ value);
                        for (let i = 0; i < chk.length; i++) {
                            // console.log(chk[i].getAttribute("value"));
                            var ele = chk[i].getAttribute("value")

                            if (key == ele && value == 1) {
                                // Check the checkbox if the value is 1
                                chk[i].checked = true;
                            }
                            
                        }


                    }
                }
            } else if (pricingData.type == "platinum") {

                pricePackageId_platinum = pricingData.pricePackageId;
                deliverablesId_platinum = pricingData.del.deliverablesId;


                document.getElementById("price_p").value = pricingData.price;
                document.getElementById("concepts_p").value = pricingData.noOfConcepts;
                document.getElementById("rev_p").value = pricingData.noOfRevisions;
                document.getElementById("duration_p").value = pricingData.deliveryDuration;
                
                var deliverables = pricingData.del;
                
                var chk = document.getElementsByClassName("chk_platinum");

                console.log(chk.length);
                
                for (var key in deliverables) {
                    if (deliverables.hasOwnProperty(key)) {
                        var value = deliverables[key];
                        for (let i = 0; i < chk.length; i++) {
                            // console.log(chk[i].getAttribute("value"));
                            var ele = chk[i].getAttribute("value")

                            if (key == ele && value == 1) {
                                // Check the checkbox if the value is 1
                                chk[i].checked = true;
                            }
                            
                        }


                    }
                }
            } else {
                alert("Invalid type !")
            }

        });
    })
    .catch(error =>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#293692"
          });
          console.error("Error: ", error)
    })
}

function setDeliverables() {

    fetch(BASE_URL + `/categorydata?categoryId=${category}`,{
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
          return response.json()
        } else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#293692"
              });
          console.log("Error"+response.status)
        }
        
        })

    .then((data)=>{


        var deli_div = document.getElementsByClassName("chkbx");
        var lb = document.getElementsByClassName("chg");

        // Check if deli_div exists
        if (deli_div.length > 0) {
            // Clear any existing checkboxes
            deli_div[0].innerHTML = "";
            deli_div[1].innerHTML = "";
            deli_div[2].innerHTML = "";

            for (let i = 0; i < 3; i++) {
                
                for (let j = 1; j <= 5; j++) {

                    var str = "del_"+(j);
                    
                    // create checkbox
                    var chk = document.createElement("input");
                    chk.type = "checkbox";
                    chk.value = str;

                    // Create a label for the checkbox
                    var label = document.createElement("label");
                    label.innerHTML = data["del_"+j];

                    // create break tag
                    var br = document.createElement("br")

                    if (i == 0) {
                        chk.className = "chk_bronze"
                    } else if (i == 1) {
                        chk.className = "chk_silver"
                    } else{
                        chk.className = "chk_platinum"
                    }

                    deli_div[i].appendChild(chk);
                    deli_div[i].appendChild(label);
                    deli_div[i].appendChild(br);
                }
                
            }


        }

        if (updateFlag) {
            console.log("in the update");
            loadData();
        }
    })
    .catch(error=>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#293692"
          });
        console.error("Error: " + error)
    })
    
    
}

// Function to check if a value is numeric
function isNumeric(value) {
    return /^-?\d*\.?\d+$/.test(value);
}

// handling submits
document.getElementById("submit-bronze").addEventListener("click", async function(event){
    event.preventDefault();

    btn_bronze = true;

    var price_b = document.getElementById("price_b").value;
    var concepts_b = document.getElementById("concepts_b").value;
    var rev_b = document.getElementById("rev_b").value;
    var duration_b = document.getElementById("duration_b").value;
    var deliverables = document.getElementsByClassName("chk_bronze")

    
    
    // Check if price_b is numeric and not empty
    if (!price_b || !isNumeric(price_b)) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Price must be a numeric value and cannot be empty"
          });
        return; // Stop further execution
    }
    
    // Check if concepts_b is numeric and not empty
    if (!concepts_b || !isNumeric(concepts_b)) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "No of conepts must be a numeric value and cannot be empty"
          });
        return; // Stop further execution
    }
    
    // Check if a value is selected for rev_b
    if (rev_b == "none") {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select no of revisons"
          });
        return; // Stop further execution
    }
    
    // Check if a value is selected for duration_b
    if (duration_b == "none") {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select a duration"
          });
        return; // Stop further execution
    }
    
    // Check if at least one deliverable is selected
    var isChecked = false;
    for (var i = 0; i < deliverables.length; i++) {
        if (deliverables[i].checked) {
        isChecked = true;
        break;
        }
    }
    
    if (!isChecked) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select either one of deliverables"
          });
        return; // Stop further execution
    }


     // Convert deliverables to an array
     var deliverablesArray = Array.from(deliverables);

     var deliverablesObject = {};
 
     // Iterate through the checkboxes
     deliverablesArray.forEach(function(checkbox) {
         var checkboxValue = checkbox.value;
 
         // Check if the value doesn't exist in the deliverablesObject
        deliverablesObject[checkboxValue] = 0;
 
         // Check if the checkbox is checked and update the deliverablesObject
         if (checkbox.checked) {
             deliverablesObject[checkboxValue] = 1;
         }
     });

     deliverablesObject.categoryId = category;
 
     // Print the deliverablesObject to the console
     console.log(deliverablesObject);


    var pricingData = {}

    var pricingData = {
        type: "bronze",
        deliveryDuration: duration_b,
        noOfRevisions: rev_b,
        price: price_b,
        noOfConcepts: concepts_b,
        packageId: packageId,
        del: deliverablesObject
    }

    console.log(pricingData);
    console.log("update: "+update_b);

    var operationType = pricePackageId_bronze ? "update" : "insert";
    operationType = update_b ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?pricePackageId=${pricePackageId_bronze}&deliverablesId=${deliverablesId_bronze}`
    : `${BASE_URL}/packagepricing?packageId=${packageId}`;


    
        fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers:myHeaders,
            body: JSON.stringify(pricingData),
        })
        .then(response => 
            {
                console.log(response.status);
                if(response.status == 401){
              window.location.href = "../Failed/401.html";
            }else if(response.status == 406){
              const currentUrl = encodeURIComponent(window.location.href);
              window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
            }else if(response.status == 404){
              window.location.href = "../Failed/404.html";
            }else if (response.status == 200) {
            //   return response.json()
            update_b = 1
            console.log(`Prcing data ${operationType}d successfully.`);

            // showPopupSuccess();
            if (operationType === "insert") {
                var rsp = response.json();
                rsp.then((data) => {
                    pricePackageId_bronze = data.pricePackageId
                    deliverablesId_bronze = data.deliverablesId
                })

            }
            
            // checkFlagsSuccess();
            var sbtn = document.getElementById("submit-bronze");
            sbtn.innerHTML = "Saved";
            sbtn.style.backgroundColor = "#444";
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Deliverables data saved",
                showConfirmButton: false,
                timer: 1500
              });

            } else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                  });
                errFlag = 1
                console.error(`Failed to ${operationType} package data.`);
                console.log("Error"+response.status)
            }
            
            })


});

// handling submits
document.getElementById("submit-silver").addEventListener("click", async function(event){
    event.preventDefault();

    btn_silver = true;

    var price_s = document.getElementById("price_s").value;
    var concepts_s = document.getElementById("concepts_s").value;
    var rev_s = document.getElementById("rev_s").value;
    var duration_s = document.getElementById("duration_s").value;
    var deliverables = document.getElementsByClassName("chk_silver");

    // Check if price_b is numeric and not empty
    if (!price_s || !isNumeric(price_s)) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Price must be a numeric value and cannot be empty"
          });
        return; // Stop further execution
    }
    
    // Check if concepts_b is numeric and not empty
    if (!concepts_s || !isNumeric(concepts_s)) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "No of conepts must be a numeric value and cannot be empty"
          });
        return; // Stop further execution
    }
    
    // Check if a value is selected for rev_b
    if (rev_s == "none") {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select no of revisons"
          });
        return; // Stop further execution
    }
    
    // Check if a value is selected for duration_b
    if (duration_s == "none") {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select a duration"
          });
        return; // Stop further execution
    }
    
    // Check if at least one deliverable is selected
    var isChecked = false;
    for (var i = 0; i < deliverables.length; i++) {
        if (deliverables[i].checked) {
        isChecked = true;
        break;
        }
    }
    
    if (!isChecked) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select either one of deliverables"
          });
        return; // Stop further execution
    }

    // console.log(deliverables);

    var deliverablesArray = Array.from(deliverables);

    var deliverablesObject = {};

    // Iterate through the checkboxes
    deliverablesArray.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value doesn't exist in the deliverablesObject
        deliverablesObject[checkboxValue] = 0;

        // Check if the checkbox is checked and update the deliverablesObject
        if (checkbox.checked) {
            deliverablesObject[checkboxValue] = 1;
        }
    });

    deliverablesObject.categoryId = category;

    console.log(deliverablesObject);

    var pricingData = {
        type: "silver",
        deliveryDuration: duration_s,
        noOfRevisions: rev_s,
        price: price_s,
        noOfConcepts: concepts_s,
        packageId: packageId,
        del: deliverablesObject
    }

    console.log(pricingData);
    console.log("update :"+update_s);
    var operationType = pricePackageId_silver ? "update" : "insert";
    operationType = update_s ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?pricePackageId=${pricePackageId_silver}&deliverablesId=${deliverablesId_silver}`
    : `${BASE_URL}/packagepricing?packageId=${packageId}`;


        fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers:myHeaders,
            body: JSON.stringify(pricingData),
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
            //   return response.json()

                update_s = 1;
                console.log(`Prcing data ${operationType}d successfully.`);
                // showPopupSuccess();
                if (operationType === "insert") {
                    var rsp = response.json();
                    rsp.then((data) => {
                        pricePackageId_silver = data.pricePackageId
                        deliverablesId_silver = data.deliverablesId
                    })
                }
                // checkFlagsSuccess();
                var sbtn = document.getElementById("submit-silver");
                sbtn.innerHTML = "Saved";
                sbtn.style.backgroundColor = "#444";
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Deliverables data saved",
                    showConfirmButton: false,
                    timer: 1500
                  });

            } else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                  });
                errFlag = 1
                console.error(`Failed to ${operationType} package data.`);
                console.log("Error"+response.status)
            }
            
            })

});
// handling submits
document.getElementById("submit-platinum").addEventListener("click", async function(event){
    event.preventDefault();

    btn_platinum = true;

    var price_p = document.getElementById("price_p").value;
    var concepts_p = document.getElementById("concepts_p").value;
    var rev_p = document.getElementById("rev_p").value;
    var duration_p = document.getElementById("duration_p").value;
    var deliverables = document.getElementsByClassName("chk_platinum");
    // var deliverables_chk = document.querySelectorAll('input[type="checkbox"]:checked');
    // var deliverables = document.querySelectorAll('input[type="checkbox"]');

    // var deliverablesObject = {};

    // deliverables.forEach(function(checkbox) {
    //     var checkboxValue = checkbox.value;

    //     // Check if the value doesn't exist in the deliverablesObject
    //     if (!(checkboxValue in deliverablesObject)) {
    //         deliverablesObject[checkboxValue] = 0;
    //     }
    // });

    // // Update values to 1 for checked checkboxes
    // deliverables_chk.forEach(function(checkbox) {
    //     var checkboxValue = checkbox.value;

    //     // Check if the value exists in the deliverablesObject
    //     if (checkboxValue in deliverablesObject) {
    //         deliverablesObject[checkboxValue] = 1;
    //     }
    // });

    // Check if price_b is numeric and not empty
    if (!price_p || !isNumeric(price_p)) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Price must be a numeric value and cannot be empty"
          });
        return; // Stop further execution
    }
    
    // Check if concepts_b is numeric and not empty
    if (!concepts_p || !isNumeric(concepts_p)) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "No of conepts must be a numeric value and cannot be empty"
          });
        return; // Stop further execution
    }
    
    // Check if a value is selected for rev_b
    if (rev_p == "none") {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select no of revisons"
          });
        return; // Stop further execution
    }
    
    // Check if a value is selected for duration_b
    if (duration_p == "none") {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select a duration"
          });
        return; // Stop further execution
    }
    
    // Check if at least one deliverable is selected
    var isChecked = false;
    for (var i = 0; i < deliverables.length; i++) {
        if (deliverables[i].checked) {
        isChecked = true;
        break;
        }
    }
    
    if (!isChecked) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Please select either one of deliverables"
          });
        return; // Stop further execution
    }
    var deliverablesArray = Array.from(deliverables);

    var deliverablesObject = {};

    // Iterate through the checkboxes
    deliverablesArray.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value doesn't exist in the deliverablesObject
        
         deliverablesObject[checkboxValue] = 0;
        

        // Check if the checkbox is checked and update the deliverablesObject
        if (checkbox.checked) {
            deliverablesObject[checkboxValue] = 1;
        }
    });

    deliverablesObject.categoryId = category;

    console.log(deliverablesObject);

    var pricingData = {}

   

    var pricingData = {
        type: "platinum",
        deliveryDuration: duration_p,
        noOfRevisions: rev_p,
        price: price_p,
        noOfConcepts: concepts_p,
        packageId: packageId,
        del: deliverablesObject
    }

    console.log(pricingData);
    var operationType = pricePackageId_platinum ? "update" : "insert";
    operationType = update_p ? "update" : "insert";
    console.log(update_p);
    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?pricePackageId=${pricePackageId_platinum}&deliverablesId=${deliverablesId_platinum}`
    : `${BASE_URL}/packagepricing?packageId=${packageId}`;



        fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers:myHeaders,
            body: JSON.stringify(pricingData),
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
                //   return response.json()
                update_p = 1
                console.log(`Prcing data ${operationType}d successfully.`);
                // showPopupSuccess();
                if (operationType === "insert") {
                    var rsp = response.json();
                    rsp.then((data) => {
                        pricePackageId_platinum = data.pricePackageId
                        deliverablesId_platinum = data.deliverablesId
                    })
                }
                // checkFlagsSuccess();
                var sbtn = document.getElementById("submit-platinum");
                sbtn.innerHTML = "Saved";
                sbtn.style.backgroundColor = "#444";
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Deliverables data saved",
                    showConfirmButton: false,
                    timer: 1500
                  });

                } else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        confirmButtonColor: "#293692"
                    });
                    errFlag = 1;
                    console.error(`Failed to ${operationType} package data.`);
                    console.log("Error"+response.status)
                }
            
            }).catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!"
                });
                console.error('Error fetching data:', error);
              });

        // if (response.ok) {
        //     console.log(`Prcing data ${operationType}d successfully.`);
        //     // showPopupSuccess();
        //     if (operationType === "insert") {
        //         var rsp = response.json();
        //         rsp.then((data) => {
        //             pricePackageId_platinum = data.pricePackageId
        //         })
        //     }
        //     // checkFlagsSuccess();
        //     var sbtn = document.getElementById("submit-platinum");
        //     sbtn.innerHTML = "Saved";
        //     sbtn.style.backgroundColor = "#444";
        // } else {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Something went wrong!",
        //         confirmButtonColor: "#293692"
        //       });
        //     //// unscussess popup
        //     // showPopupUnsuccess();
        //     // checkFlagsUnsuccess();
        //     errFlag = 1;
        //     console.error(`Failed to ${operationType} package data.`);

        // }

    

});


// document.getElementById("btn-success").addEventListener("click", function(){

//     var popupContainer = document.getElementById('popup-container-success');
//     var overlay = document.getElementById('overlay1');

//     popupContainer.style.display = 'none';
//     overlay.style.display = 'none';

//     window.location = `../HTML/packages.html`
// })

// document.getElementById("btn-unsuccess").addEventListener("click", function(){

//     var popupContainer = document.getElementById('popup-container-unsuccess');
//     var overlay = document.getElementById('overlay2');

//     popupContainer.style.display = 'none';
//     overlay.style.display = 'none';
// })

// document.getElementById("btn-warning").addEventListener("click", function(){

//     var popupContainer = document.getElementById('popup-container-unsuccess');
//     var overlay = document.getElementById('overlay3');

//     popupContainer.style.display = 'none';
//     overlay.style.display = 'none';
// })

// function showPopupWarning() {
//     var popupContainer = document.getElementById('popup-container-success');
//     var overlay = document.getElementById('overlay3');
    
//     overlay.style.display = 'block';

// }

// function showPopupSuccess() {
//     var popupContainer = document.getElementById('popup-container-success');
//     var overlay = document.getElementById('overlay1');
    
//     overlay.style.display = 'block';

// }

// function showPopupUnsuccess() {
//     var popupContainer = document.getElementById('popup-container-success');
//     var overlay = document.getElementById('overlay2');
    
//     overlay.style.display = 'block';
//   }

//   function closePopup() {
//     var popupContainer = document.getElementById('popup-container');
//     var overlay = document.getElementById('overlay1');

//     // popupContainer.style.display = 'none';
//     overlay.style.display = 'none';
//   }

function checkFlagsSuccess(){
    console.log("IN FLAG SUCCESS");
    if (btn_bronze && btn_silver && btn_platinum) {
        // showPopupSuccess();
        Swal.fire({
            title: "Success",
            text: "Package data inserted successfully!",
            icon: "success",
            confirmButtonColor: "#293692"
          })
        .then((result)=>{
            if (result.isConfirmed) {
                location.replace(`../HTML/packages.html`)  
            }
        })

    }
    else{
        if (!updateFlag) {
            // showPopupSuccess();
            Swal.fire({
                title: "Success",
                text: "Package data inserted successfully",
                icon: "success",
                confirmButtonColor: "#293692"
              }).then((result)=>{
                if (result.isConfirmed) {
                    window.location = `../HTML/packages.html`    
                }
            })
            
        } else{
            Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "Save all changes before going back!",
                confirmButtonColor: "#293692"
              });

        }
    }
}

function checkFlagsUnsuccess(){
    console.log("IN FLAG UNSUCCESS");
    if (btn_bronze && btn_silver && btn_platinum) {
        // showPopupUnsuccess()
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#293692"
          });
    }
    else{
        if (updateFlag) {
            // showPopupUnsuccess();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#293692"
              });
            
        } else{
        // showPopupWarning()
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Save all changes before going back!",
            confirmButtonColor: "#293692"
          });

        }
    }
}

document.getElementById("finish").addEventListener("click", function(){

    if (errFlag) {
        checkFlagsUnsuccess()
    } else {
        checkFlagsSuccess()
    }
})

window.addEventListener('beforeunload', function (e) {
    if (!(btn_bronze && btn_silver && btn_platinum)) {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Save all changes before going back!",
            confirmButtonColor: "#293692"
          });
    }
});



