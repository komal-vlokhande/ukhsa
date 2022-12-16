import React, {Component} from 'react';
import { connect } from 'react-redux';

import  { getAuthenticationDetails } from '../../actions';

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
            Authentication
            <button onClick={this.props.getAuthenticationDetails}>Test redux action</button>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)