document.addEventListener("DOMContentLoaded", function () {
    // URL for fetching character data
    const baseUrl = "https://phase-1-project-lac-nine.vercel.app/characters";
    
    // HTML references elements
    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");

    // Variable to keep track of the currently selected character
    let currentCharacter = null;

    // Function to fetch characters from the server
    function fetchCharacters() {
        fetch(baseUrl) 
            .then(function (response) {
                return response.json(); 
            })
            .then(function (characters) {
                for (let i = 0; i < characters.length; i++) {
                    const character = characters[i];
                    const span = document.createElement("span");
                    span.textContent = character.name; 
                    span.onclick = function () {
                        displayCharacter(character); 
                    };
                    characterBar.appendChild(span); 
                }

                if (characters.length > 0) {
                    displayCharacter(characters[0]);
                }
            });
    }

    // Display the selected character's details
    function displayCharacter(character) {
        currentCharacter = character; 
        characterName.textContent = character.name; 
        characterImage.src = character.image; 
        characterImage.alt = character.name; 
        characterVotes.textContent = character.votes; 
    }

    // Event listener for the votes form submission
    votesForm.onsubmit = function (event) {
        event.preventDefault();
        if (currentCharacter) {
            let newVotes = parseInt(votesInput.value) || 0; 
            let currentVotes = parseInt(characterVotes.textContent) || 0; 
            currentCharacter.votes = currentVotes + newVotes;
            characterVotes.textContent = currentCharacter.votes; 
            votesInput.value = "";
        }
    };

    // Event listener for the reset button
    resetButton.onclick = function () {
        if (currentCharacter) {
            currentCharacter.votes = 0; 
            characterVotes.textContent = 0; 
        }
    };

    // Fetch characters when the page loads
    fetchCharacters();
});