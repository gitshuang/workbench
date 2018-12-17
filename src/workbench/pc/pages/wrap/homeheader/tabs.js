import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import { openWin } from 'public/regMessageTypeHandler';
import { tabStyle } from './style.css';


@connect(
  mapStateToProps(
    'tabs',
    'activeCarrier',
    'currItem',
  ),
  {

  },
)

class Tabmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() { }

  changeActive = (item) => {
    openWin(item);
  }


  render() {
    const { tabs, activeCarrier } = this.props;
    return (
      <div>
        <ul className={tabStyle}>
          {
            tabs.map((item, index) => {
              return (
                <li
                  key={item.id}
                  onClick={() => { this.changeActive(item) }}
                  style={{ background: item.id === activeCarrier ? 'red' : '#888' }}
                >
                  {item.title}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
export default Tabmenu;
