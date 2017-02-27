import React, { PropTypes } from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

export default class HelloWorld extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { projects: [],
      colors: [] };
  }

  componentDidMount() {
    this.getTheProjects();
  }

  render() {
    return (
      <div>
        hi
      </div>
    );
  }
}
