const recipeCardTemplate = document.querySelector("[data-recipe-card-template]")
const recipeCardConatiner = document.querySelector("[data-recipe-card-container]")
const searchBarInput = document.querySelector("[data-search-bar]")

let searchRecipes = []
let servingAmount = 0

searchBarInput.addEventListener("input", e => {
    const value = e.target.value
    searchRecipes.forEach(recipe => {
        const isVisible = recipe.tag.includes(value) || recipe.title.includes(value)
        recipe.element.classList.toggle("hide", !isVisible)
    })
})

// fetch API request from recipes-list.json
fetch("https://con-grieves.github.io/data/recipes-list.json")
    .then(res => res.json())
    .then(data => {
        searchRecipes = data.map(recipe =>  {
            // Element selectors
            const recipeCard = recipeCardTemplate.content.cloneNode(true).children[0]
            const title = recipeCard.querySelector("[data-title]")
            const tags = recipeCard.querySelector("[data-tags]")
            const button = recipeCard.querySelector("[data-button]")
            // pushing API data to template elements
            tags.textContent = `Tags: ${recipe.tags}`
            title.textContent = recipe.title
            // Appending a button to each card which fetches the corresponding JSON file and appends specific recipe data to the Recipe info section on click
            let btn = document.createElement("button")
            btn.innerHTML = "Make This !"
            btn.addEventListener("click", () => {
                fetch(recipe.src)
                    .then(res => res.json())
                    .then(data => {
                        //selectors
                        const title = document.querySelector("[data-recipe-title]")
                        const description = document.querySelector("[data-recipe-description]")
                        const ingredients = document.querySelector("[data-recipe-ingredients]")
                        const directions = document.querySelector("[data-recipe-directions]")
                        const prepTime = document.querySelector("[data-recipe-prep-time]")
                        const cookTime = document.querySelector("[data-recipe-cook-time]")
                        const servings = document.querySelector("[data-recipe-servings]")
                        const authorName = document.querySelector("[data-recipe-author-name]")
                        const authorUrl = document.querySelector("[data-recipe-author-url]")
                        //pushing recipe data and setting serving amount based on recipe data
                        servingAmount = data.servings
                        title.textContent = data.title
                        description.textContent = data.description
                        prepTime.textContent = `Prep Time: ${data.prep_time_min} mins`
                        cookTime.textContent = `Cooking Time: ${data.cook_time_min} mins`
                        directions.textContent = data.directions
                        authorName.textContent = `Author: ${data.author.name}`
                        authorUrl.textContent = data.author.url
                        //ingredients
                        ingredients.textContent = ""
                        data.ingredients.forEach(ingredient => {
                            quantity = ingredient.qty
                            let para = document.createElement("p")
                            para.innerHTML = `${ingredient.item} - ${quantity} ${ingredient.unit}`;
                            ingredients.appendChild(para) 
                        });
                    })
            })
            button.appendChild(btn)
            recipeCardConatiner.append(recipeCard)
            //returning recipe-list info to array
            return {title: recipe.title, tag: recipe.tags, element: recipeCard}
        })
    });
  