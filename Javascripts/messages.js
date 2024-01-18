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

let chatid;
let chatopenedFlag =false;
const listItemTemplate = document.querySelector(".card-hide");
const listContainer = document.querySelector(".left-panel");
const msgbox = document.querySelector(".left-panel");
const maassagemain = document.querySelector(".msg-box-main");
maassagemain.style.display="none"

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  function loadchat(){
  fetch(BASE_URL+"/chats?userid="+getCookie("User_ID"), requestOptions)
    .then(response => response.json())
    .then(result =>{
        console.log(result);

        listContainer.innerHTML="<div class=\"title-bar\"><p class=\"title-text\">Messages</p></div>"

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

  }
  loadchat();

    const messagesContainer = document.querySelector(".msg-contain");
    const messagesOUT = document.querySelector(".outgoing-chats-hide");
    const messagesIN = document.querySelector(".received-chats-hide");
function openchat(item){
    chatopenedFlag=true;
    chatid=item;
    maassagemain.style.display="flex"
    const username = document.querySelector(".username");
    username.textContent=item.name;
    

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(BASE_URL+"/messages?userid="+getCookie("User_ID")+"&chatid="+item.chatid, requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
            messagesContainer.innerHTML = '';
        
            result.forEach(item=>{
                if(item.isyour==1){
                    const newItem = messagesOUT.cloneNode(true);

                    newItem.querySelector(".multi-msg").textContent = item.Message;
                    newItem.querySelector(".time").textContent = gettime(item.time);
                    newItem.classList.remove("outgoing-chats-hide");
                    newItem.classList.add("outgoing-chats");
                    
                    messagesContainer.appendChild(newItem)
                }else{
                    const newItem = messagesIN.cloneNode(true);
                    newItem.querySelector(".multi-msg").textContent = item.Message;

                    newItem.querySelector(".time").textContent = gettime(item.time);
                    newItem.classList.remove("received-chats-hide");
                    newItem.classList.add("received-chats");

                    messagesContainer.appendChild(newItem)
                }
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
            })
        
        })
        .catch(error => console.log('error', error));
        
        
}

function gettime(timestamp){
    let date = new Date(parseInt(timestamp, 10));
    let formattedDateTime = date.toLocaleString(); 
    return formattedDateTime;

}


const input = document.querySelector(".input-msg");
const send = document.querySelector(".send");

send.addEventListener("click",sendmessage)

function sendmessage() {

    if(input.value=="")return;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": getCookie("User_ID"),
        "chatid": chatid.chatid,
        "Message": input.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:15000/enmo_skill_backend_war/messages", requestOptions)
        .then(response =>{
            if (response.status === 201){
            const newItem = messagesOUT.cloneNode(true);

            newItem.querySelector(".multi-msg").textContent = input.value;
            const currentTime = new Date().getTime();
            newItem.querySelector(".time").textContent = gettime(currentTime);
            newItem.classList.add("outgoing-chats");
            messagesContainer.appendChild(newItem);
            input.value = "";
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            loadchat();
        }})
        .then(result => {
           
        })
        .catch(error => console.log('error', error));

}


setInterval(()=>{
    if (!document.hidden&&chatopenedFlag) {
        openchat(chatid)
    }
},30000)

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendmessage(); 
    }
});