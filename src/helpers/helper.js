export const convertNumberToCurrencyFormat = (number) => {
  const stringNumber = String(number);
  const arrayOfStringNumber = stringNumber.split("");
  const reverseStringNumber = arrayOfStringNumber.reverse();

  if (reverseStringNumber.length < 3) {
    return reverseStringNumber;
  }

  const reversedArray = reverseStringNumber.map((num, index) => {
    const thousandMultiplier = (index + 1) % 3 === 0;
    const lastNumber = index === reverseStringNumber.length - 1;

    if (thousandMultiplier && !lastNumber) {
      return "." + num;
    }

    return num;
  });

  const formattedArray = reversedArray.reverse();
  const currencyFormat = formattedArray.join("");

  return currencyFormat;
};