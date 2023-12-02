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
  return (
    <select
      value={value}
      className="select select-bordered w-fit max-w-xs"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <option value="2023">2023</option>
      <option value="2022">2022</option>
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
