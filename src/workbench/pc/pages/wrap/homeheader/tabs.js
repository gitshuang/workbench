import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';

import { openWin, dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import Pulldown from './pulldown';
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
      width: 0,

    };
    this.pullW = 30;
  }

  componentWillMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentDidMount() {
    this.resizeHandler();
  }

  componentWillReceiveProps({ tabs: nextTabs }) {
    const { tabs: oldTabs } = this.props;
    if (oldTabs.length !== nextTabs.length) {
      const areaWidth = this.tabsArea.clientWidth;
      this.setState({
        width: areaWidth,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    this.setState({
      width: this.tabsArea.clientWidth,
    });
  }

  closeWin = (param) => {
    dispatchMessageTypeHandler({
      type: "closeWin",
      detail: param,
    });
  }

  getTabsAndMores = (totalTabs, areaWidth) => {
    let mores = [];
    let tabs = [];
    const maxTabsNum = Math.floor((areaWidth - this.pullW) / 120);
    if (totalTabs.length > maxTabsNum) {
      tabs = totalTabs.filter((item,index)=> {
        return index < maxTabsNum;
      }); 
      mores = totalTabs.filter((item,index)=> {
        return index >= maxTabsNum;
      }); 
    }else{
      tabs = totalTabs;
    }
    return {
      tabs,
      mores,
    }
  }

  render() {
    const { tabs: totalTabs, activeCarrier } = this.props;
    const { width } = this.state;
    const { tabs, mores } = this.getTabsAndMores(totalTabs, width);
    return (
      <div className={tab} ref={(c) => { this.tabsArea = c; }}>
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
        <Pulldown width={this.pullW} items={mores} closeWin={this.closeWin}/>
      </div>
    );
  }
}
export default Tabmenu;
