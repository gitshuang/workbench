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
/*  style */
import {
  pin,
  header,
  container,
  title,
  pd,
  borderBox,
  footer
} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const { pinDisplayNone, setPinAdd, setPinAddGroup } = workActions;

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
    setPinAddGroup,
  }
)
@onClickOutside
class Pin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newGroupName : '',
      isGroup : false,
      currentMenu : 1,
      menuData: {
        menuList : [],

      },
    }
  }

  componentDidMount() {
    const { requestStart, requestSuccess, requestError,} = this.props;

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

  confirmFn = () => {
    const { requestError, pinDisplayNone, setPinAdd } = this.props;
    setPinAdd().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      pinDisplayNone();
    });
  }

  cancelFn = () => {
    const { pinDisplayNone } = this.props;
    pinDisplayNone();
  }

  handleClick =()=>{

  }

  /*  下三个方法为  添加新组  method  */
  addNewGroup =() => {
    const { setPinAddGroup, requestError } = this.props;
    setPinAddGroup().then( ({ error, payload }) => {
      if (error) {
        requestError(payload);
      }

      this.setState({
        isGroup: false
      });
      alert("添加分组成功");
    });
  }

  groupCancelFn =() => {
    this.setState({
      isGroup: false
    });
  }
  setNewGroupName =(e) => {
    this.setState({
      newGroupName: e.target.value
    })
  }

  renderContent = () => {
    let content;
    if (this.state.isGroup){
      content =
        <div className= {`${pd} ${container}`}>
          <div className={borderBox}>
            <input type="text" value={this.state.newGroupName} onChange={ this.setNewGroupName }/>
          </div>
          <div className={footer + " um-box-justify"}>
            <Button onClick={this.addNewGroup}>添加到新分组</Button>
            <Button onClick={this.groupCancelFn}>取消</Button>
          </div>
        </div>
    }else{
      content =
        <div className= {container}>
          <div className={title}>
            添加到：
          </div>
          <div className={borderBox}>
            <Menu
              onClick={this.handleClick.bind(this)}
              style={{ width: 240 }}
              defaultOpenKeys={['demo3sub1']}
              selectedKeys={[this.state.currentMenu]}
              mode="inline"
            >
              <SubMenu key="demo3sub1" title={<span><span>组织 2</span></span>}>
                <Menu.Item key="5">选项 5</Menu.Item>
                <Menu.Item key="6">选项 6</Menu.Item>
                <SubMenu key="demo3sub2" title="子项">
                  <Menu.Item key="7">选项 7</Menu.Item>
                  <Menu.Item key="8">选项 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="demo3sub3" title={<span><span>组织 3</span></span>}>
                <Menu.Item key="9">选项 9</Menu.Item>
                <Menu.Item key="10">选项 10</Menu.Item>
                <Menu.Item key="11">选项 11</Menu.Item>
                <Menu.Item key="12">选项 12</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className={footer + " um-box-justify"}>
            <div>
              <Button onClick={this.addGroup}>添加分组</Button>
            </div>
            <div>
              <Button style={{marginRight:"5px"}} onClick={ this.confirmFn }>确定</Button>
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
