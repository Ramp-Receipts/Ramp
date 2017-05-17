let getPdfLink = (customer, year, month) => {
  // TODO: We would need to get some kind of unique UUID or hash
  // that can identify the customer - i.e. from a DB field
  // let customerId = fetchDbData(customer).uniqueHash;
  let customerId = '01234567-0123-0123-0123-012345678901';

  return `http://localhost:3010/receipts/pdf/${customerId}/${year}/${month}`;
};

export { getPdfLink };
