import Api from './classes/api_class.js';
import Dom from './classes/dom_class.js';
import Util from './classes/util_class.js';
import { url, options, variables, query } from './query_settings.js';


// global variables for this file
const api = new Api(url, options, variables, query);
const dom = new Dom();
let navbarSeason = ''; // storing the season of the nav temporarily for displayNSFWContent()
const checkBox = document.getElementById('nsfw');

// loading icon
const loadIcon = {
  css: document.getElementsByClassName('loading-icon')[0].style,
  display: () => loadIcon.css.display = 'block',
  remove:  () => loadIcon.css.display = 'none'
};

// will request media based on what navitem you clicked
// will also show nsfw media if checkbox has been clicked
// i.e. If you clicked on Winter, will show you Winter media
function listenForClickedNavbarSeason(navitem) {
  navitem.addEventListener('click', () => {
    Dom.clearMainTag(); // clears everything within the <main> tag
    loadIcon.display();
    navbarSeason = navitem.id.toUpperCase();
    const request = api.makeRequest(query, navbarSeason);
    request.then(data => {
      if (checkBox.checked)  api.handleData(data, true);
      if (!checkBox.checked) api.handleData(data, false);
      loadIcon.remove();
    });
  });
}

// checkbox event handler function
function displayNSFWContent() {
  Dom.clearMainTag();
  loadIcon.display();
  const request = api.makeRequest(query, navbarSeason);
  request.then(data => {
    api.handleData(data, checkBox.checked);
    loadIcon.remove();
  });
}

function main() {
  // sets the current year to each navbar item
  // i.e. "Winter 2020", "Spring 2020", etc.
  const currentYear = Util.getCurrentYear();
  Util.setSeasonYearNavbar(currentYear);

  // clicking on a navitem changes media to that season
  const navbar = [...dom.navbar];
  navbar.forEach(navitem => listenForClickedNavbarSeason(navitem));

  // whenever you click on the nsfw checkbox, displayNSFWContent() gets fired off
  checkBox.addEventListener('change', displayNSFWContent);

  // displays media of the season we are currently in, then removes loading icon
  const currentSeason = Util.getCurrentSeason();
  const request = api.makeRequest(query, currentSeason);
  request.then(data => {
    api.handleData(data);
    loadIcon.remove();
  });
}

main();