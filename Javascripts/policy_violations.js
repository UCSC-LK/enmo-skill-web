var overlay1 = document.getElementById("overlay1");
var overlay2 = document.getElementById("overlay2");

document.getElementById("warn").addEventListener("click", function(){
    overlay1.style.display = "block"
});

document.getElementById("overlay1_close").addEventListener("click", function(){
    overlay1.style.display = "none";
})

document.getElementById("bann").addEventListener("click", function(){
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to Bann this user, userId: " + "userId",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bann user!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "User was banned",
            // text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
});

// document.getElementById("overlay2_close").addEventListener("click", function(){
//     overlay2.style.display = "none";
// })

