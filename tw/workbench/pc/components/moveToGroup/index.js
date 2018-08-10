import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'bee/button';
import Menu, { SubMenu } from 'bee/menus';
import { findPath, avoidSameName } from '@u';
/*  style */
import {
  container,
  title,
  borderBox,
  footer,
  selectedli,
  saveBtn,
} from './style.css';

const { Item } = Menu;

class MoveToGroup extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    onAddGroup: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    caller: PropTypes.string,
  };
  static defaultProps = {
    data: [],
    onAddGroup: () => { },
    onSave: () => { },
    onCancel: () => { },
    caller: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      // 新分组名
      newGroupName: '分組',
      // 是否是打开新的分组
      inAddGroup: false,
      // 路径
      way: '',
      // 选中的id
      selectId: '',
    };
  }

  // 新分组名称的onchange
  setNewGroupName = (e) => {
    const env = e || window.event;
    this.setState({
      newGroupName: env.target.value,
      way: env.target.value,
    });
  }
  //  点击每一行对应的操作
  handlerClick = (selectId) => {
    const way = findPath(
      this.props.data,
      'children',
      'widgetId',
      selectId,
    ).map(({ widgetName }) => widgetName).join('/');
    this.setState({
      way,
      selectId,
      inAddGroup: false,
    });
  }
  // 点击添加分组
  addGroup = () => {
    const { data } = this.props;
    const nameArr = data.map(({ widgetName }) => widgetName);
    const newGroupName = avoidSameName(nameArr, '分組');
    this.setState({
      inAddGroup: true,
      newGroupName,
    });
    setTimeout(() => {
      this.newGroupName.focus();
      this.newGroupName.select();
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
    if (inAddGroup) {
      this.confirmAddGroup();
    } else {
      this.props.onSave(selectId);
    }
  }
  //  取消
  cancel = () => {
    this.props.onCancel();
  }
  makeSelectInterface(data, selectId) {
    // 下拉菜单式*/
    const result = [];
    data.forEach(({
      widgetId,
      widgetName,
      children,
    }) => {
      const classname = widgetId === selectId ? selectedli : '';
      if (children && children.length) {
        result.push(
          <SubMenu 
            key={widgetId} 
            classname={classname}
            title={
              <span onClick={() => { this.handlerClick(widgetId); }} 
                onKeyDown={() => { this.handlerClick(widgetId); }} 
                role="presentation" 
                style = {{display:"block"}}
                className={classname}
              >
                {widgetName}
              </span>
            }
          >
            {this.makeSelectInterface(children, selectId)}
          </SubMenu>);
      } else {
        const pushOb = (
          <Item key={widgetId} className={classname}>
            <span 
              style = {{display:"block"}}
              onClick={() => { this.handlerClick(widgetId); }}
              onKeyDown={() => { this.handlerClick(widgetId); }}
              role="presentation"
            >
              {widgetName}
            </span>
          </Item>
        );
        result.push(pushOb);
      }
    });
    return result;
    /* 默认展开式 */
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
      caller,
    } = this.props;

    const content = (
      <div className={container}>
        <div className={title}>
          {caller}到：{way}
        </div>
        <div className={borderBox}>
          <Menu
            onClick={this.handleClick}
            style={{ width: '100%' }}
            onOpenChange={this.onOpenChange}
            mode="inline"
          >
            {this.makeSelectInterface(data, selectId)}
          </Menu>
          {/* { this.makeSelectInterface(data, selectId) } */}
          {
            inAddGroup
            ?
            (
              <div>
                <input
                  type="text"
                  ref={(c) => { this.newGroupName = c; }}
                  value={newGroupName}
                  onChange={this.setNewGroupName}
                />
              </div>
            )
            : null
          }
        </div>

        <div className={`${footer} um-box-justify`} style={{ overflow: 'hidden' }}>
          {
            onAddGroup ? (
              <div>
                <Button style={{ float: 'left' }} onClick={this.addGroup} disabled={inAddGroup}>添加分組</Button>
              </div>
            ) : null
          }
          <div style={{ float: 'right' }}>
            {
              onSave ? (
                <Button
                  colors="danger"
                  disabled={!way && !inAddGroup}
                  className={saveBtn}
                  onClick={this.save}
                >確定
                </Button>
              ) : null
            }
            {
              onCancel ? (
                <Button
                  onClick={this.cancel}
                >取消
                </Button>
              ) : null
            }
          </div>
        </div>
      </div>
    );
    return content;
  }
}

export default MoveToGroup;
