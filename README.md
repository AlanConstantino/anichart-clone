# [anichart-clone](https://anime.alanconstantino.com/)
I utilized JavaScript, HTML, CSS, and AniList's GraphQL API to create a website similar to [AniChart](https://anichart.net/).

You can visit the website [here](https://anime.alanconstantino.com/).

## TODO:
- [x] Refactor code so its maintainability and speed improves
- [ ] Look into caching using indexedDB for faster subsequent loads
- [ ] Add an NSFW banner over NSFW content (or hide it by default)

## BUGS:
- [ ] Cards and navbar year doesn't load properly on mobile
- [ ] Whenever a card doesn't have a long enough description, its width looks off compared to other cards
 - Solution: Try making a set width for cards on certain screens. (Through CSS)
 - Fixed the card width issue for single row cards. If more that 2 cards get displayed in a row, issue still persists.
- [x] Sometimes the type (TV/OVA) won't be formatted properly
 - Example: "OVA" is displayed as "Ova", "TV Short" is displayed as "Tv_short"

## EXTRA FEATURES:
- [ ] Add a light/dark theme you can click on
- [ ] Instead of displaying the type underneath the title, categorize them by type similar to anichart
- [ ] Add sorting functionality (sort by name, rank, avg. score, nsfw, etc.)
- [x] Maybe add a NSFW filter so, if clicked, will show NSFW content. By default (unclicked) it doesn't show NSFW content.
- [ ] Add a search funcionality (search by the name of the anime in english or romaji or both)
- [ ] Whenever a user clicks on a card, make a popup card with extra info instead of redirecting to the anilist site.
