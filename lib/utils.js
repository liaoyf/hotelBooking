
const format = e =>  `${e >= 0 && e < 10 ? '0' : ''}${e}`;
const getNextMonth = date => {
  const month = date.getMonth() + 1;
  date = new Date(date);
  date.setMonth(month);
  return date;
};
const equalWithYearMonthDate = (d1, d2) => {
  if (null == d1 || null == d2) {
    return false;
  }
  if (d1.getFullYear() !== d2.getFullYear()) {
    return false;
  }
  if (d1.getMonth() !== d2.getMonth()) {
    return false;
  }
  return d1.getDate() == d2.getDate();
}

export default {
  format: format,
  getNextMonth: getNextMonth,
  equalWithYearMonthDate: equalWithYearMonthDate,
};