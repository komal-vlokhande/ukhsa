import React, {Component, useRef} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Navigate,
} from 'react-router-dom';
import  { getAuthenticationDetails } from '../../actions';
import { ValidateBackendResponse, validateDateOfBirth } from "./validation";
import { Button, Fieldset, ErrorSummary, DateInput } from "govuk-react-jsx";
import store from '../../../store'

const mapDispatchToProps = (dispatch: any) => ({
  getAuthenticationDetails: (reqData) => dispatch(getAuthenticationDetails(reqData))
})


const mapStateToProps = (state: any) => {
    return { authDetails: state.authReducer.authDetails, error: state.authReducer.error }
  };
  
  function isNotEmpty(obj) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
  }

class Authentication extends React.Component<any, any> {
  constructor(props) {
    var token = localStorage.getItem('token');
    if(token) {
      const origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); 
      window.location.href = origin + '/welcome'
    }
    super(props);
    this.state = {
      dob : {
              day: "", month: "", year: ""
            },
      isSubmitting: false,
      errors: [],
      errorMessage: '',
      errorList : [],
      access_token: window.location.pathname.split('/')
    };
  }

  handleDateFields = (e) => {
    const { name, value } = e.target;
    this.setState({dob: { ...this.state.dob, [name]: value }})
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ errorList: [] })
    this.setState({ errors: [] })
    this.setState({ errorMessage: '' })
    if (this.state.isSubmitting) return;
    const errorObj = {
      children: validateDateOfBirth(this.state.dob),
      href: '#'
    };
    if (errorObj.children != '') {
      this.state.errorList.push(errorObj);
      this.setState({ errors: this.state.errorList })
      this.setState({ errorMessage: errorObj })
    } else {
      const { year, month, day} = this.state.dob;
      const DOB =  moment(`${day}-${month}-${year}`, 'DD-MM-YYYY').format("DDMMYYYY");
      await this.props.getAuthenticationDetails({dob:DOB, urlToken: this.state.access_token[2]})
      let responseData = ValidateBackendResponse(this.props.authDetails);
      if(responseData.length > 0){
        this.setState({ errors : responseData[0].error.map( value => { return { children : value }})});
        this.setState( {errorMessage : { children : responseData[1].errorMessage }})
      } else {
        window.location.href = this.props.authDetails.redirectURL;
        localStorage.setItem('token', this.props.authDetails.authToken);
      }  
    }
  };

  render () {
    return(
      <>
      {this.state.errors && !!Object.keys(this.state.errors).length && (
      <ErrorSummary
          errorList={this.state.errors}
          titleChildren="There is a problem"
          
        />
      )}
      
      <form noValidate onSubmit={this.handleSubmit}>
        <Fieldset
          legend={{
            children: "What is your date of birth?",
            className: "govuk-fieldset__legend--l",
          }}
        />
        <DateInput
          errorMessage={this.state.errorMessage}
          onChange={(e) => {
            this.handleDateFields(e);
          }}
          hint={{
            children: "For example, 31 11 1980",
          }}
          id="dob"
          items={[
                  {
                    className: this.state.errorMessage
                    ? "govuk-input--width-2 govuk-input--error"
                    : "govuk-input--width-2",
                    name: "day",
                  },
                  {
                    className: this.state.errorMessage
                    ? "govuk-input--width-2 govuk-input--error"
                    : "govuk-input--width-2",
                    name: "month",
                  },
                  {
                    className: this.state.errorMessage
                    ? "govuk-input--width-4 govuk-input--error"
                    : "govuk-input--width-4",
                    name: "year",
                  },
                ]}
        />
        <Button disabled={this.state.isSubmitting}>Continue</Button>
      </form>
    </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)