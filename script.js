// Selectors
const recipeCardTemplate = document.querySelector("[data-recipe-card-template]")
const recipeCardConatiner = document.querySelector("[data-recipe-card-container]")

// Pulling json data hosted on github pages via fetch API and converting the response into an object.
// Response is then put into a data variable from which the object data is passed to each card template via forEach loop. content.cloneNode.children takes the html template and will copy the content and the elements for each card. It initally returns a 'document fragment', children[0] grabs the first child of the fragment so it can be iterated on.

// **I had to slightly modify the recipes-list.json file formatting to allow me to grab each recipe object via the forEach loop**.

fetch("https://con-grieves.github.io/data/recipes-list.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(recipe =>  {
            const recipeCard = recipeCardTemplate.content.cloneNode(true).children[0]
            const title = recipeCard.querySelector("[data-title]")
            const description = recipeCard.querySelector("[data-description]")
            title.textContent = recipe.title
            description.textContent = recipe.description
            recipeCardConatiner.append(recipeCard)
        })
    })

    
