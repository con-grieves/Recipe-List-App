const recipeCardTemplate = document.querySelector(
  "[data-recipe-card-template]"
);
const recipeCardConatiner = document.querySelector(
  "[data-recipe-card-container]"
);
const searchBarInput = document.querySelector("[data-search-bar]");

let searchRecipes = [];

//---search function to filter through recipe cards based on title or tags---
searchBarInput.addEventListener("input", (e) => {
  const value = e.target.value
  searchRecipes.forEach((recipe) => {
    const isVisible = recipe.tag.includes(value) || recipe.title.includes(value);
    recipe.element.classList.toggle("hide", !isVisible);
  });
});

//---fetch API request from recipes-list.json---
fetch("https://con-grieves.github.io/data/recipes-list.json")
  .then((res) => res.json())
  .then((data) => {
    searchRecipes = data.map((recipe) => {
      //---element selectors for the HTML template recipe card. content.cloneNode(true) will grab the content of the template div and return a 'document fragment'. from this .children[0] will grab the first 'child' fragment meaning it can be cloned for each card---
      const recipeCard = recipeCardTemplate.content.cloneNode(true).children[0];
      const title = recipeCard.querySelector("[data-title]");
      const tags = recipeCard.querySelector("[data-tags]");
      const button = recipeCard.querySelector("[data-button]");
      //---pushing API data to template elements---
      tags.textContent = `Tags: ${recipe.tags}`;
      title.textContent = recipe.title;
      //---appending a button to each card which fetches the corresponding JSON file and appends specific recipe data to the Recipe info section on click---
      let btn = document.createElement("button");
      btn.innerHTML = "SELECT";
      btn.addEventListener("click", () => {
        fetch(recipe.src)
          .then((res) => res.json())
          .then((data) => {
            //---selectors---
            const title = document.querySelector("[data-recipe-title]");
            const description = document.querySelector(
              "[data-recipe-description]"
            );
            const ingredients = document.querySelector(
              "[data-recipe-ingredients]"
            );
            const directions = document.querySelector(
              "[data-recipe-directions]"
            );
            const prepTime = document.querySelector("[data-recipe-prep-time]");
            const cookTime = document.querySelector("[data-recipe-cook-time]");
            const servings = document.querySelector("[data-recipe-servings]");
            const authorName = document.querySelector(
              "[data-recipe-author-name]"
            );
            const authorUrl = document.querySelector(
              "[data-recipe-author-url]"
            );
            //---pushing recipe data---
            title.textContent = data.title;
            description.textContent = data.description;
            directions.textContent = data.directions;
            servings.textContent = `Normally Serves: ${data.servings}`;
            prepTime.textContent = `Prep Time: ${data.prep_time_min} mins`;
            cookTime.textContent = `Cooking Time: ${data.cook_time_min} mins`;
            authorName.textContent = `Author: ${data.author.name}`;
            authorUrl.textContent = data.author.url;
            //---clearing any previous ingredient values, iterating over the data.ingredient object array within each recipe JSON file, parcing ingredient quantities into floats, dividing them by the recipe default serving amount, multiplying that value by the user input serving amount and then using the fraction.js library to convert the value back into a fraction / mixed fraction and displaying it for each ingredient---
            ingredients.textContent = "";
            data.ingredients.forEach((ingredient) => {
              quantity = ingredient.qty;
              let y = quantity.split(" ");
              if (y.length > 1) {
                let z = y[1].split("/");
                qtyDecimal = +y[0] + z[0] / z[1];
              } else {
                let z = y[0].split("/");
                if (z.length > 1) {
                  qtyDecimal = z[0] / z[1];
                } else {
                  qtyDecimal = z[0];
                }
              }
              let servingAmount = document.querySelector(
                "[data-serving-input]"
              ).value;
              let qty = (qtyDecimal / data.servings) * servingAmount;
              let x = new Fraction(qty);
              let qtyFinal = x.toFraction(true);
              //---creating dynamic No. of paragraphs with ingredient data from each recipe JSON---
              let para = document.createElement("p");
              para.innerHTML = `${ingredient.item} - ${qtyFinal} ${ingredient.unit}`;
              ingredients.appendChild(para);
            });
          });
      });
      button.appendChild(btn);
      recipeCardConatiner.append(recipeCard);
      //---returning recipe-list info to 'searchRecipes' array for search function---
      return { title: recipe.title, tag: recipe.tags, element: recipeCard };
    });
  });
