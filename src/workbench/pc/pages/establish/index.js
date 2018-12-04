import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'components/header';
import EstablishContent from 'containers/establishContent';
// import Personals from 'pages/home/personal';
import logoUrl from 'assets/image/logo.svg';
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
    // const iconname = <Personals icons={this.state.icons} />;
    return (
      <div className={` ${wrap}`} >
        {/* <div className="" style={{ background: 'white', position: 'relative' }}>
          <Header iconName={iconname}>
            <img alt="" src={logoUrl} style={{ width: '86px' }} />
          </Header>
        </div> */}
        <div className="">
          <EstablishContent type="init" />
        </div>
      </div>
    );
  }
}

export default Establish;
