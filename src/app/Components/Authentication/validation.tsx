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
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  console.log(regExp.test(value.year) || (specialChars.test(value.year)))

  if( regExp.test(value.year) || (specialChars.test(value.year)) ||
      regExp.test(value.month) || (specialChars.test(value.month)) ||
      regExp.test(value.day) || (specialChars.test(value.day)))
  {
    return true;
  } else {
    return false;
  }
};

export const ValidateBackendResponse = ( response ) => {
  if (response.error) {
    return [{ error: ['Something went wrong'] }, { errorMessage : ''}]
  } else if(response.failureCode != null) {
    if ( response.failureCode === 'INCORRECT' ) {
      return [{ error: ['Your date of birth doesn’t match our records'] }, { errorMessage : 'Please enter your correct date of birth'}]
    } else if ( response.failureCode === 'TIMEOUT' ) {
      return [{error: [ 'You have reached the maximum number of attemps', 'Please try again in 15 minutes'] }, { errorMessage : 'Maximum attempts reached'}]
    } 
  } else {
    return [];
  }
 
};
