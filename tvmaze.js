"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm( term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  //console.log(term);
  const showList = await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
 

let showArr = showList.data;
//console.log(showArr);
let returnArr = [];
for(let char of showArr){
  //console.log(char);
  returnArr.push({
    id: char.show.id,
    name: char.show.name,
    summary: char.show.summary,
    img: char.show.image.medium
  })
}


return returnArr;
  
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  //console.log(shows);
  for (let show of shows) {
  if(!show.img){
    show.img = 'https://freesvg.org/img/Image-Not-Found.png'
    }
    const $show = $(
        `<div data-show-id=${show.id} class="Show col-md-12 col-lg-6 mb-4">
        <div class="media">
          <img 
             src=${show.img}
             alt=${show.name}
             class="w-25 mr-3">
          <div class="media-body">
            <h5 class="text-primary">${show.name}</h5>
            <div><small>${show.summary}</small></div>
            <button id=${show.id} class= "btn btn-outline-light btn-sm Show-getEpisodes">
              Episodes
            </button>
          </div>
        </div>  
      </div>
      `
      
      );

      //document.getElementById
    
    $showsList.append($show); 

    
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  //console.log($("#search-query").val());
  //console.log(term);
  const shows = await getShowsByTerm(term);
  //console.log(shows);
  
  //$episodesArea.hide();
   populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
  
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

 async function getEpisodesOfShow(id) { 
  document.querySelector('#episodes-list').replaceChildren();
  //document.querySelector('#episodes-list').replaceChildren();
  
  const episodeList = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
 

  let episodeArr = episodeList.data;
  console.log(episodeArr);
  let returnArr = [];
  for(let char of episodeArr){
    //console.log(char);
    returnArr.push({
      id: char.id,
      name: char.name,
      season: char.season,
      number: char.number
    })
  }
  console.log(returnArr);
  
  let episodeElement = document.createElement('ul');
  for(let char of returnArr){

  
  let newElement = document.createElement('li');
  newElement.innerText = `name:${char.name}, id:${char.id}, season:${char.season}, number:${char.number} `;

  document.querySelector('#episodes-list').append(newElement);
  console.log(newElement);

}
//$("#episodes-area").show();
//


 }

/** Write a clear docstring for this function... */
//returns an array of elements

 function populateEpisodes(episodes) { 
  
  
 }

 document.getElementById('shows-list').addEventListener('click', async function(event){
 //console.log(event.target.innerText);
 //console.log(getEpisodesOfShow(event.target.id));
  if(event.target.innerText === 'Episodes'){
    let epiArr = getEpisodesOfShow(event.target.id);
    


  }

 })






