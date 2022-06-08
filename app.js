//Global Constants
const apiKey = "nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H";
const limit = 12;
const rating = "g";

//variants for "show more" button
let offset = 0;
let pageNum = 0;
let values = "";

//DOM
let gifForm = document.querySelector("form");
let gifResults = document.querySelector("#gif-results");
let showMoreButton = document.querySelector("#show-more");

//eventListeners to show gifs
gifForm.addEventListener("submit", handleFormSubmit);
showMoreButton.addEventListener("click", showMore);

//sets up for the api call and show more functions when
//user presses the submit or show more buttons
function handleFormSubmit(evt) {
    evt.preventDefault();
    gifResults.innerHTML = "";

    if (showMoreButton.classList.contains("hidden")) {
        showMoreButton.classList.add("hidden");
    }

    values = evt.target.gif.value;
    getResults(evt);
    gifForm.target.gif.value = "";
}

//calls api to retrieve GIFS
async function getResults(evt) {
    let apiUrl =
        "http://api.giphy.com/v1/gifs/search?api_key=" +
        apiKey +
        "&q=" +
        values +
        "&limit=" +
        limit +
        "&offset=" +
        offset +
        "&rating=" +
        rating;

    let response = await fetch(apiUrl);
    let responseData = await response.json();
    generateHTML(responseData);
}

//uses JSON from api retrieval to print out GIFS on webpage
function generateHTML(gifData) {
    gifData.data.forEach((img) => {
        gifResults.innerHTML += `<img src = "${img.images.original.url}" alt ="Gif" />`;
    });
    showMoreButton.classList.remove("hidden");
}

//makes the "show more" button work
function showMore(evt) {
    pageNum++;
    offset = pageNum * limit;
    showMoreButton.classList.add("hidden");
    getResults(evt);
}