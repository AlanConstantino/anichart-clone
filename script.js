// import Api from './classes/api_class.js';
// import Dom from './classes/dom_class.js';
// import Util from './classes/util_class.js';

// const currentYear = Util.getCurrentYear();
const currentYear = new Date().getFullYear();
// const currentSeason = Util.getCurrentSeason();
let navbarSeason = ''; // storing the season of the nav temporarily for checkBoxValidation()
const url = 'https://graphql.anilist.co';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: {}
};
const query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String, $season: MediaSeason, $year: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(id: $id, search: $search, season: $season, seasonYear: $year) {
          id
          siteUrl
          rankings {
            rank
          }
          isAdult
          startDate {
            year
            month
            day
          }
          source
          status
          episodes
          description(asHtml: true)
          chapters
          volumes
          studios(sort: NAME) {
            edges {
              isMain
              node {
                name
              }
            }
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          airingSchedule {
            nodes {
              episode
              airingAt
              timeUntilAiring
            }
          }
          averageScore
          genres
          season
          seasonYear
          type
          format
          popularity
          title {
            english
            romaji
          }
        }
      }
    }
  `;
const variables = {
  year: currentYear,
  page: 1
};
const checkBox = document.getElementById('nsfw');

// // sets the current year to each navbar item
// // i.e. "Winter 2020", "Spring 2020", etc.
const navbarElements = [...document.getElementsByClassName('season-year')];
navbarElements.forEach(element => element.innerText = currentYear);
// Util.setSeasonYearNavbar(currentYear);

// // creating instances of the Api and Dom class
// const api = new Api(url, options, variables, query);
// const dom = new Dom();

// // shows media of the season we are currently in
// const request = api.makeRequest(query, currentSeason);
// request.then(data => api.handleData(data));

// // will request media based on what navitem you clicked
// // will also show nsfw media if checkbox has been clicked
// // i.e. If you clicked on Winter, will show you Winter media
// function requestNavbarSeasonMedia(navitem) {
//   navitem.addEventListener('click', () => {
//     Dom.clearMainTag(); // clears everything within the <main> tag
//     navbarSeason = navitem.id.toUpperCase();
//     const request = api.makeRequest(query, navbarSeason);
//     if (checkBox.checked) {
//       request.then(data => api.handleData(data, true));
//       return;
//     }
//     request.then(data => api.handleData(data, false));
//   });
// }

// // checkbox event handler function
// function checkBoxEventHandler() {
//   Dom.clearMainTag();
//   console.log(navbarSeason);
//   if (navbarSeason === '') {
//     navbarSeason = currentSeason;
//   }
//   const request = api.makeRequest(query, navbarSeason);
//   request.then(data => api.handleData(data, checkBox.checked));
// }

// // clicking on a navitem changes media to that season
// const navbar = [...dom.navbar];
// navbar.forEach(navitem => requestNavbarSeasonMedia(navitem));

// // whenever you click on the nsfw checkbox, checkBoxValidation() gets fired off
// checkBox.addEventListener('change', checkBoxEventHandler);