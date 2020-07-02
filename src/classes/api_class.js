import Util from './util_class.js';
import Card from './card_class.js';

export default class Api {
  constructor(url, options, variables, query) {
    this.url = url;
    this.options = options;
    this.variables = variables;
    this.query = query;
  }

  // updates options.body whenever it's called
  setOptionsBody(query) {
    this.options.body = JSON.stringify({
      query: query,
      variables: this.variables
    });
  }

  // private helper method
  _setSeason(season) {
    if(season === undefined || season === null) this.variables.season = Util.getCurrentSeason();
    if(season !== undefined && season !== null) this.variables.season = season;
  }

  // 'season' argument is optional
  // - if not specified, will request data from the current season
  // - if specified, will request data from that specific season
  async makeRequest(query, season) {
    if (season) this._setSeason(season);

    this.setOptionsBody(query);
    const data = await fetch(this.url, this.options)
      .then(this._handleResponse)
      .catch(this._handleError);
    return data;
  }

  // private helper method
  // checks to see if the response from the API is valid
  _handleResponse(response) {
    return response.json()
                   .then(
                     json => response.ok ? json : Promise.reject(json)
                   );
  }

  // private helper method
  // handles errors, if any
  _handleError(error) {
    alert('Error, check console');
    console.error(error);
  }

  // function that handles data from the API
  handleData(data, showNsfw = false) {
    const media = data.data.Page.media;
    const pageInfo = data.data.Page.pageInfo;
    Card.createCards(media, showNsfw);
    // console.log(`Page ${pageInfo.currentPage} out of ${pageInfo.lastPage}.`);

    if (!pageInfo.hasNextPage) {      // as long as there is no next page
      this.variables.page = 1;        // reset page number to 1
      // console.log('No more pages!');
      return;
    }

    this.variables.page++;
    this.setOptionsBody(this.query, this.variables);
    const request = this.makeRequest(this.query);
    request.then(data => this.handleData(data)); // recursive call
  }
}