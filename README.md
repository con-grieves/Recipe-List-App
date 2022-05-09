# Recipe-List-App
A simple recipe list app built using Javascript incorporating a data set from JSON files. Built with forward planning / scale in mind.

# Key Choices Made

1. Inclusion of Search Function
2. Fetching via API vs local
3. Using a template to build Recipe cards vs hard-coding each card
4. Dynamically appending paragraph elements for ingredients vs hard-coding paragraphs and appending ingredient data

# Improvments and Considerations

1. Improving the search function to be more flexible
2. Making the serving input asynchronous so that the card SELECT button doesn't need to be pressed everytime the user changes the serving input value
3. Having the default serving value for each recipe set upon pressing SELECT before user inputs any value
4. Overall smoothing out of UX from filtering, serving selection and recipe selection
5. Finding a way to append URL data for each recipe.JSON within the recipe index file automatically instead of manually, potentially somthing to consider if I was to model my own JSON data.
6. Incorporate Unit testing Via JEST
