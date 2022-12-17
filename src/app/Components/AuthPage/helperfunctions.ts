export const validateDateOfBirth = (value:{year:string; month:string; day:string}):string|undefined => {
    if (value && value.year && value.month && value.day) {
      const year = Number(value.year);
      const month = Number(value.month) - 1;
      const day = Number(value.day);
      const testDate = new Date(year, month, day);
      if (
        // Check date is in the past
        testDate < new Date() &&
        // Is after 1900
        testDate.getFullYear() > 1900 &&
        // and a real date resolves to the inputted date (e.g. month is not 13, not 29th February on a non leap year)
        testDate.getFullYear() === year &&
        testDate.getMonth() === month &&
        testDate.getDate() === day
      ) {
        return dobObjToString(value)
      }
    }

    return undefined;
  };
  export  const dobObjToString = ({
    year,
    month,
    day,
  }: {
    year?: string;
    month?: string;
    day?: string;
  }) =>
    `${day ? day.padStart(2, "0") : ""}${
      month ? month.padStart(2, "0") : ""
    }${year || ""}`;