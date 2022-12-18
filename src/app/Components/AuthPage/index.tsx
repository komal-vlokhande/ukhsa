import React, { useState, useCallback  } from "react";
import { useParams } from 'react-router-dom';
import { ValidateBackendResponse, validateDateOfBirth } from "./validation";
import { useNavigate } from "react-router-dom";
import { Button, Fieldset, ErrorSummary, ErrorMessage, DateInput } from "govuk-react-jsx";


function isNotEmpty(obj) {
  return Object.keys(obj).some((key) => obj[key]?.length > 0);
}


export const AuthPage: React.FC = () => {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const errorList = [];
  const navigate = useNavigate();
  // const { token } = useParams();


  const handleDateFields = (e) => {
    const { name, value } = e.target;
    setDob({ ...dob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(validateDateOfBirth(dob))
    if (isSubmitting) return;

    const errorObj = {
      children: validateDateOfBirth(dob),
    };

    console.log(errorObj)
    if (isNotEmpty(errorObj)) {
      errorList.push(errorObj)
      setErrors(errorList);
      setErrorMessage(errorObj)
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        // simulate async submission
        setErrors(null);
        setErrorMessage(null)
        setHasSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <>
      {errors && !!Object.keys(errors).length && (
      <ErrorSummary
          errorList={errors}
          titleChildren="There is a problem"
        />
      )}
      <form noValidate onSubmit={handleSubmit}>
        <Fieldset
          legend={{
            children: "What is your date of birth?",
            className: "govuk-fieldset__legend--l",
          }}
        />
        <DateInput
          errorMessage={errorMessage}
          onChange={(e) => {
            handleDateFields(e);
          }}
          hint={{
            children: "For example, 31 11 1980",
          }}
          id="dob"
          items={[
                  {
                    className: "govuk-input--width-2",
                    name: "day",
                  },
                  {
                    className: "govuk-input--width-2",
                    name: "month",
                  },
                  {
                    className: "govuk-input--width-4",
                    name: "year",
                  },
                ]}
        />
        <Button disabled={isSubmitting}>Continue</Button>
      </form>
    </>
  );
};


// let responseDataDummy  = { "failureCode": 'INCORRECT', "timeoutExpiry": null, redirectURL:'http://localhost:8080/welcome', authToken:'765478935hgjdsbchjds' }
// let responseData = ValidateBackendResponse(responseDataDummy);
// responseData =[]
// if ( responseData.length  > 0 ){
//   setErrors( responseData[0].error.map( value => { return { children : value }}));
//   setErrorMessage({ children : responseData[1].errorMessage })
// } else {
//   // console.log(token)
//   navigate("/welcome");
// }