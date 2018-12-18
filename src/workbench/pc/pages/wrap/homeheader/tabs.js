import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';

import { openWin, dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import { tabStyle } from './style.css';


@connect(
  mapStateToProps(
    'tabs',
    'activeCarrier',
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

  closeWin = (param) => {
    dispatchMessageTypeHandler({
      type: "closeWin",
      detail: param,
    });
  }

  render() {
    const { tabs, activeCarrier } = this.props;
    return (
      <div>
        <ul className={tabStyle}>
          {
            tabs.map(item => {
              return (
                <li key={item.id}
                  style={{ background: item.id === activeCarrier ? 'red' : '#888' }}
                >
                  <p onClick={() => { openWin(item) }}>{item.title}</p>
                  <div onClick={() => { this.closeWin(item) }}>
                    <Icon type="error3" />
                  </div>
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
