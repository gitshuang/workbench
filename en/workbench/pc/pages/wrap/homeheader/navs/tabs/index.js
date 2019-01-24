import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import wrapActions from 'store/root/wrap/actions';
import Pulldown from './pulldown';
import { tab, active, first } from './style.css';

const { showTabs } = wrapActions;
@connect(
  mapStateToProps(
    'tabs',
    'activeCarrier',
    {
      namespace: 'wrap',
    }
  ),
  {
    showTabs,
  },
)

class Tabmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,

    };
    this.pullW = 36;
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
    const maxTabsNum = Math.floor((areaWidth - this.pullW) / 154);
    if (totalTabs.length > maxTabsNum) {
      tabs = totalTabs.filter((item, index) => {
        return index < maxTabsNum;
      });
      mores = totalTabs.filter((item, index) => {
        return index >= maxTabsNum;
      });
    } else {
      tabs = totalTabs;
    }
    return {
      tabs,
      mores,
      maxTabsNum
    }
  }

  render() {
    const { tabs: totalTabs, activeCarrier, showTabs } = this.props;
    const { width } = this.state;
    const { maxTabsNum, tabs, mores } = this.getTabsAndMores(totalTabs, width);
    return (
      <div className={tab} ref={(c) => { this.tabsArea = c; }}>
        <ul>
          {
            tabs.map((item,index) => {
              return (
                <li key={`${item.id}`}
                  className={`${item.id === activeCarrier ? active : ''} ${activeCarrier == 'home' && index==0 ? first : ''}`}
                >
                  <p onClick={() => { showTabs(item) }} title={item.title}>{item.title}</p>
                  <div onClick={() => { this.closeWin(item) }}>
                    <Icon type="error3" />
                  </div>
                </li>
              )
            })
          }
        </ul>
        <Pulldown width={this.pullW} items={mores} closeWin={this.closeWin} />
      </div>
    );
  }
}
export default Tabmenu;
