
const box =document.querySelector(".box-error")
const erroricon =document.querySelector(".erroricon")
const successicon =document.querySelector(".successicon")
const titleerror =document.querySelector(".title-error")
const titlesucess =document.querySelector(".title-sucess")
const masssages =document.querySelector(".masssage")
const clbtn = document.querySelector(".closebtn")



  function showMessage(type,massage,time)
  {
    if(type=="ok"){
        successicon.style.display="flex"
        titlesucess.style.display="flex"
        box.style.border="none"
        box.style.backgroundColor = "#04AA6D";
        masssages.style.color="#fdfdfd"
        masssages.textContent=massage
    }else if(type="error"){
        erroricon.style.display="flex"
        titleerror.style.display="flex"
        box.style.border="none"
        box.style.backgroundColor = "#f44336";
        masssages.style.color="#fdfdfd"
        masssages.textContent=massage
    }
    box.style.display="flex"
    setTimeout(() => {
        box.style.display="none"
        successicon.style.display="none"
        titlesucess.style.display="none"
        erroricon.style.display="none"
        titleerror.style.display="none"
        masssages.textContent=""
      }, time);
    
  }
  clbtn.addEventListener("click",()=>{
    box.style.display="none"
        successicon.style.display="none"
        titlesucess.style.display="none"
        erroricon.style.display="none"
        titleerror.style.display="none"
        masssages.textContent=""
  })

