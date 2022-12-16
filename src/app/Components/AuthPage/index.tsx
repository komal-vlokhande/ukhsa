import React, { useState } from "react";
import { Button, Fieldset, ErrorSummary, DateInput } from "govuk-react-jsx";
const dobObjToString = ({
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
const backendResponse = [
  //CORRECT SCENARIO
  { failureCode: null, timeOutExpiry: null },
  //LOCKED OUT  ON 3 ATTEMPT
  { failureCode: "TIMEOUT", timeOutExpiry: "2022-12-12T15:35:08.162Z" },
  //UP TO THREE
  { failureCode: "INCORRECT", timeOutExpiry: null },
];
export const AuthPage: React.FC = () => {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [isCorrect, setIsCorrect] = useState("");
  const [isValid, setIsValid] = useState("");
  const [isEmpty, setIsEmpty] = useState("");
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const [validationAttempts, setValidationAttempts] = useState(0);
  console.log(isValid, isEmpty, isCorrect);
  const correctDate = "01012000";
  const handleDateFields = (e) => {
    const { name, value } = e.target;
    setDob({ ...dob, [name]: value });
    console.log(dob);
  };
  const validateDateOfBirth = (value) => {
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
        console.log("date is valid");
        // return undefined;
        console.log(value);
        return undefined;
      }
    }
    console.log(value);
    // console.log(typeof dob);
    // console.log(value.length);
    console.log("there is an error");
    return "error";
  };
  const checkIfCorrect = () => {
    console.log(dobObjToString(dob));
    console.log(correctDate);
    if (dobObjToString(dob) === correctDate) {
      console.log("its a match!");
      setIsCorrect(true);
    } else {
      console.log("its not a match!");
      setIsCorrect(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDob(dob);
    const validationresult = validateDateOfBirth(dob);
    const isEmpty = Object.values(dob).every((val) => val === "");
    if (validationresult === undefined) {
      if (isValid) {
        setValidationAttempts(validationAttempts + 1);
      } else {
        setIsValid(true);
        setValidationAttempts(validationAttempts + 1);
      }
    } else {
      setIsValid(false);
    }
    setSubmissionAttempts(submissionAttempts + 1);
    if (isEmpty) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    console.log({ isValid });
    console.log({ validationresult });
    console.log({ dob });
    console.log({ isEmpty });
    console.log(dobObjToString(dob));
    checkIfCorrect();
  };

  return (
    <>
      {/* <div>
        date is: {dob.day}/{dob.month}/{dob.year}.{" "}
        {isValid === true ? "validation is true" : "validation failed"}. {""}
        submission attempts so far: {submissionAttempts}.{""}
        <br />
        valid submissions attempts so far: {validationAttempts}
      </div> */}

      <ErrorSummary
        errorList={
          (isCorrect !== "" &&
            !isCorrect &&
            isValid &&
            !isEmpty && [
              {
                children: "Please enter your correct date of birth",
                href: "#example-error-1",
              },
            ]) ||
          (isEmpty !== "" &&
            isEmpty && [
              {
                children: "Please enter your date of birth to proceed",
                href: "#example-error-1",
              },
            ]) ||
          (isValid !== "" &&
            !isValid &&
            !isEmpty && [
              {
                children:
                  "Please input your date of birth in the correct format",
                href: "#example-error-1",
              },
            ])
        }
        titleChildren="There is a problem"
      />

      <form noValidate onSubmit={handleSubmit}>
        <DateInput
          onChange={(e) => {
            handleDateFields(e);
          }}
          errorMessage={
            (isEmpty !== "" &&
              isEmpty && {
                children: "Please enter your date of birth to proceed",
              }) ||
            (isValid !== "" &&
              !isValid &&
              !isEmpty && {
                children:
                  "Please input your date of birth in the correct format",
              }) ||
            (isCorrect !== "" &&
              !isCorrect &&
              isValid &&
              !isEmpty && {
                children: "Please enter your correct date of birth",
              })
          }
          fieldset={{
            legend: {
              children: "What is your date of birth?",
            },
          }}
          hint={{
            children: "For example, 31 3 1980",
          }}
          id={!isValid && validationAttempts < 3 ? "dob" : "dob-error"}
          items={
            !isValid && validationAttempts < 3
              ? [
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
                ]
              : [
                  {
                    className: "govuk-input--width-2 govuk-input--error",
                    name: "day",
                  },
                  {
                    className: "govuk-input--width-2 govuk-input--error",
                    name: "month",
                  },
                  {
                    className: "govuk-input--width-4 govuk-input--error",
                    name: "year",
                  },
                ]
          }
        />
        <Button>Continue</Button>
      </form>
    </>
  );
};
