let displayResult = document.querySelector('.display');
let searchBar = document.querySelector('.search-bar');
let btnSubmit = document.querySelector('.submit-btn');
let popupDiv = document.querySelector('.popup-block');
let moreBtn = document.querySelectorAll('.more-btn');
let closeBtn = document.querySelector('.close-btn');
let posterPlace = document.querySelector('.poster-place');
let titlePopup = document.querySelector('.title-popup');
let yearDiv = document.querySelector('.year-popup');
let typeDiv = document.querySelector('.div');





btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    let valueOfSearchBar = searchBar.value;
    //console.log(valueOfSearchBar);
    getMovie(valueOfSearchBar);
})    


const getId = async (valueOfSearchBar) => {
    try {
        console.log(valueOfSearchBar)
        const responseId = await fetch(`http://www.omdbapi.com/?apikey=5487ca59&i=${valueOfSearchBar}&plot=full`);
        const responseIdData = await responseId.json();
        console.log(responseIdData)

        return {'title': responseIdData.Title, 'poster': responseIdData.Poster, 'plot': responseIdData.Plot}

    } catch(error){
        console.error(error.message);
    }
}


const getMovie = async (valueOfSearchBar) => {
    let getResult = [];
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=5487ca59&s=${valueOfSearchBar}&plot=full`)
        const responseData = await response.json();
        console.log(responseData)
        
        responseData.Search.forEach(movie => {
            getResult.push({'Title': movie.Title, 'Poster': movie.Poster, 'Year': movie.Year, 'Plot': movie.Plot, 'id': movie.imdbID, 'plot': movie.Plot})
        });
    } catch (error) {
        console.error(error.message)
    }
    
    

    displayOnHtml(getResult);
    moreBtn = document.querySelectorAll('.more-btn');
    popupDiv = document.querySelector('.popup-block');
    closeBtn = document.querySelector('.close-btn')
    posterPlace = document.querySelector('.poster-place');
    titlePopup = document.querySelector('.title-popup');
    yearDiv = document.querySelector('.year-popup');
    typeDiv = document.querySelector('.type');

    moreBtn.forEach(element => {
        element.addEventListener('click', e => {
            let btnIndex = Array.from(moreBtn).indexOf(e.target);
            getId(getResult[btnIndex].id);
            if(popupDiv.style.display='none'){
                popupDiv.style.display='flex'
                posterPlace.innerHTML+=`<img src='${getResult[btnIndex].Poster}' class="poster-place">`
                titlePopup.innerHTML+=`<h1>${getResult[btnIndex].Title}</h1>`
                yearDiv.innerHTML+=`<p>${getResult[btnIndex].Year}</p>`
                typeDiv.innerHTML+=`<p>${getResult[btnIndex].Type}</p>`
            }
        })
    })

    closeBtn.addEventListener('click', () => {
        if(popupDiv.style.display='flex'){
            popupDiv.style.display='none';
        }
    })
}

const displayOnHtml = (getResult) => {
    displayResult.innerHTML='';
    getResult.forEach(element => {
        displayResult.innerHTML+=`
        <h1>Titre: ${element.Title}</h1>
        <img src="${element.Poster}">
        <p>Année de sortie : ${element.Year}</p>
        <button class="more-btn">More</button>
        `
    })
}

