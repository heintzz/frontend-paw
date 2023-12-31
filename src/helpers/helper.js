import { listOfMonths } from "@/enums/date.enum";

export const convertNumberToCurrencyFormat = (number) => {
  const stringNumber = String(number);
  const isNegative = stringNumber.startsWith("-");
  const arrayOfStringNumber = stringNumber.split("");
  const reverseStringNumber = arrayOfStringNumber.reverse();
  const underThousand = reverseStringNumber.length < 3;

  if (isNegative) {
    reverseStringNumber.pop();
  }

  if (underThousand) {
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

  return isNegative ? "-" + currencyFormat : currencyFormat;
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = listOfMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
