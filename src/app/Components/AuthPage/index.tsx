import React, { useState } from "react";
import { Button, Fieldset, ErrorSummary, DateInput } from "govuk-react-jsx";
import { validateDateOfBirth } from "./helperfunctions";

export const AuthPage: React.FC = () => {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [backendResult, setBackendResult] = useState(false);

  const handleDateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDob({ ...dob, [name]: value });
    console.log(dob);
  };
  const renderErrorSummary = () => {
    const errorList = [];
    if (errorMessage) {
      if (backendResult === "incorrect") {
        errorList.push({
          children: "The data you entered doesn't match our records",
          href: "#",
        });
      } else if (backendResult === "timeout") {
        errorList.push({
          children: "You have reached the maximum amount of attempts",
          href: "#",
        });
        errorList.push({
          children: "Please try again in 15 minutes",
          href: "#",
        });
      } else {
        errorList.push({
          children: errorMessage,
          href: "#",
        });
      }
    }
    if (errorList.length === 0) {
      return null;
    }
    return (
      <ErrorSummary errorList={errorList} titleChildren="There is a problem" />
    );
  };
  const sendToBackend = (validatedDate: string): string => {
    //simulating backend messages
    return;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = Object.values(dob).every((val) => val === "");
    if (!dob.day || !dob.month || !dob.year) {
      console.log("empty field");
      setErrorMessage("Empty field, please input a date");
      return;
    }

    const validatedDate = validateDateOfBirth(dob);
    if (!validatedDate) {
      setErrorMessage("Please enter a date in the correct format");
      return;
    }
    setErrorMessage("");
    const result = sendToBackend(validatedDate);
    setBackendResult(result);
    if (result === "timeout") {
      setErrorMessage("Maximum attempts reached");
    } else if (result === "incorrect") {
      setErrorMessage("Please enter correct date of birth");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      {errorMessage ? renderErrorSummary() : null}
      <Fieldset
        legend={{
          children: "What is your date of birth?",
          className: "govuk-fieldset__legend--l",
        }}
      />
      <div>Hello</div>
      <DateInput
        onChange={handleDateFields}
        errorMessage={errorMessage ? { children: errorMessage } : null}
        hint={{
          children: "For example, 31 11 1980",
        }}
        id={errorMessage ? "dob-error" : "dob"}
        items={[
          {
            className: errorMessage
              ? "govuk-input--width-2 govuk-input--error"
              : "govuk-input-width-2",
            name: "day",
          },
          {
            className: errorMessage
              ? "govuk-input--width-2 govuk-input--error"
              : "govuk-input-width-2",
            name: "month",
          },
          {
            className: errorMessage
              ? "govuk-input--width-4 govuk-input--error"
              : "govuk-input-width-4",
            name: "year",
          },
        ]}
      />
      <Button>Continue</Button>
    </form>
  );
};
