# [anichart-clone](https://anime.alanconstantino.com/)
I utilized JavaScript, HTML, CSS, and AniList's GraphQL API to create a website similar to [AniChart](https://anichart.net/).

You can visit the website [here](https://anime.alanconstantino.com/).

## TODO:
- [ ] Look into caching using indexedDB for faster subsequent loads
- [x] Refactor code so its maintainability and speed improves
- [x] Add an NSFW banner over NSFW content (or hide it by default)

## BUGS:
- [x] Whenever a card doesn't have a long enough description, its width looks off compared to other cards
 - Solution: Try making a set width for cards on certain screens. (Through CSS)
 - Fixed the card width issue for single row cards. If more that 2 cards get displayed in a row, issue still persists.
- [x] Cards and navbar year doesn't load properly on mobile
      - Import and export statements aren't supported natively on all browsers so you have to use something like Babel to transpile JS code
- [x] Sometimes the type (TV/OVA) won't be formatted properly
 - Example: "OVA" is displayed as "Ova", "TV Short" is displayed as "Tv_short"

## EXTRA FEATURES:
- [ ] Add a light/dark theme you can click on
- [ ] Instead of displaying the type underneath the title, categorize them by type similar to anichart
- [ ] Add sorting functionality (sort by name, rank, avg. score, nsfw, etc.)
- [ ] Add a search funcionality (search by the name of the anime in english or romaji or both)
- [ ] Whenever a user clicks on a card, make a popup card with extra info instead of redirecting to the anilist site.
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