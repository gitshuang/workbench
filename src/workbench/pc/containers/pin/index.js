import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
/*  actions  */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
/*  comp */
import MoveToGroup from 'components/moveToGroup';
import Button from 'bee-button';
/*  style */
import {
  pin,
  header,
} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const { pinDisplayNone, setPinAdd, setAddGroup, getPinGroup } = workActions;

@connect(mapStateToProps(
  'pinDisplay',
  {
    "namespace":"work"
  }
  ),

  {
    requestStart,
    requestSuccess,
    requestError,
    pinDisplayNone,
    setPinAdd,
    setAddGroup,
    getPinGroup
  }
)
@onClickOutside
class Pin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuData: [],
      isGroup: false
    }
  }

  componentDidMount() {
    const { requestStart, requestSuccess, requestError, getPinGroup} = this.props;
    getPinGroup().then( ({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      let menuData = [];
      Object.assign(menuData, payload);
      this.setState({
        menuData,
      });
    })
  }

  handleClickOutside(evt) {
    const {  pinDisplayNone, pinDisplay  } = this.props;
    if(pinDisplay){
      pinDisplayNone();
    }
  }

  addGroup = () => {
    this.setState({
      isGroup: true
    });
  }
  groupCancelFn =() => {
    this.setState({
      isGroup: false,
    });
  }
  confirmFn = () => {
    const { requestError, setPinAdd } = this.props;
    setPinAdd().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.cancelFn();
    });
  }

  cancelFn = () => {
    const { pinDisplayNone } = this.props;
    pinDisplayNone();
  }
  /*  menu  方法汇总   */

  /*  下三个方法为  添加新组  method  */
  addNewGroup =(name,id) => {
    const { setAddGroup, requestError } = this.props;
    let newGroup = {
      id : id,
      name : name,
    };
    setAddGroup().then( ({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      let menuData = this.state.menuData;
      menuData.push(newGroup);
      this.setState({
        menuData: menuData,
      });
    });
  }

  render() {
    const { pinDisplay,classname } = this.props;
    if(pinDisplay){
      return (
        <div className={`${pin} um-box-center`} >
          <div className={header +" um-box"}>
            <div>
              <img src="../" alt="" />
            </div>
            <p>工作页名称</p>
          </div>

          <MoveToGroup
            data={this.state.menuData}
            isGroup={this.state.isGroup}
            addGroup={this.addGroup}
            confirmFn={this.confirmFn}
            cancelFn={this.cancelFn}
            addNewGroup={this.addNewGroup }
            groupCancelFn={this.groupCancelFn}
          />
        </div>
      );
    }else{
      return null
    }
  }
}

export default Pin;
