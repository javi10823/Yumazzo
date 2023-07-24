document.addEventListener("DOMContentLoaded", function () {
  const searchboxContent = document.querySelector(".searchbox-content");
  const resultsPopup = document.querySelector(".results-popup");

  const bloqueUno = document.querySelector(".bloque-uno");
  const bloqueDos = document.querySelector(".bloque-dos");
  const botonAddRecipe = document.querySelector(".add-recipe");
  const backButton = document.getElementById("backButton");

  bloqueUno.style.display = "block";
  bloqueDos.style.display = "none";

  botonAddRecipe.addEventListener("click", function () {
    bloqueUno.style.display = "none";
    bloqueDos.style.display = "block";
  });

  backButton.addEventListener("click", function () {
    bloqueUno.style.display = "block";
    bloqueDos.style.display = "none";
  });

  if (searchboxContent) {
    console.log("El elemento se encuentra en el DOM.");

    searchboxContent.addEventListener("input", function () {
      const searchTerm = searchboxContent.textContent.trim().toLowerCase();
      console.log("Contenido del elemento:", searchTerm);

      if (searchTerm === "") {
        hideResultsPopup();
        resultsPopup.innerHTML = "";
      } else {
        fetchAllRecipes()
          .then((data) => {
            const filteredRecipes = data.message.filter((recipe) =>
              recipe.name.toLowerCase().includes(searchTerm)
            ).slice(0,3);
            console.log(filteredRecipes)

            displaySearchResults(filteredRecipes);
          })
          .catch((error) => {
            console.error("Error al obtener recetas:", error);
          });
      }
    });
  } else {
    console.log("El elemento NO se encuentra en el DOM.");
  }

  function fetchAllRecipes() {
    return fetch(
      "https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/recipes"
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  }

  function displaySearchResults(results) {
    resultsPopup.innerHTML = "";
  
    if (results.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "No se encontraron recetas.";
      resultsPopup.appendChild(noResultsMessage);
    } else {
      results.forEach((recipe) => {
        const recipeItem = document.createElement("div");
        recipeItem.classList.add("results-item");
  
        const nameContainer = document.createElement("div");
        nameContainer.classList.add("nation-wrapper");
  
        const countryFlag = document.createElement("img");
        countryFlag.src = "assets/spain.png";
  
        const recipeName = document.createElement("div");
        recipeName.textContent = recipe.name;
  
        nameContainer.appendChild(countryFlag);
        nameContainer.appendChild(recipeName);
  
        recipeItem.appendChild(nameContainer);
  
        const rightColumn = document.createElement("div");
        rightColumn.classList.add("results-right-column");
        rightColumn.style.display = "flex"; 
  
        const recipeDifficultyIcon = document.createElement("img");
        recipeDifficultyIcon.src = getDifficultyIcon(recipe.difficulty);
        rightColumn.appendChild(recipeDifficultyIcon);
  
        const recipeDifficulty = document.createElement("p");
        const difficultyLevel = getDifficultyLevel(recipe.difficulty);
        recipeDifficulty.textContent = difficultyLevel + getDurationByDifficulty(recipe.difficulty);
        rightColumn.appendChild(recipeDifficulty);
  
        recipeItem.appendChild(rightColumn);
  
        recipeItem.addEventListener("click", function () {
          updateBlockOneWithRecipeData(recipe);
          hideResultsPopup();
        });
  
        resultsPopup.appendChild(recipeItem);
      });
    }
  
    resultsPopup.style.display = "block";
  }
  
  function getDifficultyIcon(difficultyValue) {
    switch (difficultyValue) {
      case 1:
        return "./assets/verde.svg";
      case 2:
        return "./assets/naranja.svg";
      case 3:
        return "./assets/rojo.svg";
      default:
        return "./assets/rojo.svg";
    }
  }
  
  function getDifficultyLevel(difficultyValue) {
    switch (difficultyValue) {
      case 1:
        return "Easy ";
      case 2:
        return "Medium ";
      case 3:
        return "Hard ";
      default:
        return "Unknown easy";
    }
  }
  
  function getDurationByDifficulty(difficultyValue) {
    switch (difficultyValue) {
      case 1:
        return "| 50 min";
      case 2:
        return "| 30 min";
      case 3:
        return "| 35 min";
      default:
        return "| 30 min";
    }
  }
  
  function hideResultsPopup() {
    resultsPopup.style.display = "none";
  }
  
  function hideResultsPopup() {
    resultsPopup.style.display = "none";
  }

  document.addEventListener("click", function (event) {
    const isClickInsidePopup = resultsPopup.contains(event.target);
    if (!isClickInsidePopup) {
      hideResultsPopup();
    }
  });

  document.querySelector('.inside-searchbox').addEventListener('blur', function(e) {
    if (e.target.textContent === '') {
        e.target.classList.add('empty-searchbox');
    }
  });

  document.querySelector('.inside-searchbox').addEventListener('focus', function(e) {
    if (e.target.textContent === '') {
        e.target.classList.remove('empty-searchbox');
    }
  });

  document.getElementById("addButton").addEventListener("click", function (event) {
    event.preventDefault(); // Evitar envío del formulario por defecto
  
    const name = document.getElementById("recipe-name").value;
    const origin = document.getElementById("recipe-category").value;
    const description = document.getElementById("description").value;
    const difficulty = parseInt(document.getElementById("recipe-difficulty").value);
    const protein = document.getElementById("recipe-protein").value;
    const produce = document.getElementById("recipe-produce").value;
    const spice = document.getElementById("recipe-Spice").value;
    const cookingOil = document.getElementById("recipe-oil").value;
    const volume = parseInt(document.getElementById("recipe-volume").value);
    const serves = parseInt(document.getElementById("recipe-serve").value);
    const authenticity = document.getElementById("recipe-verification").value;
    const stock = "string"; 
    const recipeData = {
      name,
      origin,
      description,
      difficulty,
      protein,
      produce,
      spice,
      cookingOil,
      volume,
      serves,
      authenticity,
      stock,
    };
  
  
    fetch("https://master-7rqtwti-yj2le3kr2yhmu.uk-1.platformsh.site/yumazoo/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error en la respuesta del servidor:", response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error al enviar receta:", error);
      });
  });

  function updateBlockOneWithRecipeData(recipeData) {
    const recipeTitle = document.querySelector(".recipe-title");
    recipeTitle.textContent = recipeData.name;
  
    const recipeContent = document.querySelector(".recipe-content");
    recipeContent.textContent = recipeData.description;
  
    const recipeDifficulty = document.querySelector(".recipe-difficulty");
    const difficultyLevel = getDifficultyLevel(recipeData.difficulty);
    recipeDifficulty.textContent = `Difficulty: ${difficultyLevel}`;
  
    // Campos de Ingredientes
    const ingredientsContainer = document.querySelectorAll(".ingredients-container");
  
    const proteinType = ingredientsContainer[0].querySelector(".type");
    const proteinName = ingredientsContainer[0].querySelector(".name");
    proteinType.textContent = "Protein";
    proteinName.textContent = recipeData.protein;
  
    const spiceType = ingredientsContainer[0].querySelectorAll(".type")[1];
    const spiceName = ingredientsContainer[0].querySelectorAll(".name")[1];
    spiceType.textContent = "Spices";
    spiceName.textContent = recipeData.spice;
  
    const volumeType = ingredientsContainer[0].querySelectorAll(".type")[2];
    const volumeName = ingredientsContainer[0].querySelectorAll(".name")[2];
    volumeType.textContent = "Volume/Weight";
    volumeName.textContent = recipeData.volume;
  
    const authenticityType = ingredientsContainer[0].querySelectorAll(".type")[3];
    const authenticityName = ingredientsContainer[0].querySelectorAll(".name")[3];
    authenticityType.textContent = "Authenticity";
    authenticityName.textContent = recipeData.authenticity;
  
    // Campos adicionales (Stock y Cooking Oil)
    const stockType = ingredientsContainer[1].querySelector(".type");
    const stockName = ingredientsContainer[1].querySelector(".name");
    stockType.textContent = "Spice level";
    stockName.textContent = recipeData.spice;
  
    const cookingOilType = ingredientsContainer[1].querySelectorAll(".type")[1];
    const cookingOilName = ingredientsContainer[1].querySelectorAll(".name")[1];
    cookingOilType.textContent = "Cooking Oil";
    cookingOilName.textContent = recipeData.cookingOil;
  }
  
  
  function getDifficultyLevel(difficultyValue) {
    switch (difficultyValue) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return "Unknown";
    }
  }  
});
