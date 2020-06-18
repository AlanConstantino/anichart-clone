// This class is not meant to be instatiated.
export default class Util {
    static SEASONS = {
        SPRING: "SPRING",
        SUMMER: "SUMMER",
        FALL: "FALL",
        WINTER: "WINTER"
    };

    static months = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    };

    // returns the current season we are currently in
    static getCurrentSeason() {
        try {
            const month = new Date().getMonth();

            switch (month) {
                case 11: // december
                case 0: // january
                case 1: // february
                    return this.SEASONS.WINTER;
                case 2: // march
                case 3: // april
                case 4: // may
                    return this.SEASONS.SPRING;
                case 5: // june
                case 6: // july
                case 7: // august
                    return this.SEASONS.SUMMER;
                case 8: // september
                case 9: // october
                case 10: // november
                    return this.SEASONS.FALL;
                default:
                    throw 'Error: Couldn\'t get current season.';
            }
        } catch (err) {
            console.log(err);
        }
    }

    // returns properly formated date to be displayed on card
    static formatDate(month, day, year) {
        let date = '';
        if (month !== null && month !== undefined) {
            date += month + ' ';
        }

        if (day !== null && day !== undefined) {
            date += day + ', ';
        }

        if (year !== null && year !== undefined) {
            date += year;
        }

        return date;
    }

    static getCurrentYear() {
        return new Date().getFullYear();
    }

    // sets the current year to the navbar
    static setSeasonYearNavbar(currentYear) {
        const navbarElements = [...document.getElementsByClassName('season-year')];
        navbarElements.forEach(element => element.innerText = currentYear);
    }
}