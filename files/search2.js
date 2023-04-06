// JavaScript koda za iskalnik
const itemsList = document.getElementById('seznam2');
const searchInput = document.getElementById('isci2');

fetch('https://api.github.com/users/hadley/orgs')
  .then(response => response.json())
  .then(data => {
    displayItems(data); // funkcija za prikaz elementov v seznamu
    searchInput.addEventListener('keyup', () => {
      const query = searchInput.value.toLowerCase();
      const filteredItems = data.filter(item => item.name.toLowerCase().includes(query));
      displayItems(filteredItems); // funkcija za prikaz filtriranih elementov v seznamu
    });
  })
  .catch(error => console.error(error));

function displayItems(items) {
  itemsList.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    itemsList.appendChild(li);
  });
}