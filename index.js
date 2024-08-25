/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let game of games) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');
        
        // add the class game-card to the list
        gameCard.classList.add('game-card');
        
        // set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="Game Image">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;
        
        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// calculate the total amount of money pledged across all games
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using a template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab the number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// display the total number of games
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
*/


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    // Log the result to see how many games are unfunded
    console.log(unfundedGames.length); // Output: 6
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    // Log the result to see how many games are funded
    console.log(fundedGames.length); // Output: 5
    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const companyDescription = `
    A total of ${totalContributions.toLocaleString()} people have backed 
    ${GAMES_JSON.length} games. Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? "game remains" : "games remain"} unfunded. 
    We need your help to fund these amazing games!
`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement('p');
descriptionElement.innerHTML = companyDescription;
descriptionContainer.appendChild(descriptionElement);


/************************************************************************************
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Step 1: Sort the games by the pledged amount in descending order to identify the top games
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Use destructuring to grab the top two games
const [topGame, runnerUp] = sortedGames;

// Step 2: Display the top game and the runner-up
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('h2');
topGameElement.innerHTML = topGame.name;
firstGameContainer.appendChild(topGameElement);

// Do the same for the runner-up item
const runnerUpElement = document.createElement('h2');
runnerUpElement.innerHTML = runnerUp.name;
secondGameContainer.appendChild(runnerUpElement);

