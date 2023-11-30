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


const listItemTemplate = document.querySelector(".card-hide");
const listContainer = document.querySelector(".left-panel");
const msgbox = document.querySelector(".left-panel");

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(BASE_URL+"/chats?userid="+getCookie("User_ID"), requestOptions)
    .then(response => response.json())
    .then(result =>{
        console.log(result);

        result.forEach(item => {
            const newItem = listItemTemplate.cloneNode(true);
            newItem.querySelector(".u-name").textContent = item.name;
            newItem.querySelector(".l-msg").textContent = item.lastmsg;

            newItem.addEventListener("click",(event )=>{
                event.stopPropagation();
                
                openchat(item) 
           
                
               
              })

            newItem.classList.remove("card-hide");
            newItem.classList.add("card");

            listContainer.appendChild(newItem)
        });
        



    } )
    .catch(error => console.log('error', error));



    const messagesContainer = document.querySelector(".msg-contain");
    const messagesOUT = document.querySelector(".outgoing-chats-hide");
    const messagesIN = document.querySelector(".received-chats-hide");
function openchat(item){
    
    const username = document.querySelector(".username");
    username.textContent=item.name;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(BASE_URL+"/messages?userid="+getCookie("User_ID")+"&chatid="+item.chatid, requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
        
            result.forEach(item=>{
                if(item.isyour==1){
                    const newItem = messagesOUT.cloneNode(true);

                    newItem.querySelector(".multi-msg").textContent = item.Message;
                    newItem.querySelector(".time").textContent = item.time;
                    newItem.classList.remove("outgoing-chats-hide");
                    newItem.classList.add("outgoing-chats");
                    
                    messagesContainer.appendChild(newItem)
                }else{
                    const newItem = messagesIN.cloneNode(true);
                    newItem.querySelector(".multi-msg").textContent = item.Message;
                    newItem.querySelector(".time").textContent = item.time;
                    newItem.classList.remove("received-chats-hide");
                    newItem.classList.add("received-chats");

                    messagesContainer.appendChild(newItem)
                }
                
            })
        
        })
        .catch(error => console.log('error', error));

}