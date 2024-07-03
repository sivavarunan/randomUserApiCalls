document.getElementById('fetchUserBtn').addEventListener('click', fetchUsers);

async function fetchUsers() {
    console.log("button clicked")
  const url = 'https://randomuser.me/api/?results=5';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayProfiles(data.results);
    updateTable(data.results);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function displayProfiles(users) {
  const profilesContainer = document.getElementById('profilesContainer');
  profilesContainer.innerHTML = ''; 
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <img src="${user.picture.medium}" alt="User Picture">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>${user.email}</p>
    `;
    profilesContainer.appendChild(card);
  });
}

function updateTable(users) {
  const tableBody = document.querySelector('#profilesTable tbody');
  tableBody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${user.picture.thumbnail}" alt="User Picture"></td>
      <td>${user.name.first} ${user.name.last}</td>
      <td>${user.email}</td>
    `;
    tableBody.appendChild(row);
  });
}
