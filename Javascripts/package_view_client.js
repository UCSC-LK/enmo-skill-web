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

var myHeaders = new Headers();                          ///important
myHeaders.append("Content-Type", "application/json");   ///important
myHeaders.append("Authorization", getCookie("JWT"));    ///important

var raw = JSON.stringify({});

const url = new URL(window.location.href);
const packageId = url.searchParams.get('packageId');
console.log(packageId);

var deseignerId;

document.addEventListener("DOMContentLoaded", loadData());

function loadData() {
    fetch(BASE_URL+`/packageview?packageId=${packageId}`,{
        method: 'GET',
        headers: myHeaders,
    })
    .then((response) =>{
        if (!response.ok) {
            throw new Error('An error occured!');
        }
        return response.json();
    })
    .then((resultset) =>{
        
        var package_data = resultset.packageModel;
        var designer_data = resultset.profileModel;
        var pricing_data = resultset.pricings;

        // console.log(pricing_data.pricing[0].noOfRevisions);

        deseignerId = designer_data.userid;

        document.getElementById("headding-title").innerHTML = package_data.title;

        var designer_pic = document.getElementById("designer-picture");
        designer_pic.src = "../Assests/user_coloured.png"; // this data has to be store in the db

        document.getElementById("designer-username1").innerHTML = designer_data.display_name;

        document.getElementById("no-reviews").innerHTML = 5; // this has to be fetched from the review table
        document.getElementById("review-count").innerHTML = '(' + 200 + ')'; // this has to be fetched from the review table
        document.getElementById("no-orders").innerHTML = 4 + ' Orderes in Queue'; // this has to be fetched from the order table

        var designer_pic = document.getElementById("cover-image");
        designer_pic.src = package_data.coverUrl; // this data has to be store in the db

        var pkg_decription = document.getElementById("description");
        var description = document.createElement('p');
        description.innerHTML = package_data.description;
        pkg_decription.appendChild(description);

        var cat = ""
        if (package_data.category == 1) {
            cat = "Logo Designing"
        } else if (package_data.category == 2) {
            cat = "Illustration"   
        } else if (package_data.category == 3) {
            cat = "Flyer design"   
        } else{
            cat = "Banner design"
        }

        document.getElementById("catogery").innerHTML = cat;

        var designer_pic_2 = document.getElementById("designer-img");
        designer_pic_2.src = "../Assests/user_coloured.png"; // this data has to be store in the db

        document.getElementById("designer-username2").innerHTML = designer_data.display_name;
        document.getElementById("reviews-designer").innerHTML = 4.5; // need to fetch from reviews table
        document.getElementById("review-count-designer").innerHTML = '(' + 471 +')'; // need to fetch from reviews table

        document.getElementById("member-since").innerHTML = "April 2021" // this data has to be stored in the designer or user or tables
        document.getElementById("last-deli").innerHTML = "3 hours ago" // fetch from the order table

        var lang = designer_data.language;
        document.getElementById("lang").innerHTML = lang.join(' ');

        document.getElementById('des-designer').innerHTML = designer_data.description;

        var client_img  = document.getElementById('client-img')
        client_img.src = "../Assests/user_coloured.png"

        document.getElementById("client-name").innerHTML = "Joe A."; // need to fetch from review table
        document.getElementById("client-country").innerHTML = "United States"; // need to fetch from client table

        // this too has to be fetched from review table
        document.getElementById("the-review").innerHTML = "Working with this seller for my project was a delight. They grasped my brand's essence and delivered a remarkable logo. The unlimited revisions, quick turnaround, and high-qualit files were exceptional. I couldn't be happier with the outcome. Highly recommend!";

        document.getElementById("reviewd-date").innerHTML = "3 months ago"

        var tbody = document.getElementById("table-body");

        // console.log(pricing_data.pricing[0].deliverables.pricePackageId);

        switch (package_data.category) {
            case 1:

                var data_rows = [
                    ["Price (Rs)"],
                    ["No of Revisions"],
                    ["Delivery Duration"],
                    ["No of Concepts"],
                    ["Logo Transparency"],
                    ["Vector File"],
                    ["Printable file"],
                    ["3D Mockup"],
                    ["Source file"],
                    ["Social media kit"],
                    [""]
                
                ]
                
                pricing_data.forEach(function(pricingItem){
                    data_rows[0].push(pricingItem.price)
                    data_rows[1].push(pricingItem.noOfRevisions)
                    data_rows[2].push((pricingItem.deliveryDuration==1)?"1 Day":pricingItem.deliveryDuration+" Days")
                    data_rows[3].push(pricingItem.noOfConcepts)
                    data_rows[4].push((pricingItem.deliverables.logoTransparency==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[5].push((pricingItem.deliverables.vectorFile==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[6].push((pricingItem.deliverables.printableFile==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[7].push((pricingItem.deliverables.mockup==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[8].push((pricingItem.deliverables.sourceFile==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[9].push((pricingItem.deliverables.socialMediaKit==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[10].push('<button class="button-save" onclick="payment()">Select</button>')
                })
                
                data_rows.forEach(function(row){
                    var tr = document.createElement('tr');
                    tbody.appendChild(tr);
                
                    if (row[0] == "Price (Rs)") {
                        var i = 0
                        row.forEach(function(cell){
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                            if (i > 0) {
                                td.className = "price"
                            }
                            i += 1
                
                        })
                    } else {
                        row.forEach(function(cell){
                        
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                
                        })
                     
                    }
                
                    
                
                })
                
                break;

            case 2:

                var data_rows = [
                    ["Price (Rs)"],
                    ["No of Revisions"],
                    ["Delivery Duration"],
                    ["No of Figures"],
                    ["Source File"],
                    ["High Resolution"],
                    ["Background/scene"],
                    ["Color"],
                    ["Full Body"],
                    ["Commercial Use"],
                    [""]
                
                ]
                
                pricing_data.forEach(function(pricingItem){
                    data_rows[0].push(pricingItem.price)
                    data_rows[1].push(pricingItem.noOfRevisions)
                    data_rows[2].push((pricingItem.deliveryDuration==1)?"1 Day":pricingItem.deliveryDuration+" Days")
                    data_rows[3].push(pricingItem.noOfConcepts)
                    data_rows[4].push((pricingItem.deliverables.sourceFile==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[5].push((pricingItem.deliverables.highResolution==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[6].push((pricingItem.deliverables.background_scene==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[7].push((pricingItem.deliverables.colour==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[8].push((pricingItem.deliverables.fullBody==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[9].push((pricingItem.deliverables.commercialUse==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[10].push('<button class="button-save" onclick="payment()">Select</button>')
                })
                
                data_rows.forEach(function(row){
                    var tr = document.createElement('tr');
                    tbody.appendChild(tr);
                
                    if (row[0] == "Price (Rs)") {
                        var i = 0
                        row.forEach(function(cell){
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                            if (i > 0) {
                                td.className = "price"
                            }
                            i += 1
                
                        })
                    } else {
                        row.forEach(function(cell){
                        
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                
                        })
                     
                    }
                
                    
                
                })
                break;

            case 3:

                var data_rows = [
                    ["Price (Rs)"],
                    ["No of Revisions"],
                    ["Delivery Duration"],
                    ["Printable File"],
                    ["Source File"],
                    ["Double-sided"],
                    ["Custom Graphics"],
                    ["Photo editing"],
                    ["Commercial Use"],
                    [""]
                
                ]
                
                pricing_data.forEach(function(pricingItem){
                    data_rows[0].push(pricingItem.price)
                    data_rows[1].push(pricingItem.noOfRevisions)
                    data_rows[2].push((pricingItem.deliveryDuration==1)?"1 Day":pricingItem.deliveryDuration+" Days")
                    data_rows[3].push((pricingItem.deliverables.printableFile==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[4].push((pricingItem.deliverables.sourceFile==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[5].push((pricingItem.deliverables.doubleSided==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[6].push((pricingItem.deliverables.customGraphics==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[7].push((pricingItem.deliverables.photoEditing==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[8].push((pricingItem.deliverables.commercialUse==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[9].push('<button class="button-save" onclick="payment()">Select</button>')
                })
                
                data_rows.forEach(function(row){
                    var tr = document.createElement('tr');
                    tbody.appendChild(tr);
                
                    if (row[0] == "Price (Rs)") {
                        var i = 0
                        row.forEach(function(cell){
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                            if (i > 0) {
                                td.className = "price"
                            }
                            i += 1
                
                        })
                    } else {
                        row.forEach(function(cell){
                        
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                
                        })
                     
                    }
                
                    
                
                })
                break;
        
            case 4:

                var data_rows = [
                    ["Price (Rs)"],
                    ["No of Revisions"],
                    ["Delivery Duration"],
                    ["Photo Editing"],
                    ["Source File"],
                    ["Custom Graphics"],
                    [""]
                
                ]
                
                pricing_data.forEach(function(pricingItem){
                    data_rows[0].push(pricingItem.price)
                    data_rows[1].push(pricingItem.noOfRevisions)
                    data_rows[2].push((pricingItem.deliveryDuration==1)?"1 Day":pricingItem.deliveryDuration+" Days")
                    data_rows[3].push((pricingItem.deliverables.photoEditing==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[4].push((pricingItem.deliverables.sourceFile==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[5].push((pricingItem.deliverables.customGraphics==1)?'<i class="fa fa-check" aria-hidden="true"></i>':'<i class="fa fa-check" style="color:#ebebeb;" aria-hidden="true"></i>')
                    data_rows[6].push('<button class="button-save" onclick="payment()">Select</button>')
                })
                
                data_rows.forEach(function(row){
                    var tr = document.createElement('tr');
                    tbody.appendChild(tr);
                
                    if (row[0] == "Price (Rs)") {
                        var i = 0
                        row.forEach(function(cell){
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                            if (i > 0) {
                                td.className = "price"
                            }
                            i += 1
                
                        })
                    } else {
                        row.forEach(function(cell){
                        
                            var td = document.createElement('td');
                            tr.appendChild(td);
                            td.innerHTML = cell;
                
                        })
                     
                    }
                
                    
                
                })
                break;
        }


        // FINALLYYYY REMOVING THE LOADER
        var loader = document.getElementById("loader-div");
        var block = document.getElementById("block");
        var sticky = document.getElementById("sticky");

        block.style.cssText = "";
        sticky.style.cssText = "";
        loader.style.display = "none";







    })
}

document.getElementById("contact-btn").addEventListener("click", function(e) {
    e.preventDefault();
    
    window.location.href="../HTML/messages.html?createchat=true&id="+deseignerId

})

