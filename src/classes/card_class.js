import Dom from './dom_class.js';
import Util from './util_class.js';

export default class Card {
    constructor() {
        const container = Dom.createElement('a', 'card-container');
        const leftContainer = Dom.createElement('div', 'left');
        const rightContainer = Dom.createElement('div', 'right');
        const airingContainer = Dom.createElement('div', 'airing-rating-container');

        container.target = '_blank';
        this.container = container;
        this.parentContainers = { leftContainer, rightContainer, airingContainer };
    }

    createImg(src = 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx98515-sSZiUx4VI0KH.png', alt = 'Cover Image') {
        const img = Dom.createElement('img', 'cover-image');
        img.src = src;
        img.alt = alt;
        this.img = img;
    }

    // private helper method
    _formatShowType(showType) {
        if (showType === 'TV_SHORT') return 'TV Short';
        if (showType === 'MOVIE')    return 'Movie';
        if (showType === 'SPECIAL')  return 'Special';
        return showType;
    }

    // PARAMETERS
    // title:
    //   an object containing the english and/or romaji title of the media
    // showType:
    //   a string describing the type of show the media is (i.e. TV, OVA, MANGA, etc)
    // studios:
    //   an array of objects with each object containing an isMain, which is a boolean,
    //   property and a property called node, which is an object itself that contains the property 'name',
    //   which contains the name of the studio
    createInfoContainer(title = { english: 'N/A' }, showType = 'N/A', studios = [{ isMain: true, node: { name: 'N/A' } }]) {
        // creating dom elements
        const infoContainer = Dom.createElement('div', 'info');
        const titleTag = Dom.createElement('p', 'title');
        const showTypeTag = Dom.createElement('p');
        const studioTag = Dom.createElement('p');

        // formatting 'titleTag', 'showTypeTag', and 'studioTag'
        titleTag.innerText = (title.english === null) ? title.romaji : title.english;
        showTypeTag.innerText = this._formatShowType(showType);
        studios.forEach(studio => {
            if (studio.isMain) studioTag.innerText += studio.node.name + ' ';
        });

        // appending elements to container
        Dom.appendToNode(infoContainer, [titleTag, showTypeTag, studioTag]);
        this.infoContainer = infoContainer;
    }

    // date, episode #, source
    createEpisodesDateContainer(episodes = '00 episodes aired on', date = 'January 0, 0000', source = 'Source') {
        // creating dom elements
        const epsisodesDateContainer = Dom.createElement('div');
        const episodesTag = Dom.createElement('p');
        const dateTag = Dom.createElement('p', 'date');
        const sourceTag = Dom.createElement('p');
        
        // formating 'episodesTag' and 'dateTag'
        episodesTag.innerText = episodes.replace(/_/g, ' ').toLowerCase(); // replaces the '_' with a ' '
        const month = Util.months[date.month];
        dateTag.innerText = Util.formatDate(month, date.day, date.year);
        
        // validating 'source' parameter
        if(!Util.valid(source)) sourceTag.innerText = 'N/A';
        if(Util.valid(source)) {
            const formattedString = source.replace('_', ' ').toLowerCase();
            sourceTag.innerText = 'Source • ' + formattedString;
        }

        // appending elements to container
        Dom.appendToNode(epsisodesDateContainer, [episodesTag, dateTag, sourceTag]);
        this.epsisodesDateContainer = epsisodesDateContainer;
    }

    // rating (percent/avgScore and rank)
    createRatingContainer(avgScore = 0, rank = 0) {
        // creating dom elements
        const ratingContainer = Dom.createElement('div', 'rating');
        const avgScoreTag = Dom.createElement('p');
        const rankTag = Dom.createElement('p');
        
        // validating 'avgScoreTag' and 'rankTag'
        avgScoreTag.innerText = Util.valid(avgScore) ? avgScore + '%' : 'N/A';
        rankTag.innerText = Util.valid(rank) ? '#' + rank : 'N/A';

        // appending elements to container
        Dom.appendToNode(ratingContainer, [avgScoreTag, rankTag]);
        this.ratingContainer = ratingContainer;
    }

    // genre
    createGenreContainer(genre = 'Comedy, Ecchi') {
        // creating dom elements
        const genreContainer = Dom.createElement('div', 'genre');
        const genreTag = Dom.createElement('p');

        // formatting 'genreTag'
        if(!Array.isArray(genre)) genreTag.innerText = genre;
        if(Array.isArray(genre)) genreTag.innerText = genre.join(', ') 

        // appending elements to container 
        Dom.appendToNode(genreContainer, genreTag);
        this.genreContainer = genreContainer;
    }

    // description
    createDescriptionContainer(description = 'N/A') {
        // creating dom elements
        const descriptionContainer = Dom.createElement('div', 'description');
        const descriptionTag = Dom.createElement('p');

        // formatting 'descriptionTag'
        const valid = (item) => (item !== '') && Util.valid(item);
        if (!valid(description)) descriptionTag.innerHTML = 'N/A';
        if (valid(description))  descriptionTag.innerHTML = description;

        // appending elements to container 
        Dom.appendToNode(descriptionContainer, descriptionTag);
        this.descriptionContainer = descriptionContainer;
    }

    // combines all containers created
    appendAllContainers() {
        Dom.appendToNode(this.parentContainers.leftContainer, [this.img, this.infoContainer]);
        Dom.appendToNode(this.parentContainers.rightContainer, [this.parentContainers.airingContainer, this.genreContainer, this.descriptionContainer]);
        Dom.appendToNode(this.parentContainers.airingContainer, [this.epsisodesDateContainer, this.ratingContainer]);
        Dom.appendToNode(this.container, [this.parentContainers.leftContainer, this.parentContainers.rightContainer]);
    }

    // maybe move function to another file
    static createCards(media, showNsfwContent) {
        const main = document.getElementById('main');
        media.forEach(item => {
            // formatting 'rank'
            const rank = (item.rankings.length === 0) ? 'N/A' : item.rankings[0].rank;
            
            // if you dont want to show nsfw content
            if (!showNsfwContent) {
                // skip adult content
                if (item.isAdult) return;
            }
            
            // card creation
            const card = new Card();
            card.createImg(item.coverImage.large); // can play around with 'medium', 'large', or 'extraLarge' for faster load times
            card.container.href = item.siteUrl;
            card.createInfoContainer(item.title, item.format, item.studios.edges);
            card.createEpisodesDateContainer(item.status, item.startDate, item.source);
            card.createRatingContainer(item.averageScore, rank);
            card.createGenreContainer(item.genres);
            card.createDescriptionContainer(item.description);
            card.appendAllContainers();

            // appends card to <main>
            Dom.appendToNode(main, card.container);
        });
    }
}