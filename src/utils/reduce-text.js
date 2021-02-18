const reduceText = (text) => {
  // eslint-disable-line consistent-return
  if (text.length <= 100) {
    return text;
  }
  for (let i = 100; i > 0; i--) {
    if (
      text.charAt(i) === ' ' &&
      (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')
    ) {
      return `${text.substring(0, i)}...`;
    }
  }
};

export default reduceText;
