import _ from "underscore";
import moment from "moment";

export const DATE_FORMAT =  'DD/MM/YYYY';

export function getNumericalRangeFromDates (startDate, endDate) {
    const monthsBetween = moment(endDate, DATE_FORMAT).diff(moment(startDate, DATE_FORMAT), 'M');
    return _.range(0, monthsBetween); 
}

export function getMonthsDifference(date1, date2) {
    return moment(date1, DATE_FORMAT).diff(moment(date2, DATE_FORMAT), 'M');
}