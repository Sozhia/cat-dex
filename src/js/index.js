
const catBreedInfoURL = "https://api.thecatapi.com/v1/breeds"; 
let breedsJSON = [];
let breeds = [];
let selectedBreedName;
let selectedBreedID;

/**
 * The function `storeJSON` asynchronously fetches JSON data from a specified URL.
 * @returns The `storeJSON` function is returning a Promise that resolves to the
 * JSON data fetched from the `catBreedInfoURL`.
 */
async function storeJSON() {
  const request = new Request(catBreedInfoURL);
  const response = await fetch(request);

  return await response.json();
}

/**
 * The `onLoad` function asynchronously loads JSON data, maps it to extract
 * specific information(breedid, breedname and imgid),
 * populates a dropdown menu, adds an event listener for
 * dropdown changes, and logs the extracted data.
 */
async function onLoad() {
  breedsJSON = await storeJSON(); 

  breeds = breedsJSON.map(cat => [cat.id, cat.name, cat.reference_image_id]);

  populateDropdown();

  const dropdown = document.getElementById('cat-breeds');
  dropdown.addEventListener('change', handleSelection);

  console.log(breeds);
}

/**
 * The function `populateDropdown` populates dropdown menu with options based on
 * the `breeds` array.
 */
function populateDropdown() {
  const dropdown = document.getElementById('cat-breeds');
  
  breeds.forEach(([id, name]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name; 
    dropdown.appendChild(option);
  });
}


/**
 * The function `handleSelection` captures the selected breed ID and name from a
 * dropdown menu and logs the selected breed information.
 * @param event - The `event` parameter in the `handleSelection` function is an
 * object that represents the event that occurred, such as a user selecting an
 * option from a dropdown menu. It contains information about the event, including
 * the target element that triggered the event (in this case, a dropdown menu), the
 * type
 */
function handleSelection(event) {
  selectedBreedID = event.target.value; 
  selectedBreedName = event.target.options[event.target.selectedIndex].text; 

  console.log(`Selected Breed: ${selectedBreedName} (ID: ${selectedBreedID})`);
  findBreed(selectedBreedID);
}

onLoad();


/**
 * The function `findBreed` makes a fetch request to the Cat API to retrieve
 * information about a specific cat breed using the provided `breedID`.
 * @param breedID - The `breedID` parameter in the `findBreed` function is used to
 * specify the ID of the cat breed that you want to retrieve information about from
 * the Cat API. This ID is used to construct the URL for the API request to fetch
 * data about the specific cat breed.
 */
function findBreed(breedID){
  let urlAPI = `https://api.thecatapi.com/v1/breeds/${breedID}`;

  fetch(urlAPI)
  .then(Response => Response.json())
  .then(breedData => showBreed(breedData))
  .catch(error => showError(error));
}


/**
 * The function `showBreed` displays information about a specific dog breed,
 * including its name, image, and ratings for various characteristics.
 * @param breedData - The `showBreed` function takes in a `breedData` object as a
 * parameter. This object likely contains information about a specific dog breed,
 * such as its name, image URL, and various ratings related to adaptability,
 * child-friendliness, dog-friendliness, energy level,
 */
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

/**
 * The function getImageURL takes an imageID as input and returns a URL for a cat
 * image with that ID.
 * @param imageID - The `imageID` parameter is a unique identifier for a specific
 * image in the Cat API.
 * @returns a URL for a cat image based on the provided `imageID`.
 */
function getImageURL(imageID){
  console.log(imageID);
  return `https://cdn2.thecatapi.com/images/${imageID}.jpg`;
}

/**
 * The function showError logs an error message to the console.
 * @param error - The `error` parameter in the `showError` function is used to pass
 * an error message or object that needs to be displayed or logged.
 */
function showError(error){
  console.log(error);
}

/**
 * The function getRating returns a set of (filled/empty) stars.
 * @param {*} rating - Expected number out of 5
 * @returns a String of (filled/empty) stars.
 */
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


