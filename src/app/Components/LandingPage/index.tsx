import * as React from "react";
import { Button } from "govuk-react-jsx";
export class LandingPage extends React.Component {
  constructor (props){
    var token = localStorage.getItem('token');
    if(!token) {
      const origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); 
      window.location.href = origin + '/auth';
    }
    super(props);
  }
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
            <Button disabled>
              Start now
            </Button>
          </main>
        </div>
      </>
    );
  }
}