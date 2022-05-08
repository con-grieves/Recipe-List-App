// Pulling json data hosted on github pages via fetch API and converting the response into an object.

// Response is then put into a data variable from which the object data is passed to each card template via .map() which allows for the search function to work as i'm able to map the relevant search parameters into an array. content.cloneNode.children takes the html template and will copy the content and the elements for each card. It initally returns a 'document fragment' from the template, children[0] grabs the first child of the fragment so it can be cloned for each recipe card.

// Search function checks to see if the e.value from the search input is included in any of the recipes in the array mapped from the API data. If so it will toggle the 'hide' CSS class on any that do not show a match.

const recipeCardTemplate = document.querySelector("[data-recipe-card-template]")
const recipeCardConatiner = document.querySelector("[data-recipe-card-container]")
const searchBarInput = document.querySelector("[data-search-bar]")

let searchRecipes = []

searchBarInput.addEventListener("input", e => {
    const value = e.target.value
    searchRecipes.forEach(recipe => {
        const isVisible = recipe.tag.includes(value) || recipe.title.includes(value)
        recipe.element.classList.toggle("hide", !isVisible)
    })
})

//recipe-list
fetch("https://con-grieves.github.io/data/recipes-list.json")
    .then(res => res.json())
    .then(data => {
        // mapping recipe data to 'searchRecipes' array
        searchRecipes = data.map(recipe =>  {
            // Element selectors
            const recipeCard = recipeCardTemplate.content.cloneNode(true).children[0]
            const title = recipeCard.querySelector("[data-title]")
            const tags = recipeCard.querySelector("[data-tags]")
            const button = recipeCard.querySelector("[data-button]")
            // Appending API data to template elements
            tags.textContent = recipe.tags
            title.textContent = recipe.title
            // Appending a button to each card which fetches the corresponding JSON file and appends specific recipe data to the Recipe info section
            let btn = document.createElement("button")
            btn.innerHTML = "Make This !"
            btn.addEventListener("click", () => {
                fetch(recipe.src)
                    .then(res => res.json())
                    .then(data => {
                        const title = document.querySelector("[data-recipe-title]")
                        const description = document.querySelector("[data-recipe-description]")
                        const ingredients = document.querySelector("[data-recipe-ingredients]")
                        const directions = document.querySelector("[data-recipe-directions]")
                        const prepTime = document.querySelector("[data-recipe-prep-time]")
                        const cookTime = document.querySelector("[data-recipe-cook-time]")
                        const servings = document.querySelector("[data-recipe-servings]")
                        const authorName = document.querySelector("[data-recipe-author-name]")
                        const authorUrl = document.querySelector("[data-recipe-author-url]")
                        title.textContent = data.title
                        description.textContent = data.description
                        data.ingredients.forEach(ingredient => {
                            let para = document.createElement("p")
                            para.innerHTML = `Item: ${ingredient.item}, Unit: ${ingredient.unit},       Quantity: ${ingredient.qty}`;
                            ingredients.appendChild(para) 
                        })
                        directions.textContent = data.directions
                        prepTime.textContent = data.prep_time_min
                        cookTime.textContent = data.cook_time_min
                        servings.textContent = data.servings
                        authorName.textContent = data.author.name
                        authorUrl.textContent = data.author.url
                    })
            })
            button.appendChild(btn)
            // Appending templates to recipe-card div
            recipeCardConatiner.append(recipeCard)
            return {title: recipe.title, tag: recipe.tags, element: recipeCard}
        })
    });



  