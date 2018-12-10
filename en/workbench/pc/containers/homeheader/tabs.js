import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import Actions from 'store/root/actions';
const { changeActive } = Actions;
import { tabStyle } from './style.css';


@connect(
  mapStateToProps(
    'tabs',
    'activeCarrier',
  ),
  {
    changeActive
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
    const { changeActive } = this.props;
    changeActive(item.id);
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
