import React, { Component } from 'react';
import cs from 'classnames';
import { connect } from 'react-redux';
import actions from 'store/root/work/actions';
import Icon from 'bee-icon';
import { mapStateToProps } from '@u';
import {
  moreList,
  more,
  active,
  moreName,
  moreDelBtn,
  moreArea,
  moreBtn,
  tabsArea,
  tabsList,
  tab,
  tabName,
  tabDelBtn,
  moreBtnArrow
} from './style.css';

const {
  setCurrent,
  delTab,
} = actions;

const tabWidth = 160;
const tabMargin = 1;
const moreBtnWidth = 19;
const getTabsAndMores = (totalTabs, areaWidth) => {
  let mores = [];
  let tabs = totalTabs;
  const maxTabsNum = Math.floor((areaWidth - moreBtnWidth)/(tabWidth + tabMargin));
  if (totalTabs.length > maxTabsNum) {
    tabs = totalTabs.slice(0, maxTabsNum);
    mores = totalTabs.slice(maxTabsNum);
  }
  return {
    tabs,
    mores,
  }
}

@connect(
  mapStateToProps(
    'current',
    'tabs',
    {
      namespace: 'work',
    },
  ),
  {
    setCurrent,
    delTab,
  }
)
class TabsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreIsShow: false,
      width: window.document.documentElement.clientWidth,
    };
    this.timer = 0;
    this.resizeHandler = this.resizeHandler.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    window.addEventListener('resize', this.resizeHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }
  componentDidMount() {
    this.resizeHandler();
  }
  componentWillReceiveProps({ tabs: nextTabs }) {
    const { tabs: oldTabs } = this.props;
    if (oldTabs.length !== nextTabs.length) {
      const areaWidth = this.refs.tabsArea.clientWidth;
      const { moreIsShow } = this.state;
      const { mores } = getTabsAndMores(nextTabs, areaWidth);
      this.setState({
        width: areaWidth,
        moreIsShow: !mores.length && moreIsShow ? false : moreIsShow,
      });
    }
  }
  select(id) {
    const { setCurrent } = this.props;
    setCurrent(id);
  }
  del(id) {
    const { delTab } = this.props;
    return (e) => {
      e.stopPropagation();
      delTab(id);
    };
  }
  resizeHandler() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(()=>{
      this.setState({
        width: this.refs.tabsArea.clientWidth,
      });
    }, 300);
  }
  toggleMore() {
    this.setState({
      moreIsShow: !this.state.moreIsShow,
    })
  }
  render() {
    const { current: { menuItemId: currentId }, tabs: totalTabs } = this.props;
    const { width: areaWidth, moreIsShow } = this.state;
    const curIndex = totalTabs.findIndex(({ id }) => id === currentId);
    const totalTabsNum = totalTabs.length;
    const { tabs, mores } = getTabsAndMores(totalTabs, areaWidth);
    const moreListElm = moreIsShow ? (
      <ul className={moreList}>
        {
          mores.map(({ id, name }) => (
            <li
              key={id}
              onClick={this.select.bind(this, id)}
              className={cs(
                more,
                {
                  [active]: id === currentId,
                }
              )} >
              <div className={moreName}> { name } </div>
              <button
                className={moreDelBtn}
                type="button"
                onClick={this.del(id)} >x</button>
            </li>
          ))
        }
      </ul>
    ) : null;
    const moreAreaElm = mores.length ? (
      <div className={moreArea}>
        <button
          type="button"
          className={cs(
            moreBtn,
            {
              [active]: curIndex >= tabs.length,
            }
          )}
          style= {{
            width: moreBtnWidth,
          }}
          onClick={this.toggleMore}><Icon className={moreBtnArrow} type="uf-gridcaretarrowup"></Icon></button>
        { moreListElm }
      </div>
    ) : null;
    return (
      <div ref="tabsArea" className={tabsArea}>
        <ul className={tabsList}>
          {
            tabs.map(({ id, name }) => (
              <li
                key={id}
                onClick={this.select.bind(this, id)}
                className={cs(
                  tab,
                  {
                    [active]: id === currentId,
                  }
                )}
                style={{
                  width: tabWidth,
                  marginRight: tabMargin,
                }} >
                <div className={tabName}> { name } </div>
                {
                  totalTabsNum > 1 ? (
                    <button
                      className={tabDelBtn}
                      type="button"
                      onClick={this.del(id)} >x</button>
                  ) : null
                }
              </li>
            ))
          }
        </ul>
        {moreAreaElm}
      </div>
    );
  }
}

export default TabsContainer;
