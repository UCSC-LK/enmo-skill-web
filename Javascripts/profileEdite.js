//uplod img----------------------------------------------------------------------
const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
    const image = this.files[0];
    if (image.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
            const imgUrl = reader.result;
            imgArea.innerHTML = '';

            // Set the background image of .img-area and configure background size
            imgArea.style.backgroundImage = `url(${imgUrl})`;
            imgArea.style.backgroundSize = 'cover';
            imgArea.style.backgroundRepeat = 'no-repeat';

            imgArea.classList.add('active');
            imgArea.dataset.img = image.name;
        };
        reader.readAsDataURL(image);
    } else {
        alert("Image size more than 2MB");
    }
});


//drop down skills------------------------------------------------------------------
const parentSkill = document.querySelector(".skill-selecter-main");
const childSkill = document.querySelector(".skill-selecter");

let selectedSkill = []
let cloneCount1=0
const maxSkillClones = 2

const skillDropdown = document.getElementById('skill');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

  
fetch("http://localhost:15000/enmo_skill_backend_war/skill", requestOptions)
    .then(response => response.json())
    .then(result => {

        result.push({"skills": "Select a skill","skill_id": "0"})

        result.sort(function(a, b) {
            return (a.skill_id - b.skill_id);
        }).sort(function(a, b) {
            return (a.skill_id - b.skill_id);
        });

        console.log(result)

        // Populate the skill dropdown with options 
        result.forEach(skill => {  
            const option = document.createElement('option');
            option.value = skill.skill_id;
            option.textContent = skill.skills;
            skillDropdown.appendChild(option);
            console.log(option)

        });
    })
    .catch(error => console.log('error', error));

document.querySelector(".setSkills").addEventListener("click",()=>{

        if(cloneCount1<maxSkillClones){
            const newItemSkill = childSkill.cloneNode(true);
            parentSkill.appendChild(newItemSkill);
            cloneCount1++
        }
    

    document.querySelectorAll(".skill").forEach((select) => {
        select.addEventListener("change", () => {

            const selectedValue = select.value;
           
            selectedSkill.push(selectedValue)

            // Reset display for all options in all dropdowns
            document.querySelectorAll(".skill").forEach((option) => {
                option.style.display = "";
            });

            // Hide the selected option 
            document.querySelectorAll(".skill").forEach((otherSelect) => {
                const optionToHide = otherSelect.querySelector(`[value="${selectedValue}"]`);
                if (optionToHide) {
                    optionToHide.style.display = "none";
                }
            });

            const optionToHide = select.querySelector(`[value="0"]`);
            if (optionToHide) {
                optionToHide.style.display = "none";
            }

        });
    });

    if(cloneCount1 == maxSkillClones){
        document.querySelector(".add-skill-btn").style.display="none"
    }

})

console.log(selectedSkill)


//drop down language----------------------------------------------------------------------------------
const parent = document.querySelector(".languag-selecter-main");
const child = document.querySelector(".language-selecter");
const addButton = document.querySelector(".setLanguage");

let cloneCount = 0;
const maxClones = 3;
let selectedLanguages = []



addButton.addEventListener("click", () => {
    addLanguage()
});

  
function addLanguage(){

    if (cloneCount < maxClones) {
        const newItem = child.cloneNode(true);
        parent.appendChild(newItem);
        cloneCount++; 
    }

    // Add event listener to all dropdowns to hide the selected option
    document.querySelectorAll(".language").forEach((select) => {
        select.addEventListener("change", () => {

            const selectedValue = select.value;

            selectedLanguages.push(selectedValue)

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

            const optionToHide = select.querySelector(`[value=""]`);
            if (optionToHide) {
                optionToHide.style.display = "none";
            }
            
        });
        
    });

    if(cloneCount == maxClones){
        document.querySelector(".add-btn").style.display="none"
    }
}

// document.querySelector(".reset").addEventListener("click",()=>{

//     selectedLanguages.forEach((selectedValue) => {
//         document.querySelectorAll(".language").forEach((select) => {
//             const optionToShow = select.querySelector(`[value="${selectedValue}"]`);
//             if (optionToShow) {
//                 optionToShow.style.display = "";
//             }
//         });
//     });

//     selectedLanguages = [];
//     cloneCount = 0;

//     document.querySelectorAll(".language-selecter").forEach((item, index) => {
//         if (index > 0) {
//             item.remove();
//         }
//     });
    
// })

console.log(selectedLanguages)

//send post request-------------------------------------------------------------

document.querySelector(".saveBTN").addEventListener("click",()=>{
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const fname = document.getElementById("firstName").value
    const lname = document.getElementById("lastName").value
    const display_name = document.getElementById("displayName").value
    const description = document.getElementById("description").value

    var raw = JSON.stringify({
        "userId": "36",
        "role": "Designer",
        "fname": fname,
        "lname": lname,
        "display_name": display_name,
        "description":description,
        "skills": selectedSkill,
        "language": selectedLanguages
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:15000/enmo_skill_backend_war/profile", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


})

