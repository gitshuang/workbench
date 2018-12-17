import React, { Component } from 'react';
import CreateTeamContent from './createTeam';

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { match: { params } } = this.props;
    return (
      <div>
        <CreateTeamContent />
      </div>
    );
  }
}

export default CreateTeam;
