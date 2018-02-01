import React, { Component } from 'react';
import cs from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from 'store/root/work/actions';
import Icon from 'components/icon';
import { mapStateToProps,browserRedirect } from '@u';
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
  moreBtnArrow,
  ipad_tabs_area
} from './style.css';

const {
  delTab,
  unshiftTab,
  setTabs,
} = actions;

let tabWidth = 160;
const minTabWidth = 104;
const tabMargin = 1;
const moreBtnWidth = 19;
const deviation = 0;
const getTabsAndMores = (totalTabs, areaWidth, curIndex) => {
  let allLeng = totalTabs.length;
  tabWidth = areaWidth/allLeng;
  let mores = [];
  let tabs = totalTabs;
  let hasMore = false;
  if(tabWidth > 160){
    tabWidth = 160;
  }else{
    if(tabWidth <= minTabWidth){
      // let maxTabsNum = Math.floor((areaWidth-moreBtnWidth)/allLeng);
      // tabWidth = (areaWidth-moreBtnWidth)/allLeng;
      let maxTabsNum = Math.floor((areaWidth-moreBtnWidth)/minTabWidth);
      tabWidth = minTabWidth;
      tabs = totalTabs.slice(0, maxTabsNum);
      mores = totalTabs;
      hasMore = true;
    }else{
      tabWidth = areaWidth/allLeng;
    }
  }
  return {
    tabs,
    mores,
    hasMore,
    tabWidth,
  }
}

@withRouter
@connect(
  mapStateToProps(
    'current',
    'tabs',
    {
      namespace: 'work',
    },
  ),
  {
    delTab,
    unshiftTab,
    setTabs,
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
      this.setState({
        width: areaWidth,
      });
    }
    this.setState({
      moreIsShow: false,
    });
  }
  unshift(serviceCode) {
    this.props.unshiftTab(serviceCode);
    this.select(serviceCode);
  }
  select(serviceCode) {
    const {
      history,
      match: {
        params: {
          code,
          type,
        },
      },
    } = this.props;
    history.push(`/${type}/${code}/${serviceCode}`);
  }
  del(id) {
    const {
      tabs,
      delTab,
      history,
      match: {
        params: {
          type,
          code,
        }
      }
    } = this.props;
    return (e) => {
      e.stopPropagation();
      if (tabs.length > 1) {
        const serviceCode = delTab(id);
        history.replace(`/${type}/${code}/${serviceCode}`);
      } else {
        history.replace('');
      }
    };
  }
  closeAll = () => {
    const {
      setTabs,
      history,
    } = this.props;
    setTabs([]);
    history.replace('');
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
    const { current: { menuItemId: currentId }, tabs: totalTabs} = this.props;
    // ,tabWidth,minTabWidth
    const { width: areaWidth, moreIsShow } = this.state;
    const curIndex = totalTabs.findIndex(({ id }) => id === currentId);
    const totalTabsNum = totalTabs.length;

    let ipad_tabsArea = "";
    let tabs = [], mores = [];
    let equipment = browserRedirect();
    let _width = {};
    if(equipment == "ipad"){
      tabs = totalTabs;
      mores = [];
      ipad_tabsArea = ipad_tabs_area;//"ipad_tabs_area";
      _width.width = areaWidth;
    }else{
      let { tabs:_tabs, mores:_mores } = getTabsAndMores(totalTabs, areaWidth, curIndex);
      tabs = _tabs;
      mores = _mores;
    }
    const moreListElm = moreIsShow ? (
      <ul className={moreList} >
        {
          mores.map(({ id, name, serviceCode }) => (
            <li
              key={id}
              onClick={this.unshift.bind(this, serviceCode)}
              className={cs(
                more,
                {
                  [active]: id === currentId,
                }
              )} >
              <div className={moreName}> { name } </div>
              <button
                title={tabs.length === 1 ? "关闭后，将回到用友云首页" : ""}
                className={moreDelBtn}
                type="button"
                onClick={this.del(id)} >x</button>
            </li>
          ))
        }
        <li
          onClick={this.closeAll}
          className={more}
          title="关闭后，将回到用友云首页" >
          <div className={moreName}>关闭全部页面</div>
        </li>
      </ul>
    ) : null;
    const moreAreaElm = mores.length ? (
      <div className={moreArea}>
        <button
          type="button"
          className={cs(
            moreBtn,
            {
              [active]: moreIsShow,
            }
          )}
          style= {{
            width: moreBtnWidth,
          }}
          onClick={this.toggleMore}><Icon title="更多" className={moreBtnArrow} type="upward"></Icon></button>
        { moreListElm }
      </div>
    ) : null;

    return (
      <div ref="tabsArea" className={`${tabsArea} ${ipad_tabsArea}`} style={_width} >
        <ul className={tabsList}  >
          {
            tabs.map(({ id, name, serviceCode }) => (
              <li
                key={id}
                onClick={this.select.bind(this, serviceCode)}
                className={cs(
                  tab,
                  {
                    [active]: id === currentId,
                  }
                )}
                style={{
                  width: tabWidth
                }} >
                <div className={tabName}> { name } </div>
                <button
                  className={tabDelBtn}
                  type="button"
                  onClick={this.del(id)} >
                  <Icon
                    title={tabs.length === 1 ? "关闭后，将回到用友云首页" : ""}
                    type="error3" />
                </button>
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
