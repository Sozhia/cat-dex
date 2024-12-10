const catBreedInfoURL = "https://api.thecatapi.com/v1/breeds"; 
let breedsJSON = [];
let breeds = [];
let selectedBreedName;
let selectedBreedID;

async function storeJSON() {
  const request = new Request(catBreedInfoURL);
  const response = await fetch(request);

  return await response.json(); // Devuelve el JSON de la API
}

async function onLoad() {
  // Espera a que los datos se descarguen antes de usarlos
  breedsJSON = await storeJSON(); 

  // Obtiene los nombres, id y imgid
  breeds = breedsJSON.map(cat => [cat.id, cat.name, cat.reference_image_id]);

  populateDropdown();

  // Escuchar cambios en el dropdown
  const dropdown = document.getElementById('cat-breeds');
  dropdown.addEventListener('change', handleSelection);

  console.log(breeds);
}

// Función para popular el menú desplegable
function populateDropdown() {
  const dropdown = document.getElementById('cat-breeds');
  
  // Añade opciones al menú desplegable
  breeds.forEach(([id, name]) => {
    const option = document.createElement('option');
    option.value = id; // Usamos el 'id' como valor
    option.textContent = name; // Mostramos el nombre de la raza
    dropdown.appendChild(option);
  });
}

// Función para manejar la selección del dropdown
function handleSelection(event) {
  selectedBreedID = event.target.value; // Obtiene el 'value' de la opción seleccionada
  selectedBreedName = event.target.options[event.target.selectedIndex].text; // Obtiene el texto visible

  console.log(`Selected Breed: ${selectedBreedName} (ID: ${selectedBreedID})`);
  findBreed(selectedBreedID);
}

// Llama a onLoad cuando cargue la página
onLoad();

//Find cat's breed info
function findBreed(breedID){
  let urlAPI = `https://api.thecatapi.com/v1/breeds/${breedID}`;

  fetch(urlAPI)
  .then(Response => Response.json())
  .then(breedData => showBreed(breedData))
  .catch(error => showError(error));
}

// Show breed info
function showBreed(breedData){
  let infoDivID = `breedInfo`;
  let infoDiv = document.getElementById(infoDivID);

  infoDiv.innerHTML = `
  <h2>${breedData.name.toUpperCase()}</h2>
  <img class = "breedImg" src="${getImageURL(breedData.reference_image_id)}" alt="${selectedBreedName}">
  <p>Affection:${getRating(breedData.adaptability)}</p>
  <p>Child friendly:${getRating(breedData.child_friendly)}</p>
  <p>Dog friendly:${getRating(breedData.dog_friendly)}</p>
  <p>Energy:${getRating(breedData.energy_level)}</p>
  <p>Social needs:${getRating(breedData.social_needs)}</p>
  `;
}

function getImageURL(imageID){
  console.log(imageID);
  return `https://cdn2.thecatapi.com/images/${imageID}.jpg`;
}

function showError(error){
  console.log(error);
}

function getRating(rating) {
  let result = "";

  switch (rating) {
    case 5:
      result = "★★★★★";
      break;
    case 4:
      result = "★★★★☆";
      break;
    case 3:
      result = "★★★☆☆";
      break;
    case 2:
      result = "★★☆☆☆";
      break;
    case 1:
      result = "★☆☆☆☆";
      break;
    case 0:
      result = "☆☆☆☆☆"; 
      break;
    default:
      result = "Invalid rating"; 
  }

  return result;
} 


