import moment from 'moment';
import numeral from 'numeral';

let formatCurrency = (value) => {
  return numeral(value).format('$0,0.00');
}

let formatMonth = (year, month) => {
  return moment(new Date(year, month - 1)).format('MMMM YYYY');
}

export {
  formatCurrency, formatMonth
};
