const moment = require('moment');
export function relativeDateTime (date) {
    const _date = new Date(date);
    return moment(date).calendar();
}
