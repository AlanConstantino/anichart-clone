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

    // checks to see if item passed is valid (not equal to null or undefined)
    static valid(item) {
        return (item !== null) && (item !== undefined);
    }

    // returns the current season we are currently in
    static getCurrentSeason() {
        try {
            const month = new Date().getMonth();
            const winter = (month === 11) || (month === 0) || (month === 1);
            const spring = (month === 2)  || (month === 3) || (month === 4);
            const summer = (month === 5)  || (month === 6) || (month === 7);
            const fall =   (month === 8)  || (month === 9) || (month === 10);
            const noSeason = (!winter && !spring && !summer && !fall);

            if (winter) return this.SEASONS.WINTER;
            if (spring) return this.SEASONS.SPRING;
            if (summer) return this.SEASONS.SUMMER;
            if (fall)   return this.SEASONS.FALL;
            if (noSeason) throw 'Error: Couldn\'t get current season.'; 
        } catch (err) {
            console.log(err);
        }
    }

    // returns properly formated date to be displayed on card
    static formatDate(month, day, year) {
        let date = '';
        const valid = (item) => (item !== null) && (item !== undefined);

        if(valid(month)) date += month + ' ';
        if(valid(day))   date += day + ', ';
        if(valid(year))  date += year;

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