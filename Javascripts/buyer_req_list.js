// Assume this is the response from your backend API
const responseData = [
    { 
        id: 1, 
        date: "2023-10-10", 
        user: "User 1", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi eligendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!", 
        duration: "2 hours", 
        budget: "$100"
    },
    { 
        id: 2, 
        date: "2023-10-11", 
        user: "User 2", 
        description: "Lorem ipsum domaiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!" 
        , 
        duration: "3 hours", 
        budget: "$150"
    },
    { 
        id: 3, 
        date: "2023-10-12", 
        user: "User 3", 
        description: "Lorem ipsum dolor sit amet consectetur adipisipsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi ecing elit. Odit repellat culpa ducimus ex excepturi eligendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "1.5 hours", 
        budget: "$80"
    },
    { 
        id: 4, 
        date: "2023-10-13", 
        user: "User 4", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. psum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi epsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi epsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi epsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi eOdit repellat culpa ducimus ex excepturi eligendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2.5 hours", 
        budget: "$120"
    },
    { 
        id: 5, 
        date: "2023-10-14", 
        user: "User 5", 
        description: "Lorem ipsum dolor sit amebus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2 hours", 
        budget: "$110"
    },
    { 
        id: 6, 
        date: "2023-10-15", 
        user: "User 6", 
        description: "Lorem  Deleniti in maiores possimus erferendis nam!"     , 
        duration: "3 hours", 
        budget: "$160"
    },
    { 
        id: 7, 
        date: "2023-10-16", 
        user: "User 7", 
        description: "Lorem ipsumbus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "1.5 hours", 
        budget: "$90"
    },
    { 
        id: 8, 
        date: "2023-10-17", 
        user: "User 8", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing eligendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2 hours", 
        budget: "$100"
    },
    { 
        id: 9, 
        date: "2023-10-18", 
        user: "User 9", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.t voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "3 hours", 
        budget: "$150"
    },
    { 
        id: 10, 
        date: "2023-10-19", 
        user: "User 10", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicinc qui carchitecto molestias tempora, perferendis nam!"     , 
        duration: "2 hours", 
        budget: "$110"
    },
    { 
        id: 11, 
        date: "2023-10-20", 
        user: "User 11", 
        description: "Lorem ipsum dolor sit amet consectetupsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi eendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2.5 hours", 
        budget: "$120"
    },
    { 
        id: 12, 
        date: "2023-10-21", 
        user: "User 12", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi epsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi epsum dolor sit amet consectetur adipisicing elit. Odit repellat culpa ducimus ex excepturi eligendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "1.5 hours", 
        budget: "$85"
    },
    { 
        id: 13, 
        date: "2023-10-22", 
        user: "User 13", 
        description: "Lorem ipsum dolor sit amet consectetur adin maiores possimus iusto ham!"     , 
        duration: "3 hours", 
        budget: "$160"
    },
    { 
        id: 14, 
        date: "2023-10-23", 
        user: "User 14", 
        description: "Lorem ipsum dolor sit amet consectet culpa ducimus ex excepturi eligendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2 hours", 
        budget: "$100"
    },
    { 
        id: 15, 
        date: "2023-10-24", 
        user: "User 15", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicex excepturi eligendi impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2.5 hours", 
        budget: "$130"
    },
    { 
        id: 16, 
        date: "2023-10-25", 
        user: "User 16", 
        description: "Lo impedit voluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "1.5 hours", 
        budget: "$95"
    },
    { 
        id: 17, 
        date: "2023-10-26", 
        user: "User 17", 
        description: "Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2 hours", 
        budget: "$110"
    },
    { 
        id: 18, 
        date: "2023-10-27", 
        user: "User 18", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elitatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "3 hours", 
        budget: "$170"
    },
    { 
        id: 19, 
        date: "2023-10-28", 
        user: "User 19", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. res possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2 hours", 
        budget: "$120"
    },
    { 
        id: 20, 
        date: "2023-10-29", 
        user: "User 20", 
        description: "Lorem ipsum dolovoluptatibus? Deleniti in maiores possimus iusto hic qui commodi architecto molestias tempora, perferendis nam!"     , 
        duration: "2.5 hours", 
        budget: "$140"
    }
];
// Function to set a cookie
// function setCookie(name, value, daysToExpire) {
//     const date = new Date();
//     date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
//     const expires = `expires=${date.toUTCString()}`;
//     document.cookie = `${name}=${value}; ${expires}; path=/`;
//   }
  
//   // Usage
//   setCookie('username', 'john_doe', 30); // Save a username cookie with a 30-day expiration
  


const listContainer = document.getElementById("table");
const count = document.getElementById("count");

const listItemTemplate = document.querySelector(".row-hidden");


var requestOptions = {
  method: 'GET',
  Credential:'include'
};

fetch("http://localhost:15000/enmo_skill_backend_war/request?Role=Designer", requestOptions)
  .then(response => response.json())
  .then(result => {
    count.innerText=result.length;
    result.forEach(item => {
    
        const newItem = listItemTemplate.cloneNode(true);
        
        
        newItem.querySelector(".date").textContent = item.date;
        newItem.querySelector(".user").textContent = item.username;
        newItem.querySelector(".dis").textContent = item.discription;
        newItem.querySelector(".duration").textContent = item.duration +" Days";
        newItem.querySelector(".budget").textContent = "Rs. "+item.budget;
        
        
        newItem.classList.remove("row-hidden");
        newItem.classList.add("row"); 
       
        listContainer.appendChild(newItem);
    })

  })
  .catch(error => console.log('error', error));
    








