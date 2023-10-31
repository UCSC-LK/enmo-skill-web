


var requestOptions = {
    method: 'GET',
    Credential:'include'
  };
  
    const listTictect = document.getElementById("ticket-box");
    const listItemTemplate = document.querySelector(".ticket-box-2");
  fetch("http://localhost:15000/enmo_skill_backend_war_exploded/support?UserId=13&Role=Designer", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      result.forEach(item => {
        const newItem = listItemTemplate.cloneNode(true);
        newItem.id = item.id;
        newItem.querySelector(".subject").textContent = item.subject;
        newItem.querySelector(".subject").addEventListener("click",()=>{
            console.log("popup")
            viewrequest(item)
        })

        newItem.querySelector(".date").textContent = item.date;
        //newItem.querySelector(".time").textContent = item.time;
        newItem.querySelector(".status").textContent = item.status;
        newItem.querySelector(".description").textContent = item.description;
        newItem.querySelector(".edit").addEventListener("click",()=>{
            
        })
        listTictect.appendChild(newItem);
      })
    })
    .catch(error => console.log('error', error));



//     function ss(res) {

//         const listTictect = document.getElementById("ticket-box");
//         const listItemTemplate = document.querySelector(".ticket-box-2");
//         // const count = document.getElementById("id");
        
//         // count.innerText=res.length;

//         res.forEach(item => {
//         const newItem = listItemTemplate.cloneNode(true);
//         //newItem.style.display = "block";
        
//       //   newItem.querySelector(".user").addEventListener("click", function() {
//       //     console.log("Clicked username: " + item.username);
//       // });

//         //newItem.querySelector(".image").textContent = item.image;
//         //newItem.querySelector(".id").textContent = item.id;
//         //newItem.querySelector(".id").textContent = item.id;
//         newItem.id = item.id;
//         newItem.querySelector(".subject").textContent = item.subject;
//         newItem.querySelector(".date").textContent = item.date;
//         //newItem.querySelector(".time").textContent = item.time;
//         newItem.querySelector(".status").textContent = item.status;
//         newItem.querySelector(".description").textContent = item.description;
        
//         //newItem.querySelector(".description").textContent = item.description;
//         //newItem.querySelector(".icon").textContent = item.icon;
        
    
//         //console.log("sssssss")
//         // newItem.classList.remove("ticket-box-2");
//         // newItem.classList.add("row"); 
       
//         listTictect.appendChild(newItem);

//         viewrequest(item);

//     });

//   }

// const res=[
//     {
//         id:1,
//         //image:"../Assests/login_img1.jpg",
       
//         subject:"Late pfayment",            
//         date:"22/10/2020",
        
//         status:"Asigned",
//         description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
//     },
//     {
//         id:1,
//         //image:"../Assests/login_img1.jpg",
       
//         subject:"Late paymdent",            
//         date:"22/10/2020",
//         time:"10.22",
//         status:"Asiggned",
//         description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
//     },
//     {
//         id:1,
//         //image:"../Assests/login_img1.jpg",
       
//         subject:"Late llllyment",            
//         date:"22/10/2020",
        
//         status:"Asigdned",
//         description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
//     },
//     {
//         id:1,
//         //image:"../Assests/login_img1.jpg",
       
//         subject:"jjj",
//         date:"22/10/2020",
        
//         status:"Asigned",
//         description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
//     }
// ];
  

function viewrequest(item){
    let popup_con=document.querySelector(".pop-up-container");
    let popup_details=document.querySelector(".pop-up");

    
        popup_con.style.display="flex";
        popup_details.style.display="inline";
        popup_details.querySelector(".subject").textContent = item.subject;
        popup_details.querySelector(".description").textContent = item.description;
        popup_details.querySelector(".date").textContent = item.date;
        //popup_details.querySelector(".time").textContent = item.time;
        popup_details.querySelector(".status").textContent = item.status;
    
    popup_con.onclick=(event)=>{
        popup_con.style.display="none";
        popup_details.style.display="none";
    }
}

function createticket(){
  window.location.href = "../HTML/createTicket.html"
}

