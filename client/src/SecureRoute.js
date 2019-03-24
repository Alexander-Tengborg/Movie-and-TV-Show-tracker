import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

class SecureRoute extends Component {
  constructor(props) {
    super(props);
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/login')
    }
  }

  render() {
    return (
        <div>
            {this.props.auth.isAuthenticated && <Route {...this.props} />}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(withRouter(SecureRoute));
