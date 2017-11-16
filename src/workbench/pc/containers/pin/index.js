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
const { pinDisplayNone, setPinAdd, setPinAddGroup, getPinGroup } = workActions;

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
    getPinGroup,
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
      menuData: []
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
  /*  menu  方法汇总   */
  handleClick =(e,item, list)=>{
      e.stopPropagation();
      let way = item.name +"/"+ list.name
      this.setState({
        way: way
      });
  }
  handleTitleClick = (item) => {
    return () =>{
      this.setState({
        way: item.name
      });
    }
  }


  /*  下三个方法为  添加新组  method  */
  addNewGroup =() => {
    const { setPinAddGroup, requestError } = this.props;
    setPinAddGroup().then( ({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      let newGroup = {
        id : "2222",
        name : this.state.newGroupName,
        widgeList: []
      };
      let menuData = this.state.menuData;
      menuData.push(newGroup);

      this.setState({
        isGroup: false,
        menuData: menuData,
        newGroupName: ""
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
            <Button disabled={!this.state.newGroupName} onClick={this.addNewGroup}>添加到新分组</Button>
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
            <ul style={{width:"240px"}}>
              {
                data.map((item, index) => {
                  return (
                    <li className="" key={index} onClick={this.handleTitleClick(item)}>
                      {item.name}
                      {
                        item.widgeList && item.widgeList.map((list, key) => {
                          return (
                            <div className="" key ={key} onClick={(e) =>{this.handleClick(e,item,list)}}>{list.name}</div>
                          )
                        })
                      }
                    </li>
                  )
                })
              }
            </ul>
            {  /*
              <Menu
                onSelect={this.handleSelect.bind(this)}
                onClick={this.handleClick.bind(this)}
                style={{ width: 240 }}
                defaultOpenKeys={[]}
                mode="inline"
              >
                {
                  data.map((item, index) => {
                    return (
                      <SubMenu
                        key={index}
                        title={ <span><span>{item.name}</span></span> }
                        onTitleClick={ this.handleTitleClick.bind(this) }
                      >
                        {
                          item.widgeList.map((list, key) => {
                            return (
                              <Menu.Item key={key}>{list.name}</Menu.Item>
                            )
                          })
                        }
                      </SubMenu>
                    )
                  })
                }
              </Menu>
              */ }
          </div>
          <div className={footer + " um-box-justify"}>
            <div>
              <Button onClick={this.addGroup}>添加分组</Button>
            </div>
            <div>
              <Button disabled={!this.state.way} style={{marginRight:"5px"}} onClick={ this.confirmFn }>确定</Button>
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
