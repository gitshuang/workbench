import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';

import { openWin, dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import { tab, active } from './style.css';


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
      <div className={tab}>
        <ul>
          {
            tabs.map(item => {
              return (
                <li key={item.id}
                  className={item.id === activeCarrier ? active : ''}
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
