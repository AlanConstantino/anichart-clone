# [anichart-clone](https://anime.alanjc.com/)
I utilized JavaScript, HTML, CSS, and AniList's GraphQL API to create a website similar to [AniChart](https://anichart.net/).

You can visit the website [here](https://anime.alanjc.com/).

# Images
![Anichart Clone](./images/anichart-clone.png)
![Anichart Clone Desktop](./images/anichart-clone-desktop.png)
<img src="./images/anichart-clone-mobile.PNG" data-canonical-src="./images/anichart-clone-mobile.PNG" width="200" />
<img src="./images/anichart-clone-mobile-spring.PNG" data-canonical-src="./images/anichart-clone-mobile-spring.PNG" width="200" />
<img src="./images/anichart-clone-mobile-winter.PNG" data-canonical-src="./images/anichart-clone-mobile-winter.PNG" width="200" />

## TODO:
- [ ] Look into caching using indexedDB for faster subsequent loads
- [x] Refactor the loading icon code
  - Maybe convert it into a class
- [x] Refactor code so its maintainability and speed improves
- [x] Add an NSFW banner over NSFW content (or hide it by default)

## BUGS:
- [ ] When you click on the navbar seasons quickly, the fetched anime will become duplicated.
  - For example, when clicking on "Winter 2020," you send a fetch request to the API. Then it tries to load that onto the dom but if you keep clicking it, it will duplicate the anime shown. This problem may stem from sending a fetch request and not canceling that request while asking for another.
- [x] Whenever a card doesn't have a long enough description, its width looks off compared to other cards
 - Solution: Try making a set width for cards on certain screens. (Through CSS)
 - Fixed the card width issue for single row cards. If more that 2 cards get displayed in a row, issue still persists.
- [x] Cards and navbar year doesn't load properly on mobile
      - Import and export statements aren't supported natively on all browsers so you have to use something like Babel to transpile JS code
- [x] Sometimes the type (TV/OVA) won't be formatted properly
 - Example: "OVA" is displayed as "Ova", "TV Short" is displayed as "Tv_short"

## EXTRA FEATURES:
- [ ] Add a light/dark theme you can click on
- [ ] Add a collapsable menu underneath the seasons where, once clicked, expands to display extra options such as NSFW filter, sorting, etc.
- [ ] Instead of displaying the type underneath the title, categorize them by type similar to anichart
- [ ] Add sorting functionality (sort by name, rank, avg. score, nsfw, etc.)
- [ ] Add a search funcionality (search by the name of the anime in english or romaji or both)
- [ ] Whenever a user clicks on a card, make a popup card with extra info instead of redirecting to the anilist site.
- [x] Add a loading icon indicating that the site is loading. Also, display the loading icon whenever you fetch for new anime.
- [x] Maybe add a NSFW filter so, if clicked, will show NSFW content. By default (unclicked) it won't show NSFW content.

# Installing onto your machine
1. Clone this repository
   - `git clone https://github.com/AlanConstantino/anichart-clone.git`
2. Install npm dependencies
   - `npm install --save-dev`
3. Run the build
   - `npm run build`
4. Optional: Have webpack watch for any changes
   - Go to "webpack.config.js" and add the following to module.exports: `watch: true`
     ```
     module.exports = {
        ...
        watch: true,
        ...
     }
     ```
