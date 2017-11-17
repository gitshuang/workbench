import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
/*  actions  */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
/*  comp */
import Button from 'bee-button';
import Menu, { SubMenu } from 'bee-menus';
import Icon from 'components/icon';
/*  style */
import {
  pin,
  header,
  container,
  title,
  pd,
  borderBox,
  footer,
  selectedli
} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const { pinDisplayNone, setPinAdd, setAddGroup, getPinGroup } = workActions;

@connect(mapStateToProps(
  'pinType',
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
      way: '',
      newGroupName : '',
      isGroup : false,
      currentMenu : 1,
      menuData: [],
      selectedClass:false
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

  setReset = () => {

  }

  addGroup = () => {
    this.setState({
      isGroup: true
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
    this.setState({
      way: "",
      menuData: this.cancelSelect()
    });
    pinDisplayNone();
  }
  /*  menu  方法汇总   */
  // 子集文件夹的点击事件
  handleClick =(item, index, list, key)=>{
      let way = item.name +"/"+ list.name;
      this.setState({
        way: way,
        menuData: this.cancelSelect(index,key)
      });
  }
  // menu一级菜单的点击事件
  handleTitleClick = (item,index) => {
    this.setState({
      way: item.name,
      menuData: this.cancelSelect(index)
    });
  }
  //  统一的返回加工或点击之后的menuData数据
  cancelSelect = (index,key) => {
    let menuData = this.state.menuData;
    menuData.forEach((v,i)=>{
      v.checked = false;
      v.widgeList && v.widgeList.forEach((w,k)=>{
        w.checked = false;
      })
    });
    //if(arguments.length == 0){
    if( index == undefined && key == undefined){
      return menuData;
    }
    if(key == undefined){
      menuData[index].checked = true;
      return menuData;
    }
    menuData[index].widgeList[key].checked = true;
    return menuData;
  }

  /*  下三个方法为  添加新组  method  */
  addNewGroup =() => {
    const { setAddGroup, requestError } = this.props;
    setAddGroup().then( ({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      let newGroup = {
        id : "2222",
        name : this.state.newGroupName,
      };
      let menuData = this.state.menuData;
      menuData.push(newGroup);

      this.setState({
        menuData: menuData,
      });
      this.groupCancelFn();
    });
  }
  groupCancelFn =() => {
    this.setState({
      isGroup: false,
      newGroupName: ""
    });
  }
  setNewGroupName =(e) => {
    this.setState({
      newGroupName: e.target.value
    })
  }

  renderContent = () => {
    let _this = this;
    let content;
    let data = this.state.menuData;
    if (this.state.isGroup){
      content =
        <div className= {`${pd} ${container}`}>
          <div className={borderBox}>
            <input type="text" value={this.state.newGroupName} onChange={ this.setNewGroupName }/>
          </div>
          <div className={footer + " um-box-justify"}>
            <Button colors="danger" disabled={!this.state.newGroupName} onClick={this.addNewGroup}>添加到新分组</Button>
            <Button onClick={this.groupCancelFn}>取消</Button>
          </div>
        </div>
    }else{
      content =
        <div className= {container}>
          <div className={title}>
            添加到：{this.state.way}
          </div>
          <div className={borderBox}>
            <ul>
              {
                data.map( (item, index) => {
                  return (
                    <li key={index}>
                      <p
                        onClick={ () =>{this.handleTitleClick(item,index)} }
                        className={ item.checked ? selectedli : "" }
                      >
                        {item.name}
                      </p>
                      {
                        item.widgeList && item.widgeList.map((list, key) => {
                          return (
                            <div
                              key = {key}
                              className = { list.checked ? selectedli : "" }
                              onClick={() =>{this.handleClick(item, index, list, key)}}
                            >
                              {list.name}
                            </div>
                          )
                        })
                      }
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className={footer + " um-box-justify"}>
            <div>
              <Button onClick={this.addGroup}>添加分组</Button>
            </div>
            <div>
              <Button colors="danger" disabled={!this.state.way} style={{marginRight:"5px"}} onClick={ this.confirmFn }>确定</Button>
              <Button onClick={this.cancelFn}>取消</Button>
            </div>
          </div>
        </div>
    }
    return content;
  }

  render() {
    const { pinType, pinDisplay } = this.props;
    return (
      <div className={ pin + ' um-css3-hc'} style={{ display: pinDisplay ? 'block' : 'none' }} >
        <div className={header +" um-box"}>
          <div>
            <img src="../" alt="" />
          </div>
          <p>工作页名称</p>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

export default Pin;
