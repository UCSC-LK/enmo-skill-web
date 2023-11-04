const form = document.getElementById("package_form");

// handle both insertions and updates
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form field values
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    // const cover_img = document.getElementById("img").value;

    // Determine operation type based on the URL
    const url = new URL(window.location.href);
    const packageId = url.searchParams.get('packageId');
    const operationType = packageId ? "update" : "insert";

    // Create a JavaScript object for the data
    const packageData = {
        title: title,
        description: description,
        category: category,
        coverUrl: "../Assests/package_cover4.jpg",
        clicks: 0,
        orders: 0,
        cancellations: "0%",
        status: "pending"
    };

    console.log(packageData);

    // Determine the URL for the request based on the operation type
    const requestUrl = operationType === "update"
        ? `http://localhost:15000/enmo_skill_backend_war/package?packageId=${packageId}`
        : "http://localhost:15000/enmo_skill_backend_war/package";

    // fecth data
    try {
        const response = await fetch(requestUrl, {
            method: operationType === "update" ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(packageData),
        });

        if (response.ok) {
            console.log(`Package data ${operationType}d successfully.`);
        } else {
            alert("Error occured")
            console.error(`Failed to ${operationType} package data.`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }

    window.location.href = "../HTML/packages.html"
});

// Additional code for loading data for update
document.addEventListener("DOMContentLoaded", loadData);

function loadData(){
    // extract query parameters
    const url = new URL(window.location.href);
    const packageId = url.searchParams.get('packageId');
    const title_value = url.searchParams.get('title');
    const category_value = url.searchParams.get('category');
    const description_value = url.searchParams.get('description');

    document.getElementById("title").value = title_value;
    document.getElementById("category").value = category_value;
    document.getElementById("description").value = description_value;
}
