import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { auth } from '../../store/auth/models/auth';
import { AppState } from '../../store/rootStore';
import { AppActions } from '../../store/models/actions';
import { getAuthenticationDetails } from '../../store/auth/authAction';

interface Props {} 

interface LinkStateProps {
    authDetails: auth;
  }

  interface LinkDispatchProps {
    getAuthenticationDetails: () => void;
  }
  
  type LinkProps = Props & LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
    authDetails: state.authReducer.auth,
  });

  const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
  ) => ({
    getAuthenticationDetails: bindActionCreators(getAuthenticationDetails, dispatch),
  });

  class Authentication extends Component<LinkProps> {
    componentDidMount() {
      debugger;
      //send req data to getAuthenticationDetails
      this.props.getAuthenticationDetails();
    }
    render() {
        const { authDetails } = this.props;
        console.log(authDetails)
    return(
        <div>
            Authentications
        </div>
    )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
