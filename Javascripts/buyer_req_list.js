const responseData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
];

const listContainer = document.getElementById("list-container");
const listItemTemplate = document.querySelector(".hidden");


responseData.forEach(item => {
  
    const newItem = listItemTemplate.cloneNode(true);
    
    newItem.querySelector(".item-name").textContent = item.name;
    newItem.querySelector(".item-id").textContent = `(ID: ${item.id})`;
    
    // Set the cloned item to visible and append it to the list container
    newItem.classList.remove("hidden");
    listContainer.appendChild(newItem);
});
