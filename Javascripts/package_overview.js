
        const form = document.getElementById("package_form");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
        
            // Get form field values
            const title = document.getElementById("title").value;
            const category = document.getElementById("category").value;
            const description = document.getElementById("description").value;
            const cover_img = document.getElementById("img").value;
        
            // Create a JavaScript object
            const packageData = {
                title: title,
                description: description,
                category: category,
                coverUrl: "../Assests/package_cover4.jpg",
                clicks: 0,
                orders: 0,
                cancellations: "0%",
                status: "active"
            };

            console.log(packageData);
        
            // Send the data in a POST request
            const url = "http://localhost:15000/enmo_skill_backend_war/package";
            
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(packageData),
                });
        
                if (response.ok) {
                    console.log("Package data sent successfully.");
                } else {
                    console.error("Failed to send package data.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }

            window.location = "http://127.0.0.1:5500/HTML/view_active_packages.html"
            
        });
        