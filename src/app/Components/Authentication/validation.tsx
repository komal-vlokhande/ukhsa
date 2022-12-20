import moment from 'moment';
export const validateDateOfBirth: (value?: {
  year?: number | string;
  month?: number | string;
  day?: number | string;
}) => string | undefined = (value) => {
  let errors = [];
  if (value && value.year && value.month && value.day) {
    
    const userDOB =  moment(`${value.month}-${value.day}-${value.year}`, "MM-DD-YYYY");
    const DOBDate = userDOB.toDate();
    
    if( DOBDate > new Date() ){
      return 'Date of birth must be in the past'
    } else if ( userDOB.year() > 1900 && userDOB.isValid() && !checkForNonNumericCharacters(value)) {
      return '';
    }else {
      return 'Please input your date of birth in the correct format'
    }
  } else  {
     return 'Please enter your date of birth to proceed';
  }
};

export const checkForNonNumericCharacters = ( value ) => {
  let regExp = /[a-zA-Z]/g
  if( (value.year.replace(/\s+/g, '').match(/^\d+$/) && regExp.test(value.year)) &&
      (value.month.replace(/\s+/g, '').match(/^\d+$/) && regExp.test(value.month)) &&
      (value.day.replace(/\s+/g, '').match(/^\d+$/) && regExp.test(value.day))
    )
  {
    return false;
  } else {
    return true;
  }
};

export const ValidateBackendResponse = ( response ) => {
  if ( response.failureCode === 'INCORRECT' ) {
    return [{ error: ['Your date of birth doesn’t match our records'] }, { errorMessage : 'Please enter your correct date of birth'}]
  } else if ( response.failureCode === 'TIMEOUT' ) {
    return [{error: [ 'You have reached the maximum number of attemps', 'Please try again'] }, { errorMessage : 'Maximum attempts reached'}]
  } else {
    return [];
  }
};
