import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'bee-button';
import { findPath } from '@u';
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

class MoveToGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroupName: '添加分组',      // 新分组名
      inAddGroup: false,        // 是否是打开新的分组
      way: '',          // 路径
      selectId: '',   // 选中的id
    }
  }
  // 新分组名称的onchange
  setNewGroupName =(e) => {
    this.setState({
      newGroupName: e.target.value
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
    this.setState({
      inAddGroup: true,
    });
    setTimeout(() => {
      this.refs.newGroupName.focus();
      this.refs.newGroupName.select();
    }, 0);
  }
  // 确认添加分组
  confirmAddGroup = () => {
    debugger;
    this.props
      .onAddGroup(this.state.newGroupName)
      .then(({ error, payload }) => {
        this.props.onSave(payload.widgetId);
        this.setState({
          inAddGroup: false,
        });
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
    if (data.length) {
      return (
        <ul>
          {
            data.map(({ widgetId, widgetName, children, type }) => {
              const classname = widgetId == selectId ? selectedli : "";
              return (
                <li key={widgetId}>
                  <p
                    onClick={this.handlerClick.bind(this, widgetId)}
                    className={ classname }>
                    { widgetName }
                  </p>
                  {
                    children ?
                      this.makeSelectInterface(children, selectId) :
                      null
                  }
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return null;
    }
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
    } = this.props;
    let content = (
      <div className= {container}>
        <div className={title}>
          添加到：{way}
        </div>
        <div className={borderBox}>
          { this.makeSelectInterface(data, selectId) }
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
              <Button onClick={this.addGroup}>添加分组</Button>
            </div>) : null
          }
          <div>
            {
              onSave ? (<Button
                colors="danger"
                disabled={!way && !inAddGroup}
                className={saveBtn}
                onClick={ this.save }>添加</Button>) : null
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
