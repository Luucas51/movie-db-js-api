let displayResult = document.querySelector('.display');
let searchBar = document.querySelector('.search-bar');
let btnSubmit = document.querySelector('.submit-btn');
let popupDiv = document.querySelector('.popup-block');
let moreBtn = document.querySelectorAll('.more-btn');
let closeBtn = document.querySelector('.close-btn');
let posterPlace = document.querySelector('.poster-place');
let titlePopup = document.querySelector('.title-popup');
let yearDiv = document.querySelector('.year-popup'); 
let plotDiv = document.querySelector('.plot');
let genreDiv = document.querySelector('.genre');
let directorDiv = document.querySelector('.director');
let writerDiv = document.querySelector('.writer');
let modalBackground = document.querySelector('.modal-bg');
let counterPage = 2;


btnSubmit.addEventListener('click', e => {
    e.preventDefault();
    let valueOfSearchBar = searchBar.value;
    getMovie(valueOfSearchBar);
})    


const getId = async (valueOfSearchBar) => {
    try {
        const responseId = await fetch(`http://www.omdbapi.com/?apikey=5487ca59&i=${valueOfSearchBar}&plot=full`);
        const responseMovie = await responseId.json();
        posterPlace.innerHTML=`<img src='${responseMovie.Poster}' class="poster-place">`
        titlePopup.innerHTML=`<h1>${responseMovie.Title}</h1>`
        plotDiv.innerHTML=`<p>Resume : ${responseMovie.Plot}</p>`
        yearDiv.innerHTML=`<p>Year : ${responseMovie.Year}</p>`
        genreDiv.innerHTML=`<p>Genre : ${responseMovie.Genre}</p>`
        directorDiv.innerHTML=`<p>Director : ${responseMovie.Director}</p>`
        writerDiv.innerHTML=`<p>Writer : ${responseMovie.Writer}</p>`
        console.log(responseMovie)
        
    } catch(error){
        console.error(error.message);
    }
}

const getMovie = async (valueOfSearchBar, counterPage=1) => {
    let getResult = [];
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=5487ca59&s=${valueOfSearchBar}&plot=full&page=${counterPage}`)
        const responseData = await response.json();
        
        responseData.Search.forEach(movie => {
            getResult.push({'Title': movie.Title, 'Poster': movie.Poster, 'Year': movie.Year, 'Plot': movie.Plot, 'id': movie.imdbID, 'plot': movie.Plot})
        });
    } catch (error) {
        console.error(error.message)
    }
    
    displayOnHtml(getResult, counterPage);


    let observer = new IntersectionObserver(function (observables){
        observables.forEach(function (observable){
            if(observable.intersectionRatio > 0.5){
                observable.target.classList.remove('not-visible');
                observer.unobserve(observable.target)
                console.log('Visible card')
            } else {
                observable.target.classList.add('not-visible');
            }
        })
        

    }, {
        threshold: [0.5]
    })
    
    let cardResult = document.querySelectorAll('.card');

    cardResult.forEach(function (card) {
        card.classList.add('not-visible');
        observer.observe(card)
    })

    moreBtn = document.querySelectorAll('.more-btn');
    popupDiv = document.querySelector('.popup-block');
    closeBtn = document.querySelector('.close-btn')
    posterPlace = document.querySelector('.poster-place');
    titlePopup = document.querySelector('.title-popup');
    yearDiv = document.querySelector('.year-popup');
    plotDiv = document.querySelector('.plot');
    
    moreBtn.forEach(element => {
        element.addEventListener('click', e => {
            let btnIndex = Array.from(moreBtn).indexOf(e.target);
            let movie = getId(getResult[btnIndex].id);
            if(popupDiv.style.display='none'){
                popupDiv.style.display='flex'
                modalBackground.style.display='flex'
            }
        })
    })
    
    closeBtn.addEventListener('click', () => {
        if(popupDiv.style.display='flex'){
            popupDiv.style.display='none';
            modalBackground.style.display='none'
        }
    })
}


const displayOnHtml = (getResult) => {
    getResult.forEach(element => {
        
        
        displayResult.innerHTML+=`
            <div class='card'>
                <img src="${element.Poster}" class='pos-poster-main'>
                <div class='pos-text-main'>
                <h1 class='pos-title-main'>Title : ${element.Title}</h1>
                <p class='pos-year-main'>Year : ${element.Year}</p>
                <button class="more-btn">More</button>
                </div>
            </div>
            `
        })
    }
    
    
    
    window.onscroll = function() {
        if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight){
            //displayResult.innerHTML='';
            getMovie(searchBar.value, counterPage);
            counterPage++;
        }
    }
    
    
    
    
