import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'bee/button';
import Menu, { SubMenu } from 'bee/menus';
import { findPath, avoidSameName } from '@u';
/*  style */
import {
  container,
  title,
  pd,
  borderBox,
  footer,
  selectedli,
  saveBtn,
} from './style.css';

const { Item } = Menu;

class MoveToGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroupName: "分组",      // 新分组名
      inAddGroup: false,        // 是否是打开新的分组
      way: '',          // 路径
      selectId: '',   // 选中的id
    }
  }

  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {

  }
  // 新分组名称的onchange
  setNewGroupName =(e) => {
    let env = e || window.event;
    this.setState({
      newGroupName: env.target.value,
      way:env.target.value
    })
  }
  //  点击每一行对应的操作
  handlerClick(selectId) {
    const way = findPath(
        this.props.data,
        'children',
        'widgetId',
        selectId
      ).map(
        ({widgetName})=>widgetName
      ).join('/');
    this.setState({
      way,
      selectId,
      inAddGroup: false,
    });
  }
  // 点击添加分组
  addGroup = () => {
    const { data } = this.props;
    const nameArr = data.map(({ widgetName }) => {
      return widgetName;
    });
    const newGroupName = avoidSameName(nameArr, '分组');
    this.setState({
      inAddGroup: true,
      newGroupName
    });
    setTimeout(() => {
      this.refs.newGroupName.focus();
      this.refs.newGroupName.select();
    }, 0);
  }
  // 确认添加分组
  confirmAddGroup = () => {
    this.props
      .onAddGroup(this.state.newGroupName)
      .then(({ error, payload }) => {
        if (!error) {
          this.props.onSave(payload.widgetId);
          this.setState({
            inAddGroup: false,
          });
        }
      });
  }

  //   保存
  save = () => {
    const { selectId, inAddGroup } = this.state;
    if(inAddGroup){
      this.confirmAddGroup()
    }else{
      this.props.onSave(selectId);
    }
  }
  //  取消
  cancel = () => {
    this.props.onCancel();
  }
  makeSelectInterface(data, selectId) {
    /*下拉菜单式*/
    let result = [];
    data.forEach(({widgetId,widgetName,children,type})=>{
      const classname = widgetId == selectId ? selectedli : "";
      if(children && children.length){
        result.push(
          <SubMenu
            key={widgetId}
            title={
              <span
                onClick={this.handlerClick.bind(this, widgetId)}
                className={ classname }>
                {widgetName}
              </span>
            }>
            { this.makeSelectInterface(children,selectId) }
          </SubMenu>
        );
      }else{
        result.push(
          <Item key={widgetId} className={ classname }>
            <span
              onClick={this.handlerClick.bind(this, widgetId)}>
              { widgetName }
            </span>
          </Item>
        );
      }
    });
    return result;
    /*默认展开式*/
    // if (data.length) {
    //   return (
    //     <ul>
    //       {
    //         data.map(({ widgetId, widgetName, children, type }) => {
    //           const classname = widgetId == selectId ? selectedli : "";
    //           return (
    //             <li key={widgetId}>
    //               <p
    //                 onClick={this.handlerClick.bind(this, widgetId)}
    //                 className={ classname }>
    //                 { widgetName }
    //               </p>
    //               {
    //                 children ?
    //                   this.makeSelectInterface(children, selectId) :
    //                   null
    //               }
    //             </li>
    //           );
    //         })
    //       }
    //     </ul>
    //   );
    // } else {
    //   return null;
    // }
  }
  render() {
    const {
      inAddGroup,
      newGroupName,
      way,
      selectId,
    } = this.state;
    const {
      data,
      onSave,
      onCancel,
      onAddGroup,
      caller
    } = this.props;

    let content = (
      <div className= {container}>
        <div className={title}>
          {caller}到：{way}
        </div>
        <div className={borderBox}>
          <Menu
            onClick={this.handleClick}
            style={{ width: '100%' }}
            onOpenChange={this.onOpenChange}
            mode="inline">
            { this.makeSelectInterface(data, selectId) }
          </Menu>
          {/* { this.makeSelectInterface(data, selectId) } */}
          {inAddGroup ? (<div>
            <input type="text" ref="newGroupName"
              value={newGroupName}
              onChange={ this.setNewGroupName }
              autoFocus="autofocus"
            />
          </div>):null}
        </div>

        <div className={`${footer} um-box-justify`}>
          {
            onAddGroup ? (<div>
              <Button onClick={this.addGroup} disabled={inAddGroup? true: false}>添加分组</Button>
            </div>) : null
          }
          <div>
            {
              onSave ? (<Button
                colors="danger"
                disabled={!way && !inAddGroup}
                className={saveBtn}
                onClick={ this.save }>确定</Button>) : null
            }
            {
              onCancel ? (<Button
                onClick={this.cancel}>取消</Button>) : null
            }
          </div>
        </div>
      </div>
    );
    {/*if (inAddGroup) {
      content = (
        <div className= {`${pd} ${container}`}>
          <div className={borderBox}>
            <input type="text" value={newGroupName} onChange={ this.setNewGroupName }/>
          </div>
          <div className={footer + " um-box-justify"}>
            <Button colors="danger" disabled={!newGroupName} onClick={ this.confirmAddGroup }>添加新分组</Button>
            <Button onClick={ this.cancelAddGroup }>取消</Button>
          </div>
        </div>
      );
    }else{

    }*/}
    return content;
  }
}

export default MoveToGroup;
