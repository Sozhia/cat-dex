const catBreedSet = 0;

let catBreedInfoURL = "https://www.freetestapi.com/api/v1/cats"; 
let catTagsURL = "https://cataas.com/api/tags";
let catBreedImagesURL = "https://cataas.com/cat?";
let communityTags = [];
let breedCatsInfo = [];

// Fetching free cat'breeds info
// breedCatsInfo = fetch(catBreedInfoURL).then((response) => response.json());

// Fetching and populating cat breeds
fetch(catBreedInfoURL)
.then(response => response.json())
.then(breeds => populateBreeds(breeds))
.catch(error => console.error('Error fetching breeds:', error));

// Fetching all tags frequently used by the community
communityTags = fetch(catTagsURL).then((response) => response.json());

// Function to populate radio buttons for breeds as filter
function populateBreeds(breeds) {
  const container = document.getElementById('breed-container');

  breeds.forEach(breed => {
      // Create radio button
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.id = `breed-${breed.id}`;
      radio.name = 'cat-breed';
      radio.value = breed.name;

      // Create label for radio button
      const label = document.createElement('label');
      label.htmlFor = radio.id;
      label.textContent = breed.name;
      label.classList.add('breed-label');

      // Append radio button and label to container
      container.appendChild(radio);
      container.appendChild(label);
  });
}

