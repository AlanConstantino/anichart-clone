import Dom from './dom_class.js';
import Util from './util_class.js';

export default class Card {
    constructor() {
        const container = Dom.createElement('a', 'card-container');
        container.target = '_blank';
        const leftContainer = Dom.createElement('div', 'left');
        const rightContainer = Dom.createElement('div', 'right');
        const airingContainer = Dom.createElement('div', 'airing-rating-container');
        // figure out what you want to do with container, whether
        // you want it to be an accessible property from card or bundle it
        // with parentContainers object
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
        if (showType === 'TV_SHORT') {
            return 'TV Short';
        }
        if (showType === 'MOVIE') {
            return 'Movie';
        }
        if (showType === 'SPECIAL') {
            return 'Special';
        }
        return showType;
    }

    // clean up the parameters of this function, make their data easier to read/accept
    createInfoContainer(title = { english: 'N/A' }, showType = 'N/A', studios = [{ isMain: true, node: { name: 'N/A' } }]) {
        const infoContainer = Dom.createElement('div', 'info');
        const titleTag = Dom.createElement('p', 'title');
        const showTypeTag = Dom.createElement('p');
        const studioTag = Dom.createElement('p');
        titleTag.innerText = (title.english === null) ? title.romaji : title.english;
        showTypeTag.innerText = this._formatShowType(showType);
        studios.forEach(studio => {
            if (studio.isMain) {
                studioTag.innerText += studio.node.name + ' ';
            }
        });
        Dom.appendToNode(infoContainer, [titleTag, showTypeTag, studioTag]);
        this.infoContainer = infoContainer;
    }

    // date, episode #, source
    createEpisodesDateContainer(episodes = '12 episodes aired on', date = 'January 9, 2020', source = 'Light Novel') {
        const epsisodesDateContainer = Dom.createElement('div');
        const episodesTag = Dom.createElement('p');
        const dateTag = Dom.createElement('p', 'date');
        const sourceTag = Dom.createElement('p');
        episodesTag.innerText = episodes.replace(/_/g, ' ').toLowerCase();
        let startDate = Util.formatDate(Util.months[date.month], date.day, date.year);
        dateTag.innerText = startDate;
        // remove this if possible, or at least improve it
        if (source === null || source === undefined) {
            sourceTag.innerText = 'N/A';
        } else {
            sourceTag.innerText = 'Source • ' + source.replace('_', ' ').toLowerCase();
        }
        Dom.appendToNode(epsisodesDateContainer, [episodesTag, dateTag, sourceTag]);
        this.epsisodesDateContainer = epsisodesDateContainer;
    }

    // rating (percent/avgScore and rank)
    createRatingContainer(avgScore = 48, rank = 26) {
        const ratingContainer = Dom.createElement('div', 'rating');
        const avgScoreTag = Dom.createElement('p');
        const rankTag = Dom.createElement('p');
        avgScoreTag.innerText = (avgScore === null || avgScore === undefined) ? 'N/A' : avgScore + '%';
        rankTag.innerText = (rank === null || rank === undefined) ? 'N/A' : '#' + rank;
        Dom.appendToNode(ratingContainer, [avgScoreTag, rankTag]);
        this.ratingContainer = ratingContainer;
    }

    // genre
    createGenreContainer(genre = 'Comedy, Ecchi') {
        const genreContainer = Dom.createElement('div', 'genre');
        const genreTag = Dom.createElement('p');

        if (Array.isArray(genre)) {
            const genres = genre.join(', ');
            genreTag.innerText = genres;
        } else {
            genreTag.innerText = genre;
        }

        Dom.appendToNode(genreContainer, genreTag);
        this.genreContainer = genreContainer;
    }

    // description
    createDescriptionContainer(description = 'N/A') {
        const descriptionContainer = Dom.createElement('div', 'description');
        const descriptionTag = Dom.createElement('p');
        if (description === '' || description === null || description === undefined) {
            descriptionTag.innerHTML = 'N/A';
        } else {
            descriptionTag.innerHTML = description;
        }
        Dom.appendToNode(descriptionContainer, descriptionTag);
        this.descriptionContainer = descriptionContainer;
    }

    // combines all containers created
    appendAllContainers() {
        Dom.appendToNode(this.parentContainers.leftContainer, [this.img, this.infoContainer]);
        Dom.appendToNode(this.parentContainers.rightContainer, [this.parentContainers.airingContainer, this.genreContainer, this.descriptionContainer])
        Dom.appendToNode(this.parentContainers.airingContainer, [this.epsisodesDateContainer, this.ratingContainer]);
        Dom.appendToNode(this.container, [this.parentContainers.leftContainer, this.parentContainers.rightContainer]);
    }

    static createCards(media, showNsfw) {
        const main = document.getElementById('main');
        media.forEach(item => {
            const rank = (item.rankings.length === 0) ? 'N/A' : item.rankings[0].rank;
            const card = new Card();
            if (!showNsfw) {
                if (item.isAdult) { // if content isAdult
                    return;         // skip to next iteration
                }
            }
            // can play around with 'medium', 'large', or 'extraLarge' for faster load times
            card.createImg(item.coverImage.large);
            card.container.href = item.siteUrl;
            card.createInfoContainer(item.title, item.format, item.studios.edges);
            card.createEpisodesDateContainer(item.status, item.startDate, item.source);
            card.createRatingContainer(item.averageScore, rank);
            card.createGenreContainer(item.genres);
            card.createDescriptionContainer(item.description);
            card.appendAllContainers();
            Dom.appendToNode(main, card.container);
        });
    }
}