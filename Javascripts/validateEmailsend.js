const url = new URL(window.location.href);
const email = url.searchParams.get('email');
document.querySelector(".email").textContent=email
let sendFlag =true;

function send(){
if(!sendFlag)return
sendFlag=false
document.querySelector(".loading").style.display="flex";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
method: 'OPTIONS',
headers: myHeaders
};

fetch(BASE_URL+"/validate?option=send&email="+email, requestOptions)
.then(response => response.text())
.then(result => {console.log(result)
    document.querySelector(".loading").style.display="none";
    if (result.status === 200) {
        timer()
        showMessage("ok",result,3000)
        sendFlag =true
      } else {
        showMessage("error",result,3000)
        sendFlag =true
      }

})
.catch(error => {console.log('error', error);sendFlag =true});
}

send();

const resend = document.querySelector(".resend");
resend.style.cursor="not-allowed"
var resendFlag = false;
timer();

resend.addEventListener("click",()=>{
    if(resendFlag) send();
    })

function timer(){
    resendFlag=false;
    var duration = 30;
    var timer = setInterval(function() {
      duration--;
      var progress = (30 - duration) / 30 * 134;
      document.querySelector('.progress').style.width = progress + 'px';
  
      if (duration <= 0) {
        clearInterval(timer);
        
        document.querySelector('.progress').style.display = 'none';
        resend.style.cursor="pointer"
        resendFlag=true;
      }
    }, 1000);
}


