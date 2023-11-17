document.getElementById("order").addEventListener("click", function(){
    document.getElementById("overlay").style.display = "block";
})

document.getElementById("overlay").addEventListener("click", function(){
    document.getElementById("overlay").style.display = "none";
})

var unh = document.getElementById("unhandled")
var acc = document.getElementById("accepted")
var rej = document.getElementById("rejected")

document.addEventListener("DOMContentLoaded", function(){
    unh.className = "active"
})

unh.addEventListener("click", function(){
    unh.className = "active"
    acc.classList.remove("active")
    rej.classList.remove("active")
})
acc.addEventListener("click", function(){
    acc.className = "active";
    unh.classList.remove("active");
    rej.classList.remove("active");
})
rej.addEventListener("click", function(){
    rej.className = "active";
    unh.classList.remove("active");
    acc.classList.remove("active");
})

