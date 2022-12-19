import React from "react";
import { Button, Fieldset, ErrorSummary, DateInput } from "govuk-react-jsx";
import { validateDateOfBirth } from "./helperfunctions";

export class AuthPage extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dob: { day: "", month: "", year: "" },
      errorMessage: "",
      backendResult: false,
    };
  }

  handleDateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ dob: { ...this.state.dob, [name]: value } });
  };
  renderErrorSummary = () => {
    const errorList = [];
    if (this.state.errorMessage) {
      if (this.state.backendResult === "incorrect") {
        errorList.push({
          children: "The data you entered doesn't match our records",
          href: "#",
        });
      } else if (this.state.backendResult === "timeout") {
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
          children: this.state.errorMessage,
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
  sendToBackend = (validatedDate: string): string => {
    //simulating backend messages
    return;
  };
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { dob } = this.state;
    if (!dob.day || !dob.month || !dob.year) {
      this.setState({ errorMessage: "Empty field, please input a date" });
      return;
    }

    const validatedDate = validateDateOfBirth(dob);
    if (!validatedDate) {
      this.setState({
        errorMessage: "Please enter a date in the correct format",
      });
      return;
    }
    this.setState({ errorMessage: "" });
    const result = this.sendToBackend(validatedDate);
    this.setState({ backendResult: result });
    if (result === "timeout") {
      this.setState({ errorMessage: "Maximum attempts reached" });
    } else if (result === "incorrect") {
      this.setState({ errorMessage: "Please enter correct date of birth" });
    } else {
      this.setState({ errorMessage: "" });
    }
  };
  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        {this.state.errorMessage ? this.renderErrorSummary() : null}
        <Fieldset
          legend={{
            children: "What is your date of birth?",
            className: "govuk-fieldset__legend--l",
          }}
        />
        <DateInput
          onChange={this.handleDateFields}
          errorMessage={
            this.state.errorMessage
              ? { children: this.state.errorMessage }
              : null
          }
          hint={{
            children: "For example, 31 11 1980",
          }}
          id={this.state.errorMessage ? "dob-error" : "dob"}
          items={[
            {
              className: this.state.errorMessage
                ? "govuk-input--width-2 govuk-input--error"
                : "govuk-input-width-2",
              name: "day",
            },
            {
              className: this.state.errorMessage
                ? "govuk-input--width-2 govuk-input--error"
                : "govuk-input-width-2",
              name: "month",
            },
            {
              className: this.state.errorMessage
                ? "govuk-input--width-4 govuk-input--error"
                : "govuk-input-width-4",
              name: "year",
            },
          ]}
        />
        <Button>Continue</Button>
      </form>
    );
  }
}
