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

  const url = new URL(window.location.href);
  var CHATiD = url.searchParams.get('newchat');
  let Name = url.searchParams.get('name');
  let PROFurl = url.searchParams.get('profurl');

  


let chatid;
let chatopenedFlag =false;
const listItemTemplate = document.querySelector(".card-hide");
const listContainer = document.querySelector(".left-panel");
const msgbox = document.querySelector(".left-panel");
const maassagemain = document.querySelector(".msg-box-main");
maassagemain.style.display="none"
var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", getCookie("JWT"));

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  function loadchat(){
  fetch(BASE_URL+"/chats", requestOptions)
    .then(response =>{
    if(response.status === 200){
        return response.json()
    }
    else if(response.status === 401){
        window.location.href = "../Failed/401.html";
    }else if(response.status === 400){
        Swal.fire({
            title: "Bad Request",
            showConfirmButton:false,
            icon: "error"
            }); 
    }
    else if(response.status === 500){
        Swal.fire({
            title: "Internal Server Error",
            
            showConfirmButton:false,
            icon: "error"
            });
    }else if(response.status === 406){
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
    }})
    .then(result =>{
        console.log(result);

        listContainer.innerHTML="<div class=\"title-bar\"><p class=\"title-text\">Messages</p></div>"

        result.forEach(item => {
            const newItem = listItemTemplate.cloneNode(true);
            newItem.querySelector(".u-name").textContent = item.name;
            newItem.querySelector(".l-msg").textContent = item.lastmsg;
            newItem.querySelector(".u-img").src = item.url;

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

    if(item.url!=undefined && item.url!=null && item.url!="null"){
        const userurl = document.querySelector(".profile-img");
        userurl.src=item.url;
    }
    
    myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("JWT"));

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      
      fetch(BASE_URL+"/messages?userid="+35+"&chatid="+item.chatid, requestOptions)
        .then(response => {
        if(response.status === 200){
            return response.json()
        }
        else if(response.status === 401){
            window.location.href = "../Failed/401.html";
        }else if(response.status === 400){
            Swal.fire({
                title: "Bad Request",
                showConfirmButton:false,
                icon: "error"
                }); 
        }
        else if(response.status === 500){
            Swal.fire({
                title: "Internal Server Error",
                showConfirmButton:false,
                icon: "error"
                });
        }else if(response.status === 406){
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        }})
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
    myHeaders.append("Authorization", getCookie("JWT"));

    var raw = JSON.stringify({
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
        }
        else if(response.status === 401){
            window.location.href = "../Failed/401.html";
        }else if(response.status === 400){
            Swal.fire({
                title: "Bad Request",
                showConfirmButton:"#f94b4b",
                icon: "error"
                });
        }else if(response.status === 500){
            Swal.fire({
                title: "Internal Server Error",
                confirmButtonColor:"#f94b4b",
                icon: "error"
                });
        }else if(response.status === 403){
            []
                Swal.fire({
                text: "You have no permission send message to this chat",
                showConfirmButton:false,
                icon: "error"
                });
        }else if(response.status === 406){
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        }
    
    })
        .then(result => {
           
        })
        .catch(error => console.log('error', error));

}


setInterval(()=>{
    if (!document.hidden&&chatopenedFlag) {
        openchat(chatid)
    }
},3000)

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendmessage(); 
    }
});

if(CHATiD != null && Name != null&&PROFurl!=null){
    formdata = new FormData();
    formdata ={name:Name,chatid:CHATiD,url:PROFurl}
    openchat(formdata)
  
  }


  //this is chat creation part it need createchat=true and id of the user to whom you want to chat


  let isCreatechat = url.searchParams.get('createchat'); 
  let id = url.searchParams.get('id');
  if(isCreatechat != null && isCreatechat=="true"&&id!=null){
    document.querySelector(".loading").style.display="flex";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", getCookie("JWT"));

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(BASE_URL+"/chats?receiverID="+id, requestOptions)
    .then((response) => {
        document.querySelector(".loading").style.display="none";
        if(response.status === 201){
            return response.json()
        }
        else if(response.status === 401){
            window.location.href = "../Failed/401.html";
        }else if(response.status === 400){
            Swal.fire({
                title: "Bad Request",
                showConfirmButton:false,
                icon: "error"
                }); 
        }
        else if(response.status === 500){
            Swal.fire({
                title: "Internal Server Error",
                text: "Your requested User cannot be found or Our server has some issue",
                showConfirmButton:false,
                icon: "error"
                });
        }else if(response.status === 406){
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = "../Failed/Session%20timeout.html?returnUrl="+currentUrl;
        }
        else if(response.status === 403){
            Swal.fire({
                title: "Forbidden",
                text: "Designers are not allowed to create chats",
                showConfirmButton:false,
                icon: "error"
                });
        }
    
    
    })
    .then((result) => {
        console.log(result)
        window.location.href = "./messages.html?newchat="+result.chat_id+"&name="+result.username+"&profurl="+result.url;    
    })
    .catch((error) => console.error(error));
    }