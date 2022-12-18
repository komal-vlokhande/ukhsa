export const validateDateOfBirth: (value?: {
  year?: number | string;
  month?: number | string;
  day?: number | string;
}) => string | undefined = (value) => {
  let errors = [];
  if (value && value.year && value.month && value.day) {

    checkForNonNumericCharacters( value.year, value.month, value.day )

    const year = Number(value.year);
    const month = Number(value.month);
    const day = Number(value.day);

    const dob = new Date(year, month, day);
    if( dob < new Date() ){
      return 'Date of birth must be in the past'
    }
    else if (
      !(dob.getFullYear() > 1900 &&
        // and a real date resolves to the inputted date (e.g. month is not 13, not 29th February on a non leap year)
        dob.getFullYear() === year &&
        dob.getMonth() === month &&
        dob.getDate() === day)
    ) {
      return "Please input your date of birth in the correct format";
    }
  } else  {
     return 'Please enter your date of birth to proceed';
  }
};

export const checkForNonNumericCharacters = ( year, month, day ) => {
    if( year.replace(/\s+/g, '').match(/^\d+$/) && 
        month.replace(/\s+/g, '').match(/^\d+$/) &&
        day.replace(/\s+/g, '').match(/^\d+$/)){
          return 'Please input your date of birth in the correct format';
    }
}

export const ValidateBackendResponse = ( response ) => {

  if ( response.failureCode === 'INCORRECT' ) {
    return [{ error: ['Your date of birth doesn’t match our records'] }, { errorMessage : 'Please enter your correct date of birth'}]
  } else if ( response.failureCode === 'TIMEOUT' ) {
    return [{error: [ 'You have reached the maximum number of attemps', 'Please try again'] }, { errorMessage : 'Maximum attempts reached'}]
  } else {
    return [];
  }
}

