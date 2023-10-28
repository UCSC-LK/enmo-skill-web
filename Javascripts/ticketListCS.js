

// var requestOptions = {
//   method: 'GET',
//   Credential:'include',
// };
  

//fetch(res, requestOptions)
   //.then(res  => response.json())
   //.then(result => {
    function ss(res) {

        const listTictect = document.getElementById("ticket-box");
        const listItemTemplate = document.querySelector(".ticket-box-2");
        const count = document.getElementById("id");
        
        count.innerText=res.length;

        res.forEach(item => {
        const newItem = listItemTemplate.cloneNode(true);
        //newItem.style.display ="block";
        
      //   newItem.querySelector(".user").addEventListener("click", function() {
      //     console.log("Clicked username: " + item.username);
      // });

        //newItem.querySelector(".image").textContent = item.image;
        //newItem.querySelector(".id").textContent = item.id;
        //newItem.querySelector(".id").textContent = item.id;
        newItem.querySelector(".name").textContent = item.name;
        newItem.querySelector(".role").textContent = item.role;
        newItem.querySelector(".subject").textContent = item.subject;
        newItem.querySelector(".status").textContent = item.status;
        newItem.querySelector(".agent").textContent = item.agent;
        newItem.querySelector(".date").textContent = item.date;
        //newItem.querySelector(".description").textContent = item.description;
        //newItem.querySelector(".icon").textContent = item.icon;
        
    
        //console.log("sssssss")
        // newItem.classList.remove("ticket-box-2");
        // newItem.classList.add("row"); 
       
        listTictect.appendChild(newItem);

        //viewrequest(item);

    });

  }

const res=[
    {
        id:1,
        //image:"../Assests/login_img1.jpg",
        name:"Rone",
        role:"designer",
        subject:"Late payment",            
        status:"Asigned",
        agent:"Done",
        date:"22/10/2020",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
    },
    {
        id:1,
        //image:"../Assests/login_img1.jpg",
        name:"Rone",
        role:"designer",
        subject:"Late payment",            
        status:"Asigned",
        agent:"Don",
        date:"22/10/2020",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
        //icon:"../Assests/icons/support.png"
    },

    {
        id:1,
        //image:"../Assests/login_img1.jpg",
        name:"Rone",
        role:"designer",
        subject:"Late payment",            
        status:"Asigned",
        agent:"Don",
        date:"22/10/2020",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
        //icon:"../Assests/icons/support.png"
    },

    {
        id:1,
        //image:"../Assests/login_img1.jpg",
        name:"Rone",
        role:"designer",
        subject:"Late payment",            
        status:"Asigned",
        agent:"Don",
        date:"22/10/2020",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
        //icon:"../Assests/icons/support.png"
    }
];
  
ss(res);

//   function viewrequest(item){
//     popupview.style.display="flex";
//     closetn.addEventListener("click", ()=> {
//     popupview.style.display="none"
//     })
//     name.innerHTML=item.name
//     role.innerHTML=item.role;
//     // userurl
//     subject.innerHTML=item.subject
//     agent.innerHTML=item.agent;
//     date.innerHTML=item.date;
//   }


    
// let popup_con=document.querySelector(".pop-up-container");
//         let popup_details=document.querySelector(".pop-up");
//         // console.log(popup_con)
//         document.getElementById(item.id).onclick=(event)=>{
//             popup_con.style.display="flex";
//             popup_details.style.display="inline";
//         }
//         popup_con.onclick=(event)=>{
//         popup_con.style.display="none";
//         popup_details.style.display="none";
//     }