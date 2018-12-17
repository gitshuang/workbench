import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import EstablishContent from 'containers/establishContent';
import { wrap } from './index.css';

@withRouter
class Establish extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
  };
  static defaultProps = {
    history: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      icons: []
    };
  }

  componentWillMount() {

  }


  render() {
    return (
      <div className={` ${wrap}`} >
          <EstablishContent type="init" />
      </div>
    );
  }
}

export default Establish;
