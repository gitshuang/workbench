import React, { Component } from 'react';
import TeamconfigContent from './teamconfig';

class Teamconfig extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }


  render() {
    return (
      <div>
        <TeamconfigContent />
      </div>
    );
  }
}

export default Teamconfig;
