import { indexToMonth } from "@/enums/date.enum";

export const SelectInterval = ({ value, setValue }) => {
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
  );
};

export const SelectMonth = ({ value, setValue }) => {
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      {Object.keys(indexToMonth).map((index) => {
        return (
          <option value={index} key={index}>
            {indexToMonth[index]}
          </option>
        );
      })}
    </select>
  );
};

export const SelectYear = ({ value, setValue }) => {
  const thisYear = new Date().getFullYear();

  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <option key={i} value={`${thisYear - i}`}>
            {thisYear - i}
          </option>
        );
      })}
    </select>
  );
};

export const SelectKind = ({ value, setValue }) => {
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <option value="all">All</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  );
};
