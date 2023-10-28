

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
        //newItem.style.display = "block";
        
      //   newItem.querySelector(".user").addEventListener("click", function() {
      //     console.log("Clicked username: " + item.username);
      // });

        //newItem.querySelector(".image").textContent = item.image;
        //newItem.querySelector(".id").textContent = item.id;
        //newItem.querySelector(".id").textContent = item.id;
        newItem.querySelector(".subject").textContent = item.subject;
        newItem.querySelector(".date").textContent = item.date;
        newItem.querySelector(".time").textContent = item.time;
        newItem.querySelector(".status").textContent = item.status;
        
        
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
       
        subject:"Late payment",            
        date:"22/10/2020",
        time:"10.22",
        status:"Asigned",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
    },
    {
        id:1,
        //image:"../Assests/login_img1.jpg",
       
        subject:"Late payment",            
        date:"22/10/2020",
        time:"10.22",
        status:"Asigned",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
    },
    {
        id:1,
        //image:"../Assests/login_img1.jpg",
       
        subject:"Late payment",            
        date:"22/10/2020",
        time:"10.22",
        status:"Asigned",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
    },
    {
        id:1,
        //image:"../Assests/login_img1.jpg",
       
        subject:"Late payment",            
        date:"22/10/2020",
        time:"10.22",
        status:"Asigned",
        description:"  I hope this message finds you well. We would like to bring to your attention the outstandng payment for the project with referenc number [Project Number or Description], which is currently overdue. As per our agreement, the number [Project Number or Description], which is currently overdue. As per our agreement, the  payment was due on [Due Date]."
      
    }
];
  
ss(res);

