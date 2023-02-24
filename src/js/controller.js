import * as model from "./model.js";

import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

// // polyfill asyncs
import { async } from "regenerator-runtime/runtime";
// polyfill everything else
import "core-js/stable";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner();

        // 1) Loading recipe
        await model.loadRecipe(id);

        // 2) Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderMessage();
    }
};

const controlSearchResults = async function () {
    try {
        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        console.log(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
};

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
