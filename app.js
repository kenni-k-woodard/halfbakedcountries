/* Imports */
// Slice A: import getCountries from fetch-utils.js xK
import { getCountries, getContinents } from './fetch-utils.js';
// Slice B: import getContinents from fetch-utils.js xK

import { renderContinentOption, renderCountry } from './render-utils.js';

/* Get DOM Elements */
const countryList = document.getElementById('country-list');
const searchForm = document.getElementById('search-form');
const continentSelect = document.getElementById('continent-select');

/* State */
let countries = [];
let continents = [];

/* Events */
window.addEventListener('load', async () => {
    // call findCountries function with no arguments to fetch all countries (Slice A); xK
    findCountries();
    // Slice B: call asynchronous getContinents fetch function and set to response variable xK
    const response = await getContinents();
    // Slice B: set the continents state to the response.data xK
    continents = response.data;
    // Slice B: call displayContinentOptions function; xK
    displayContinentOptions();
});

async function findCountries(continent) {
    // Slice A: call the asynchronous fetch function to get the countries xK
    const response = await getCountries(continent);
    // Slice C: add continent argument to getCountries function call xK
    // console log the response object to see all of the nested information returned

    // Slice A: set the countries state to the response.data xK
    countries = response.data;
    // Slice A: call displayCountries function; xK
    displayCountries();
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    // Slice C: Call findCountries with continent from formData
    findCountries(formData.get('continent'));
});

/* Display Functions */
function displayCountries() {
    //Slice A: reset the countries List xK
    countryList.innerHTML = '';

    for (const country of countries) {
        // Slice A: Call imported render countries function and append to list xK
        const countryEl = renderCountry(country);
        countryList.append(countryEl);
    }
}

function displayContinentOptions() {
    for (const continent of continents) {
        // Slice B: Call continent render function and append to continent selector xK
        const option = renderContinentOption(continent);
        continentSelect.append(option);
    }
}
