document.addEventListener("DOMContentLoaded", setDeliverables);

function setDeliverables() {
    // extract type of the package
    const url = new URL(window.location.href);
    const category = url.searchParams.get('category');
    console.log(category);

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
            case "logo_designing":
                // console.log("inside");

                var checkboxValues = ["Logo transparency", "Vector file", "Printable file", "3D mockup", "Source file", "Social media kit"];
                for (let i = 0; i < 3; i++) {
                    lb[i].innerHTML = "No of concepts"
                    createCheckboxes(deli_div[i], checkboxValues);
                    
                }
                break;
            case "illustration":
                var checkboxValues = ["Source file", "High resolution", "Background/scene", "Color", "Full body", "Commercial use"];
                for (let i = 0; i < 3; i++) {
                    lb[i].innerHTML = "No of figures"
                    createCheckboxes(deli_div[i], checkboxValues);
                    
                }
                break;
            case "flyer_designing":
                var checkboxValues = ["Print-Ready", "Source File", "Double-sided", "Custom graphics", "Photo editing", "Social media design", "Commercial Use"];
                for (let i = 0; i < 3; i++) {
                    lb.remove
                    createCheckboxes(deli_div[i], checkboxValues);    
                }

                document.getElementById("concepts_b").remove()
                document.getElementById("concepts_s").remove()
                document.getElementById("concepts_p").remove()

                break;
            default:
                var checkboxValues = ["Custom graphics", "Source file", "Print-ready"];
                for (let i = 0; i < 3; i++) {
                    lb.remove
                    createCheckboxes(deli_div[i], checkboxValues);    
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

function createCheckboxes(container, values) {
    // Create and append checkboxes in a loop
    for (var i = 0; i < values.length; i++) {
        var chk = document.createElement("input");
        chk.type = "checkbox";
        chk.value = values[i];

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
document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();

    
})

