// JavaScript koda za iskalnik
const itemsList = document.getElementById('blcklst');
const searchInput = document.getElementById('blck');

fetch('https://spaces.tk/output.json')
    .then(response => response.json())
    .then(data => {
        displayItems(data); // funkcija za prikaz elementov v seznamu
        searchInput.addEventListener('keyup', () => {
            const query = searchInput.value.toLowerCase();
            const filteredItems = data.filter(item => item.name.toLowerCase().includes(query));
            displayItems(filteredItems); // funkcija za prikaz filtriranih elementov v seznamu
        });
    })
alert(output.json)
    .catch(error => console.error(error));

function displayItems(items) {
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        itemsList.appendChild(li);
    });
}