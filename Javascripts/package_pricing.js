document.addEventListener("DOMContentLoaded", setDeliverables);


// extract type of the package
const url = new URL(window.location.href);
const category = url.searchParams.get('category');
const packageId = url.searchParams.get('packageId');
const updateFlag = url.searchParams.get('update'); // this is not sent as the parameters
console.log(category);

// setting flag variables
var btn_bronze = false;
var btn_silver = false;
var btn_platinum = false;

var errFlag = 0

var pricePackageId_bronze = 0;
var pricePackageId_silver = 0;
var pricePackageId_platinum = 0;

function loadData(){

    fetch(BASE_URL+`/packagepricing?packageId=${packageId}`)
    .then((response)=>{
        if(!response.ok){
            throw new Error('Cannot get data');
        }
        return response.json();
    })
    .then((pricePackageList) => {

        pricePackageList.forEach(pricingData => {
            console.log(pricingData);

            var del = pricingData.deliverables

            var deliverablesChk = document.querySelectorAll('input[type="checkbox"]');
            var no_chk = deliverablesChk.length/3
            // console.log(no_chk);
            
            if (category == "1" || category == "2") {
                 //set bronze data
                if (pricingData.type == "bronze") {

                    pricePackageId_bronze = pricingData.pricePackageId;
                    
                    document.getElementById("price_b").value = pricingData.price;
                    document.getElementById("concepts_b").value = pricingData.noOfConcepts;
                    document.getElementById("rev_b").value = pricingData.noOfRevisions;
                    document.getElementById("duration_b").value = pricingData.deliveryDuration;
                    
                    var deliverables = pricingData.deliverables;
                    
                    var chk = document.getElementsByClassName("chk_bronze");

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
                } else if (pricingData.type == "silver") {

                    pricePackageId_silver = pricingData.pricePackageId;

                    document.getElementById("price_s").value = pricingData.price;
                    document.getElementById("concepts_s").value = pricingData.noOfConcepts;
                    document.getElementById("rev_s").value = pricingData.noOfRevisions;
                    document.getElementById("duration_s").value = pricingData.deliveryDuration;
                    
                    var deliverables = pricingData.deliverables;
                    
                    var chk = document.getElementsByClassName("chk_silver");

                    console.log(chk.length);
                    
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

                    document.getElementById("price_p").value = pricingData.price;
                    document.getElementById("concepts_p").value = pricingData.noOfConcepts;
                    document.getElementById("rev_p").value = pricingData.noOfRevisions;
                    document.getElementById("duration_p").value = pricingData.deliveryDuration;
                    
                    var deliverables = pricingData.deliverables;
                    
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
            } else if (category == "3" || category == "4") {
                
            } else{
                alert("invalid category !")
            }

           
        });
    })
}

function setDeliverables() {
    
    var deli_div = document.getElementsByClassName("chkbx");
    var lb = document.getElementsByClassName("chg");

    // Check if deli_div exists
    if (deli_div.length > 0) {
        // Clear any existing checkboxes
        deli_div[0].innerHTML = "";
        deli_div[1].innerHTML = "";
        deli_div[2].innerHTML = "";

        // Create and append checkboxes based on the category
        switch (category) {
            case "1":
                // console.log("inside");

                var checkboxValues = ["Logo transparency", "Vector file", "Printable file", "3D mockup", "Source file", "Social media kit"];
                var valueschk = ["logoTransparency", "vectorFile", "printableFile", "mockup", "sourceFile", "socialMediaKit"];
                for (let i = 0; i < 3; i++) {
                    lb[i].innerHTML = "No of concepts";
                    createCheckboxes(deli_div[i], checkboxValues, valueschk, i);
                    
                }


                break;
            case "2":
                var checkboxValues = ["Source file", "High resolution", "Background/scene", "Color", "Full body", "Commercial use"];
                var valueschk = ["sourceFile", "highResolution", "background/scene", "color", "fullBody", "commercialUse"];
                for (let i = 0; i < 3; i++) {
                    lb[i].innerHTML = "No of figures"
                    createCheckboxes(deli_div[i], checkboxValues, valueschk, i);
                    
                }


                break;
            case "3":
                var checkboxValues = ["Print-Ready", "Source File", "Double-sided", "Custom graphics", "Photo editing", "Social media design", "Commercial Use"];
                var valueschk = ["printReady", "sourceFile", "doubleSided", "customGraphics", "photoEditing", "socialMediaDesign", "commercialUse"];
                for (let i = 0; i < 3; i++) {
                    lb.remove
                    createCheckboxes(deli_div[i], checkboxValues, valueschk, i);    
                }

                document.getElementById("concepts_b").remove()
                document.getElementById("concepts_s").remove()
                document.getElementById("concepts_p").remove()

                break;
            default:
                var checkboxValues = ["Custom graphics", "Source file", "Print-ready"];
                var valueschk = ["customGraphics", "sourceFile", "printReady"];
                for (let i = 0; i < 3; i++) {
                    lb.remove
                    createCheckboxes(deli_div[i], checkboxValues, valueschk);    
                }

                document.getElementById("concepts_b").remove()
                document.getElementById("concepts_s").remove()
                document.getElementById("concepts_p").remove()


        }
    }

    if (updateFlag) {
        console.log("in the update");
        loadData();
    }
}

// function setupCheckBoxes(ele, values, label_val){
//     var lb = document.getElementsByClassName("chg");
//     for (let i = 0; i < 3; i++) {
//         lb[i].innerHTML = label_val;
//         createCheckboxes(ele[i], values);
        
//     }

// }

function createCheckboxes(container, values, vl, type) {
    // Create and append checkboxes in a loop
    for (var i = 0; i < values.length; i++) {
        var chk = document.createElement("input");
        chk.type = "checkbox";
        chk.value = vl[i];

        // Create a label for the checkbox
        var label = document.createElement("label");
        label.innerHTML = values[i];

        if (type == 0) {
            chk.className = "chk_bronze"
        } else if (type == 1) {
            chk.className = "chk_silver"
        } else{
            chk.className = "chk_platinum"
        }

        // create break tag
        var br = document.createElement("br")

        // Append the checkbox and label to the container
        container.appendChild(chk);
        container.appendChild(label);
        container.appendChild(br)
    }
}


// handling submits
document.getElementById("submit-bronze").addEventListener("click", async function(event){
    event.preventDefault();

    btn_bronze = true;

    var price_b = document.getElementById("price_b").value;
    var concepts_b = document.getElementById("concepts_b").value;
    var rev_b = document.getElementById("rev_b").value;
    var duration_b = document.getElementById("duration_b").value;
    // var deliverables_chk = document.querySelectorAll('input[type="checkbox"]:checked');
    var deliverables = document.getElementsByClassName("chk_bronze")
    // var deliverables = document.querySelectorAll('input[type="checkbox"]');

    // var deliverablesObject = {};

    // // deliverables.forEach(function(checkbox) {
    // //     var checkboxValue = checkbox.value;

    // //     // Check if the value doesn't exist in the deliverablesObject
    // //     if (!(checkboxValue in deliverablesObject)) {
    // //         deliverablesObject[checkboxValue] = 0;
    // //     }
    // // });

    // deliverables.forEach(function(checkbox) {
    //     var checkboxValue = checkbox.value;
    //     deliverablesObject[checkboxValue] = 0;

    //     if (checkbox.checked == true) {
    //         deliverablesObject[checkboxValue] = 1;
    //     }
        

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
 
     // Print the deliverablesObject to the console
     console.log(deliverablesObject);
    // });

    // Update values to 1 for checked checkboxes
    // deliverables_chk.forEach(function(checkbox) {
    //     var checkboxValue = checkbox.value;

    //     // Check if the value exists in the deliverablesObject
    //     if (checkboxValue in deliverablesObject) {
    //         deliverablesObject[checkboxValue] = 1;
    //     }
    // });

    console.log("bronze deliverables object");

    console.log(deliverablesObject);

    var pricingData = {}

    switch (category) {
        case "1":
            pricingData = {
                type: "bronze",
                deliveryDuration: duration_b,
                noOfRevisions: rev_b,
                price: price_b,
                noOfConcepts: concepts_b,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        case "2":
            pricingData = {
                type: "bronze",
                deliveryDuration: duration_b,
                noOfRevisions: rev_b,
                price: price_b,
                noOfConcepts: concepts_b,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        case "3":
            pricingData = {
                type: "bronze",
                deliveryDuration: duration_b,
                noOfRevisions: rev_b,
                price: price_b,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        default:
            pricingData = {
                type: "bronze",
                deliveryDuration: duration_b,
                noOfRevisions: rev_b,
                price: price_b,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    }

    // var pricingData = {
    //     type: "bronze",
    //     deliveryDuration: duration_b,
    //     noOfRevisions: rev_b,
    //     price: price_b,
    //     noOfConcepts: concepts_b,
    //     packageId: packageId,
    //     deliverables: deliverablesObject
    // }

    console.log(pricingData);
    const operationType = pricePackageId_bronze ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}&pricePackageId=${pricePackageId_bronze}`
    : `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}`;


    try{
        var response = await fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(pricingData),
        });

        if (response.ok) {
            console.log(`Prcing data ${operationType}d successfully.`);
            // showPopupSuccess();
            if (operationType === "insert") {
                var rsp = response.json();
                rsp.then((data) => {
                    pricePackageId_bronze = data.pricePackageId
                })
            }
            
            // checkFlagsSuccess();
            // window.location = `../HTML/packages.html`
        } else {
            //// unscussess popup
            showPopupUnsuccess();
            // checkFlagsUnsuccess();
            errFlag = 1
            console.error(`Failed to ${operationType} package data.`);

        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    

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

    console.log(deliverables);

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

    console.log(deliverablesObject);

    var pricingData = {}

    switch (category) {
        case "1":
            pricingData = {
                type: "silver",
                deliveryDuration: duration_s,
                noOfRevisions: rev_s,
                price: price_s,
                noOfConcepts: concepts_s,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        case "2":
            pricingData = {
                type: "silver",
                deliveryDuration: duration_s,
                noOfRevisions: rev_s,
                price: price_s,
                noOfConcepts: concepts_s,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        case "3":
            pricingData = {
                type: "silver",
                deliveryDuration: duration_s,
                noOfRevisions: rev_s,
                price: price_s,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        default:
            pricingData = {
                type: "silver",
                deliveryDuration: duration_s,
                noOfRevisions: rev_s,
                price: price_s,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    }

    // var pricingData = {
    //     type: "bronze",
    //     deliveryDuration: duration_b,
    //     noOfRevisions: rev_b,
    //     price: price_b,
    //     noOfConcepts: concepts_b,
    //     packageId: packageId,
    //     deliverables: deliverablesObject
    // }

    console.log(pricingData);
    const operationType = pricePackageId_silver ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}&pricePackageId=${pricePackageId_silver}`
    : `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}`;


    try{
        var response = await fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(pricingData),
        });

        if (response.ok) {
            console.log(`Prcing data ${operationType}d successfully.`);
            // showPopupSuccess();
            if (operationType === "insert") {
                var rsp = response.json();
                rsp.then((data) => {
                    pricePackageId_silver = data.pricePackageId
                })
            }
            // checkFlagsSuccess();
            // window.location = `../HTML/packages.html`
        } else {
            //// unscussess popup
            showPopupUnsuccess();
            // checkFlagsUnsuccess();
            errFlag = 1
            console.error(`Failed to ${operationType} package data.`);

        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    

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

    console.log(deliverablesObject);

    var pricingData = {}

    switch (category) {
        case "1":
            pricingData = {
                type: "platinum",
                deliveryDuration: duration_p,
                noOfRevisions: rev_p,
                price: price_p,
                noOfConcepts: concepts_p,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        case "2":
            pricingData = {
                type: "platinum",
                deliveryDuration: duration_p,
                noOfRevisions: rev_p,
                price: price_p,
                noOfConcepts: concepts_p,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        case "3":
            pricingData = {
                type: "platinum",
                deliveryDuration: duration_p,
                noOfRevisions: rev_p,
                price: price_p,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    
        default:
            pricingData = {
                type: "platinum",
                deliveryDuration: duration_p,
                noOfRevisions: rev_p,
                price: price_p,
                packageId: packageId,
                deliverables: deliverablesObject
            }
            break;
    }

    // var pricingData = {
    //     type: "bronze",
    //     deliveryDuration: duration_b,
    //     noOfRevisions: rev_b,
    //     price: price_b,
    //     noOfConcepts: concepts_b,
    //     packageId: packageId,
    //     deliverables: deliverablesObject
    // }

    console.log(pricingData);
    const operationType = pricePackageId_platinum ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}&pricePackageId=${pricePackageId_platinum}`
    : `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}`;


    try{
        var response = await fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(pricingData),
        });

        if (response.ok) {
            console.log(`Prcing data ${operationType}d successfully.`);
            // showPopupSuccess();
            if (operationType === "insert") {
                var rsp = response.json();
                rsp.then((data) => {
                    pricePackageId_platinum = data.pricePackageId
                })
            }
            // checkFlagsSuccess();
            var sbtn = document.getElementById("submit-platinum");
            sbtn.innerHTML = "Saved";
            sbtn.style.backgroundColor = "#444";
        } else {
            //// unscussess popup
            showPopupUnsuccess();
            // checkFlagsUnsuccess();
            errFlag = 1;
            console.error(`Failed to ${operationType} package data.`);

        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    

});


document.getElementById("btn-success").addEventListener("click", function(){

    var popupContainer = document.getElementById('popup-container-success');
    var overlay = document.getElementById('overlay1');

    popupContainer.style.display = 'none';
    overlay.style.display = 'none';

    window.location = `../HTML/packages.html`
})

document.getElementById("btn-unsuccess").addEventListener("click", function(){

    var popupContainer = document.getElementById('popup-container-unsuccess');
    var overlay = document.getElementById('overlay2');

    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
})

document.getElementById("btn-warning").addEventListener("click", function(){

    var popupContainer = document.getElementById('popup-container-unsuccess');
    var overlay = document.getElementById('overlay3');

    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
})

function showPopupWarning() {
    var popupContainer = document.getElementById('popup-container-success');
    var overlay = document.getElementById('overlay3');
    
    overlay.style.display = 'block';

}

function showPopupSuccess() {
    var popupContainer = document.getElementById('popup-container-success');
    var overlay = document.getElementById('overlay1');
    
    overlay.style.display = 'block';

}

function showPopupUnsuccess() {
    var popupContainer = document.getElementById('popup-container-success');
    var overlay = document.getElementById('overlay2');
    
    overlay.style.display = 'block';
  }

//   function closePopup() {
//     var popupContainer = document.getElementById('popup-container');
//     var overlay = document.getElementById('overlay1');

//     // popupContainer.style.display = 'none';
//     overlay.style.display = 'none';
//   }

function checkFlagsSuccess(){
    if (btn_bronze && btn_silver && btn_platinum) {
        showPopupSuccess();
    }
    else{
        if (updateFlag) {
            showPopupSuccess();
            
        } else{
        showPopupWarning()

        }
    }
}

function checkFlagsUnsuccess(){
    if (btn_bronze && btn_silver && btn_platinum) {
        showPopupUnsuccess()
    }
    else{
        if (updateFlag) {
            showPopupUnsuccess();
            
        } else{
        showPopupWarning()

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



