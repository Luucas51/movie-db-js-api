let displayResult = document.querySelector('.display');
let searchBar = document.querySelector('.search-bar');
let btnSubmit = document.querySelector('.submit-btn');








btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    let valueOfSearchBar = searchBar.value;
    console.log(valueOfSearchBar);
    getMovie(valueOfSearchBar);
})    

const getMovie = async (valueOfSearchBar) => {
    const apikey = '5487ca59';
    let getResult = [];
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=5487ca59&s=${valueOfSearchBar}`)
        const responseData = await response.json();
        console.log(responseData.Search)
        
        responseData.Search.forEach(movie => {
            getResult.push({'Title': movie.Title, 'Poster': movie.Poster, 'Year': movie.Year})
        });
    } catch (error) {
        console.error(error.message)
    }
    const displayOnHtml = (getResult) => {
        displayResult.innerHTML='';
        getResult.forEach(element => {
            displayResult.innerHTML+=`
            <h1>Titre: ${element.Title}</h1>
            <img src="${element.Poster}">
            <p>Année de sortie : ${element.Year}</p>
            <button id="myBtn">Open Modal</button>
            `
        })
    }
    displayOnHtml(getResult);
}


