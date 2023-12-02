document.addEventListener("DOMContentLoaded", setDeliverables);

// extract type of the package
const url = new URL(window.location.href);
const category = url.searchParams.get('category');
const packageId = url.searchParams.get('packageId')
const pricePackageId = url.searchParams.get('pricePackageId')
console.log(category);

// setting flag variables
var btn_bronze = false;
var btn_sliver = false;
var btn_platinum = false;

function setDeliverables() {
    // extract type of the package
    // const url = new URL(window.location.href);
    // const category = url.searchParams.get('category');
    // const packageId = url.searchParams.get('packageId')
    // console.log(category);

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
                    createCheckboxes(deli_div[i], checkboxValues, valueschk);
                    
                }


                break;
            case "2":
                var checkboxValues = ["Source file", "High resolution", "Background/scene", "Color", "Full body", "Commercial use"];
                var valueschk = ["sourceFile", "highResolution", "background/scene", "color", "fullBody", "commercialUse"];
                for (let i = 0; i < 3; i++) {
                    lb[i].innerHTML = "No of figures"
                    createCheckboxes(deli_div[i], checkboxValues, valueschk);
                    
                }


                break;
            case "3":
                var checkboxValues = ["Print-Ready", "Source File", "Double-sided", "Custom graphics", "Photo editing", "Social media design", "Commercial Use"];
                var valueschk = ["printReady", "sourceFile", "doubleSided", "customGraphics", "photoEditing", "socialMediaDesign", "commercialUse"];
                for (let i = 0; i < 3; i++) {
                    lb.remove
                    createCheckboxes(deli_div[i], checkboxValues, valueschk);    
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
}

// function setupCheckBoxes(ele, values, label_val){
//     var lb = document.getElementsByClassName("chg");
//     for (let i = 0; i < 3; i++) {
//         lb[i].innerHTML = label_val;
//         createCheckboxes(ele[i], values);
        
//     }

// }

function createCheckboxes(container, values, vl) {
    // Create and append checkboxes in a loop
    for (var i = 0; i < values.length; i++) {
        var chk = document.createElement("input");
        chk.type = "checkbox";
        chk.value = vl[i];

        // Create a label for the checkbox
        var label = document.createElement("label");
        label.innerHTML = values[i];

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
    var deliverables_chk = document.querySelectorAll('input[type="checkbox"]:checked');
    var deliverables = document.querySelectorAll('input[type="checkbox"]');

    var deliverablesObject = {};

    deliverables.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value doesn't exist in the deliverablesObject
        if (!(checkboxValue in deliverablesObject)) {
            deliverablesObject[checkboxValue] = 0;
        }
    });

    // Update values to 1 for checked checkboxes
    deliverables_chk.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value exists in the deliverablesObject
        if (checkboxValue in deliverablesObject) {
            deliverablesObject[checkboxValue] = 1;
        }
    });


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
    
        case "1":
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
    const operationType = pricePackageId ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}&pricePackageId=${pricePackageId}`
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
            checkFlagsSuccess();
            // window.location = `../HTML/packages.html`
        } else {
            //// unscussess popup
            // showPopupUnsuccess();
            checkFlagsUnsuccess();
            console.error(`Failed to ${operationType} package data.`);

        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    

});

// handling submits
document.getElementById("submit-silver").addEventListener("click", async function(event){
    event.preventDefault();

    btn_sliver = true;

    var price_s = document.getElementById("price_s").value;
    var concepts_s = document.getElementById("concepts_s").value;
    var rev_s = document.getElementById("rev_s").value;
    var duration_s = document.getElementById("duration_s").value;
    var deliverables_chk = document.querySelectorAll('input[type="checkbox"]:checked');
    var deliverables = document.querySelectorAll('input[type="checkbox"]');

    var deliverablesObject = {};

    deliverables.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value doesn't exist in the deliverablesObject
        if (!(checkboxValue in deliverablesObject)) {
            deliverablesObject[checkboxValue] = 0;
        }
    });

    // Update values to 1 for checked checkboxes
    deliverables_chk.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value exists in the deliverablesObject
        if (checkboxValue in deliverablesObject) {
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
    const operationType = pricePackageId ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}&pricePackageId=${pricePackageId}`
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
            checkFlagsSuccess();
            // window.location = `../HTML/packages.html`
        } else {
            //// unscussess popup
            // showPopupUnsuccess();
            checkFlagsUnsuccess();
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
    var deliverables_chk = document.querySelectorAll('input[type="checkbox"]:checked');
    var deliverables = document.querySelectorAll('input[type="checkbox"]');

    var deliverablesObject = {};

    deliverables.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value doesn't exist in the deliverablesObject
        if (!(checkboxValue in deliverablesObject)) {
            deliverablesObject[checkboxValue] = 0;
        }
    });

    // Update values to 1 for checked checkboxes
    deliverables_chk.forEach(function(checkbox) {
        var checkboxValue = checkbox.value;

        // Check if the value exists in the deliverablesObject
        if (checkboxValue in deliverablesObject) {
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
    const operationType = pricePackageId ? "update" : "insert";

    var requestUrl = operationType === "update"
    ? `${BASE_URL}/packagepricing?packageId=${packageId}&category=${category}&pricePackageId=${pricePackageId}`
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
            checkFlagsSuccess();
        } else {
            //// unscussess popup
            // showPopupUnsuccess();
            checkFlagsUnsuccess();
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
    if (btn_bronze && btn_sliver && btn_platinum) {
        console.log("inside of something");
        showPopupSuccess();

    }
}

function checkFlagsUnsuccess(){
    if (btn_bronze && btn_sliver && btn_platinum) {
        showPopupUnsuccess()
    }
}

