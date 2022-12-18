import React, {Component, useRef} from 'react';
import { connect } from 'react-redux';
import  { getAuthenticationDetails } from '../../actions';
import { Button, Fieldset, ErrorSummary, DateInput } from "govuk-react-jsx";

const mapDispatchToProps = (dispatch: any) => ({
  getAuthenticationDetails: ({}) => dispatch(getAuthenticationDetails({}))
})

const mapStateToProps = (state: any) => ({
    ...state
  });

class Authentication extends Component<any, any> {

  render () {
    return(
        <div>
            <DateInput
              errorMessage={{
                children: 'Error message goes here'
              }}
              fieldset={{
                legend: {
                  children: 'What is your date of birth?'
                }
              }}
              hint={{
                children: 'For example, 31 3 1980'
              }}
              id="dob-errors"
              items={[
                {
                  className: 'govuk-input--width-2 govuk-input--error',
                  name: 'day'
                },
                {
                  className: 'govuk-input--width-2 govuk-input--error',
                  name: 'month'
                },
                {
                  className: 'govuk-input--width-4 govuk-input--error',
                  name: 'year'
                }
              ]}
            />
            <Button>Continue</Button>

            <button onClick={this.props.getAuthenticationDetails}>Test redux action</button>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)