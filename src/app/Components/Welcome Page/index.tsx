import * as React from "react";
import { Button } from "govuk-react-jsx";
export class WelcomePage extends React.Component {
  render(): JSX.Element {
    return (
      <>
        <div className="govuk-width-container">
          <main className="govuk-main-wrapper govuk-main-wrapper--l">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <h1 className="govuk-heading-xl">Welcome to the form</h1>
                <p className="govuk-body-m">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </p>
              </div>
            </div>

            <Button isStartButton disabled>
              Start now
            </Button>
          </main>
        </div>
      </>
    );
  }
}
