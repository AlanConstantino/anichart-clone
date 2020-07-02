import Util from './classes/util_class.js';

export const url = 'https://graphql.anilist.co';
export const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: {}
};
export const variables = {
    year: Util.getCurrentYear(),
    page: 1
};
export const query = `
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