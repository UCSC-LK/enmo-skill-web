// const parent = document.querySelector(".languag-selecter-main")
// const child = document.querySelector(".language-selecter")
// const addButton = document.querySelector(".add");

// let cloneCount = 0;
// const maxClones = 2;


// addButton.addEventListener("click", () => {
//     if (cloneCount < maxClones) {
//         const newItem = child.cloneNode(true);
//         parent.appendChild(newItem);
//         cloneCount++;
//     }
// });


const parent = document.querySelector(".languag-selecter-main");
const child = document.querySelector(".language-selecter");
const addButton = document.querySelector(".btn");

let cloneCount = 0;
const maxClones = 3;
let selectedLanguages = [];

addButton.addEventListener("click", () => {
     
    if (cloneCount < maxClones) {
        const newItem = child.cloneNode(true);
        parent.appendChild(newItem);
        cloneCount++; 
    }

    // Add event listener to all dropdowns to hide the selected option
    document.querySelectorAll(".language").forEach((select) => {
        select.addEventListener("change", () => {
            const selectedValue = select.value;
            selectedLanguages.push(selectedValue);

            // Reset display for all options in all dropdowns
            document.querySelectorAll(".language").forEach((option) => {
                option.style.display = "";
            });

            // Hide the selected option 
            document.querySelectorAll(".language").forEach((otherSelect) => {
                const optionToHide = otherSelect.querySelector(`[value="${selectedValue}"]`);
                if (optionToHide) {
                    optionToHide.style.display = "none";
                }
            });
        });
    });

    if(cloneCount == 3){
        document.querySelector(".add-btn").style.display="none"
}

});



console.log(selectedLanguages)



