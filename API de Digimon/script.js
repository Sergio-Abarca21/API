document.addEventListener('DOMContentLoaded', () => {
  const digimonList = document.querySelector('#digimon-list');
  const searchName = document.querySelector('#search-name');
  const searchLevel = document.querySelector('#search-level');
  const fetchAllButton = document.querySelector('#fetch-all');

  const apiUrl = 'https://digimon-api.vercel.app/api/digimon';

  const displayDigimons = (digimons) => {
    digimonList.innerHTML = '';

    digimons.forEach(digimon => {
      const digimonCard = document.createElement('div');
      digimonCard.classList.add('digimon-card');
      digimonCard.innerHTML = `
        <img src="${digimon.img}" alt="${digimon.name}">
        <h3>${digimon.name}</h3>
        <p>Nivel: ${digimon.level}</p>
      `;
      digimonList.appendChild(digimonCard);
    });
  };

  const fetchAllDigimons = () => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayDigimons(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const filterDigimons = () => {
    const name = searchName.value.toLowerCase();
    const level = searchLevel.value;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

        const filteredDigimons = data.filter(digimon => {
          const matchesName = digimon.name.toLowerCase().includes(name);
          const matchesLevel = level ? digimon.level === level : true;
          return matchesName && matchesLevel;
        });
        displayDigimons(filteredDigimons);
      })
      .catch(error => console.error('Error fetching data:', error));
  };


  searchName.addEventListener('input', filterDigimons);
  searchLevel.addEventListener('change', filterDigimons);
  fetchAllButton.addEventListener('click', fetchAllDigimons);

  fetchAllDigimons();
});
