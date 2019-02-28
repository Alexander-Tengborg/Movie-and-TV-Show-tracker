import React, { Component } from 'react';
//CHANGE CLASSNAME

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <h1>Could not find a page with that URL!</h1>
    );
  }
}

export default NotFound;
