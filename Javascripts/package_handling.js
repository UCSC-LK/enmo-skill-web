const create_new = document.getElementById("create-package");

create_new.addEventListener("click", openPackageOverview);

function openPackageOverview() {
    window.parent.location = "../HTML/package_overview.html";
}

const pending = document.getElementById("pending");

pending.addEventListener("click", loadPendingPackages);

function loadPendingPackages(){
    window.parent.location = "../HTML/view_pending_packages.html";
}

const paused = document.getElementById("paused");

paused.addEventListener("click", loadPausedPackages);

function loadPausedPackages(){
    window.parent.location = "../HTML/view_paused_packages.html";
}

const active = document.getElementById("active");

active.addEventListener("click", loadActivePackages);

function loadActivePackages(){
    window.parent.location = "../HTML/view_active_packages.html";
}

const update_package = document.getElementById("update-package");

// update_package.addEventListener("click", updatePackage);

// function updatePackage(){

// }

