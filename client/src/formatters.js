import moment from 'moment';
import numeral from 'numeral';

let formatCurrency = (value) => {
  return numeral(value).format('$0,0.00');
}

let formatDate = date => {
  return moment(date).format('MMMM DD, YYYY');
};

let formatMonth = (year, month) => {
  return moment(new Date(year, month - 1)).format('MMMM YYYY');
}

export {
  formatCurrency, formatDate, formatMonth
};
