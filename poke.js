let pokemonArray = [];
let currentIndex = 0;
const colors = {
  fire: "linear-gradient(135deg, rgba(131, 2, 2) 0%, rgba(170, 52, 80) 40%, rgba(131, 2, 2) 100%)",
  water:
    "linear-gradient(135deg, rgba(25, 60, 135) 0%, rgba(42, 125, 214) 40%, rgba(25, 60, 135) 100%)",
  grass:
    "linear-gradient(135deg, rgba(52, 135, 25)0%, rgba(42, 214, 134) 40%, rgba(52, 135, 25) 100%)",
  flying:
    "linear-gradient(135deg, rgba(58, 148, 181) 0%, rgba(151, 224, 237) 40%, rgba(58, 148, 181) 100%)",
  poison:
    "linear-gradient(135deg, rgba(69, 35, 162)  0%, rgba(172, 78, 184) 40%, rgba(69, 35, 162) 100%)",
  ground:
    "linear-gradient(135deg, rgba(87, 57, 17) 0%, rgba(184, 168, 78) 40%, rgba(87, 57, 17) 100%)",
  bug: "linear-gradient(135deg, rgba(66, 153, 32) 0%, rgba(173, 238, 127) 40%, rgba(66, 153, 32) 100%)",
  dark: "linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(8, 29, 56) 40%, rgb(0, 0, 0) 100%)",
  normal:
    "linear-gradient(135deg, rgb(113, 132, 138) 0%, rgb(125, 169, 160) 40%, rgb(134, 157, 169) 100%)",
  fairy:
    "linear-gradient(135deg, rgb(204, 77, 211) 0%, rgb(223, 159, 255) 40%, rgb(170, 76, 208) 100%)",
  rock: "linear-gradient(135deg, rgb(51, 46, 42) 0%, rgb(120, 119, 155) 40%, rgb(73, 62, 57) 100%)",
  psychic:
    "linear-gradient(135deg, rgba(17, 4, 39) 0%, rgba(10, 12, 109) 40%, rgba(27, 3, 39) 100%)",
  steel:
    "linear-gradient(135deg, rgba(65, 84, 99) 0%, rgb(127, 146, 172) 40%, rgba(67, 82, 99) 100%)",
  fighting:
    "linear-gradient(135deg, rgba(61, 19, 19) 0%, rgb(104, 131, 169) 40%, rgba(61, 19, 19) 100%)",
  electric:
    "linear-gradient(135deg, rgb(162, 170, 53) 0%, rgba(238, 255, 1) 40%, rgb(162, 170, 53)  100%)",
  dragon:
    "linear-gradient(135deg, rgba(2, 7, 131) 0%, rgba(170, 52, 80) 40%, rgba(2, 7, 131) 100%)",
  ice: "linear-gradient(135deg, rgb(0, 13, 14) 0%, rgb(61, 185, 252) 40%, rgb(0, 13, 14) 100%)",
  ghost:
    "linear-gradient(135deg, rgba(0, 2, 17) 0%, rgba(20, 79, 42, 0.166) 40%, rgba(0, 2, 17) 100%)",
};

const fillPokemonArray = (howMany) => {
  let promises = [];

  for (let i = 1; i < howMany; i++) {
    let index = i;
    let promise = fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then((response) => response.json())
      .then((data) => {
        let types = data.types.map((type) => type.type.name);
        let pokemon = {
          name: data.name,
          type: types.join(" | "),
          image: data.sprites["front_default"],
          hp: data.stats[0].base_stat,
          id: data.id,
          height: data.height,
          weight: data.weight,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        };
        return pokemon;
      })
      .catch((error) => {
        console.error(error);
      });
    promises.push(promise);
  }

  Promise.all(promises).then((results) => {
    pokemonArray = results;
    displayPokemon();
  });
};

const displayPokemon = () => {
  //Front of card
  const pokemonName = document.getElementById("pokemonName");
  const pokemonImage = document.getElementById("pokemonImage");
  const pokemonType = document.getElementById("pokemonType");
  const pokemonhp = document.getElementById("pokemonhp");
  const pokemonId = document.getElementById("pokemonId");

  pokemonName.innerHTML = pokemonArray[currentIndex].name;
  pokemonImage.setAttribute("src", pokemonArray[currentIndex].image);
  pokemonType.innerHTML = pokemonArray[currentIndex].type;
  pokemonhp.innerHTML = pokemonArray[currentIndex].hp;
  pokemonId.innerHTML = "#" + pokemonArray[currentIndex].id;

  //Back of card
  const pokemonImageBack = document.getElementById("pokemonImageBack");
  const pokemonHeight = document.getElementById("pokemonHeight");
  const pokemonWeight = document.getElementById("pokemonWeight");
  const pokemonAttack = document.getElementById("pokemonAttack");
  const pokemonDefense = document.getElementById("pokemonDefense");

  pokemonImageBack.setAttribute("src", pokemonArray[currentIndex].image);
  pokemonAttack.innerHTML = "Attack: " + pokemonArray[currentIndex].attack;
  pokemonDefense.innerHTML = "Defense: " + pokemonArray[currentIndex].defense;
  pokemonHeight.innerHTML = "Height: " + pokemonArray[currentIndex].height;
  pokemonWeight.innerHTML = "Weight: " + pokemonArray[currentIndex].weight;

  switchCardColor();
};

const switchCardColor = () => {
  let frontOfCard = document.getElementById("frontOfCard");
  let backOfCard = document.getElementById("backOfCard");
  let pokemonType = pokemonArray[currentIndex].type.split(" |");

  frontOfCard.style.background = colors[pokemonType[0]];
};

const searchPokemon = () => {
  document
    .getElementById("inputSearch")
    .addEventListener("keyup", function (event) {
      let arrayNames = pokemonArray.map((pokemon) => pokemon.name);
      let input = event.target.value.toLowerCase();
      let filteredNames = [];

      if (input.length) {
        filteredNames = arrayNames.filter((pokemon) => {
          return pokemon.toLowerCase().includes(input);
        });
      }
      displayResult(filteredNames);
      suggestionsClicked(filteredNames);
      changeSuggestionColor(filteredNames);
    });
};

function displayResult(filteredNames) {
  let suggestions = document.getElementById("suggestions");

  if (filteredNames.length > 2) {
    suggestions.innerHTML = `<li id="firstSuggestion">${filteredNames[0]}</li><li id="secondSuggestion">${filteredNames[1]}</li><li id="thirdSuggestion">${filteredNames[2]}</li>`;
  } else if (filteredNames.length == 2) {
    suggestions.innerHTML = `<li id="firstSuggestion">${filteredNames[0]}</li><li id="secondSuggestion">${filteredNames[1]}</li>`;
  } else if (filteredNames.length == 1) {
    suggestions.innerHTML = `<li id="firstSuggestion"">${filteredNames[0]}</li>`;
  } else {
    suggestions.innerHTML = "";
  }
}

let firstSuggestion;
let secondSuggestion;
let thirdSuggestion;

const suggestionsClicked = (filteredNames) => {
  firstSuggestion = document.getElementById("firstSuggestion");
  secondSuggestion = document.getElementById("secondSuggestion");
  thirdSuggestion = document.getElementById("thirdSuggestion");

  if (filteredNames.length > 0) {
    firstSuggestion.addEventListener("click", function () {
      const pokemonClicked = pokemonArray.find(
        (pokemon) => pokemon.name === filteredNames[0]
      );
      currentIndex = pokemonClicked.id - 1;
      displayPokemon();
      document.getElementById("inputSearch").value = "";
      displayResult([]);
    });
  }
  if (filteredNames.length > 1) {
    secondSuggestion.addEventListener("click", function () {
      const pokemonClicked = pokemonArray.find(
        (pokemon) => pokemon.name === filteredNames[1]
      );
      currentIndex = pokemonClicked.id - 1;
      displayPokemon();
      document.getElementById("inputSearch").value = "";
      displayResult([]);
    });
  }
  if (filteredNames.length > 2) {
    thirdSuggestion.addEventListener("click", function () {
      const pokemonClicked = pokemonArray.find(
        (pokemon) => pokemon.name === filteredNames[2]
      );
      currentIndex = pokemonClicked.id - 1;
      displayPokemon();
      document.getElementById("inputSearch").value = "";
      displayResult([]);
    });
  }
};

const changeSuggestionColor = (filteredNames) => {
  if (filteredNames.length > 0) {
    let pokemon = pokemonArray.find(
      (pokemon) => pokemon.name === filteredNames[0]
    );
    let pokemonTypes = pokemon.type.split(" |");
    let color = colors[pokemonTypes[0]];
    firstSuggestion.style.background = color;
  }

  if (filteredNames.length > 1) {
    let pokemon = pokemonArray.find(
      (pokemon) => pokemon.name === filteredNames[1]
    );
    let pokemonTypes = pokemon.type.split(" |");
    let color = colors[pokemonTypes[0]];
    secondSuggestion.style.background = color;
  }

  if (filteredNames.length > 2) {
    let pokemon = pokemonArray.find(
      (pokemon) => pokemon.name === filteredNames[2]
    );
    let pokemonTypes = pokemon.type.split(" |");
    let color = colors[pokemonTypes[0]];
    thirdSuggestion.style.background = color;
  }
};

const flipCard = () => {
  let cardContainer = document.getElementById("cardContainer");
  let card = document.getElementById("card");
  let flipped = false;

  cardContainer.addEventListener("click", function (event) {
    if (!flipped) {
      card.style.transform = "rotatey(180deg)";
      flipped = true;
    } else {
      card.style.transform = "rotatey(360deg)";
      flipped = false;
    }
  });
};

const switchPokemon = () => {
  const nextButton = document.getElementById("nextButton");
  const previousButton = document.getElementById("previousButton");

  nextButton.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex >= pokemonArray.length) {
      currentIndex = 0;
    }

    displayPokemon();
  });

  previousButton.addEventListener("click", function () {
    currentIndex--;
    if (currentIndex <= -1) {
      currentIndex = pokemonArray.length - 1;
    }
    displayPokemon();
  });
};

function main() {
  fillPokemonArray(300);
  switchPokemon();
  searchPokemon();
  flipCard();
}

main();
