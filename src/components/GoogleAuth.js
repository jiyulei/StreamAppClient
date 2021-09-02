import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/index";

class GoogleAuth extends React.Component {
  componentDidMount() {
    // load up client library from google api
    // callback function will be called only after this lib download js code
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          // returns a promise
          clientId:
            "360612958704-4f6jdncmjl1h2hbggknpssi2fl7cvpie.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId());
    } else {
        this.props.signOut(this.auth.currentUser.get().getId());
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
