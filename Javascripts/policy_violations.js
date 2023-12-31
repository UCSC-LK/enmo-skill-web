var overlay1 = document.getElementById("overlay1");
var overlay2 = document.getElementById("overlay2");

document.getElementById("warn").addEventListener("click", function(){
    overlay1.style.display = "block"
});

document.getElementById("overlay1_close").addEventListener("click", function(){
    overlay1.style.display = "none";
})

document.getElementById("bann").addEventListener("click", function(){
    overlay2.style.display = "block"
});

document.getElementById("overlay2_close").addEventListener("click", function(){
    overlay2.style.display = "none";
})

