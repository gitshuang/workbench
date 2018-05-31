import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropdown from 'bee/dropdown';
import Icon from 'pub-comp/icon';
import Menu, { Item as MenuItem } from 'bee/menus';
import {
  dropdownButtonCont, labelCont, btnUpward, btnPullDown, iconStyle, menuStyle,
  createEnt, menuItem, itemUl, itemLi, liTitle, liRight,fnbox
} from './style.css';

@withRouter
class DropdownButton extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    label: PropTypes.string,
    dataItem: PropTypes.arrayOf(PropTypes.object),
    closeFun: PropTypes.func,
    type: PropTypes.string,
    marginLeft: PropTypes.number,
    lastIem: PropTypes.string,
    openMenu: PropTypes.func,
    getPopupContainer: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    label: '',
    dataItem: [],
    closeFun: () => { },
    type: '',
    marginLeft: 0,
    lastIem: '',
    openMenu: () => {},
    getPopupContainer: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onVisibleChange = (visible) => {
    if (this.props.closeFun) {
      this.props.closeFun();
    }
    this.setState({
      visible,
    });
  }

  handleShow = () => {
    this.setState({
      visible: true,
    });
  }

  // todu 后续需求变更后需要遍历找到对应的事件
  handleSelect = (da) => {
    if (!da) return;
    da.fun(da.name);
    // if(this.props.dataItem[0].fun){
    //     this.props.dataItem[0].fun(da.name);
    // }
    this.setState({
      visible: false,
    });
  }

  enterOnclick = () => {
    const {
      history,
    } = this.props;
    history.push('/establishusercenter');
  }

  manageOnclick = () => {
    const {
      history,
    } = this.props;
    history.push('/manageTeamEnter');
  }

  render() {
    const {
      label, dataItem, type, marginLeft, lastIem, openMenu,
    } = this.props;
    // const {label } = this.state;
    const item = [];
    if (dataItem.length !== 0) {
      dataItem.forEach((da) => {
        item.push(<div key={da.name} className={itemLi} onClick={() => { this.handleSelect(da); }} onKeyDown={() => { this.handleSelect(da); }} role="presentation"><div className={liTitle} title={da.value}>{da.value}</div><div className={liRight}>{da.type === 1 ? '$i18n{index.js0}$i18n-end' : '$i18n{index.js1}$i18n-end'}</div></div>);
      });
    } else {
      item.push(<div key="item_1001" className={itemLi} ><div className={liTitle} >$i18n{index.js2}$i18n-end....</div></div>);
    }
    let marginLeft2 = -148;
    if (type && type === 'home') {
      marginLeft2 = marginLeft || -192;
    }
    // onSelect={(e)=>{this.handleSelect(e,fun)}}
    const menus = (
      <Menu className={menuStyle} style={{ marginLeft: marginLeft2, marginTop: -1 }}>
        <MenuItem className={menuItem} >
          <div className={`${itemUl} open_item`}>{item}</div>
          {
            lastIem
              ? null
              : (
                <div className={fnbox}>
                  <div
                    className={createEnt}
                    onClick={this.enterOnclick}
                    onKeyDown={this.enterOnclick}
                    role="presentation"
                  >
                    $i18n{index.js3}$i18n-end \ $i18n{index.js4}$i18n-end
                  </div>
                  <div
                    className={createEnt}
                    onClick={this.manageOnclick}
                    onKeyDown={this.manageOnclick}
                    role="presentation"
                  >
                    $i18n{index.js5}$i18n-end \ $i18n{index.js6}$i18n-end
                  </div>
                </div>
              )
          }
        </MenuItem>
      </Menu>
    );

    const arrard = this.state.visible ? 'upward' : 'pull-down';
    return (
      <div className={dropdownButtonCont} >
        <div className={`${labelCont} home_title`}>
          <span>{label}</span>
        </div>
        <div id="_dropdown_popcontainer" className={`${this.state.visible ? btnUpward : btnPullDown} home_title_down `}>
          <Dropdown
            overlayClassName="_btn_down"
            getPopupContainer={this.props.getPopupContainer}
            trigger={['click']}
            overlay={menus}
            animation="slide-up"
            onClick={openMenu}
            onVisibleChange={this.onVisibleChange}
          >
            <div><Icon type={arrard} className={iconStyle} /></div>
          </Dropdown>
        </div>
      </div>
    );
  }
}
export default DropdownButton;