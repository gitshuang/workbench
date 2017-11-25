import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'bee-button';
/*  style */
import {
  container,
  title,
  pd,
  borderBox,
  footer,
  selectedli
} from './style.css';

const defaultProps = {
  data: [
    {
      "type": "1",
      "widgetId": "f1",
      "widgetName": "分组一",
      "children": [
        {
          "type": "2",
          "widgetId": "w1",
          "widgetName": "文件夹一"
        },
        {
          "type": "2",
          "widgetId": "w2",
          "widgetName": "文件夹二"
        }
      ]
    },
    {
      "type": "1",
      "widgetId": "f2",
      "widgetName": "分组二",
      "children": [
        {
          "type": "2",
          "widgetId": "w3",
          "widgetName": "文件夹三"
        },
        {
          "type": "2",
          "widgetId": "w4",
          "widgetName": "文件夹四"
        }
      ]
    }
  ]
}
class MoveToGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newGroupName : '',      // 新分组名
      isGroup : false,        // 是否是打开新的分组
      way:"",
      selectId:"",
    }
  }

  componentDidMount() {

  }


  setNewGroupName =(e) => {
    this.setState({
      newGroupName: e.target.value
    })
  }
  // 子集文件夹的点击事件
  handleClick =(item, index, list, key)=>{
    let way = item.widgetName +"/"+ list.widgetName;
    this.setState({
      way: way,
      selectId: list.widgetId
    });
  }
  // menu一级菜单的点击事件
  handleTitleClick = (item,index) => {
    this.setState({
      way: item.widgetName,
      selectId: item.widgetId
    });
  }

  render() {
    let _this = this;
    let content;
    const {data,isGroup,addGroup,confirmFn,cancelFn,addNewGroup,groupCancelFn } = this.props;
    if (isGroup){
      content =
        <div className= {`${pd} ${container}`}>
          <div className={borderBox}>
            <input type="text" value={this.state.newGroupName} onChange={ this.setNewGroupName }/>
          </div>
          <div className={footer + " um-box-justify"}>
            <Button colors="danger" disabled={!this.state.newGroupName} onClick={addNewGroup}>添加到新分组</Button>
            <Button onClick={groupCancelFn}>取消</Button>
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
                  const classname = item.widgetId == this.state.selectId ? selectedli : ""
                  return (
                    <li key={index}>
                      <p
                        onClick={ ()=>{this.handleTitleClick(item,index)} }
                        className={ classname}
                      >
                        {item.widgetName}
                      </p>
                      {
                        item.children && item.children.map((list, key) => {
                          const classname2 = list.widgetId == this.state.selectId ? selectedli : ""
                          return (
                            <div
                              key = {key}
                              className = { classname2 }
                              onClick={ ()=>{this.handleClick(item, index, list, key)} }
                            >
                              {list.widgetName}
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
              <Button onClick={addGroup}>添加分组</Button>
            </div>
            <div>
              <Button colors="danger" disabled={!this.state.way} style={{marginRight:"5px"}} onClick={ confirmFn }>确定</Button>
              <Button onClick={cancelFn}>取消</Button>
            </div>
          </div>
        </div>
    }
    return content;
  }
}
MoveToGroup.defaultProps = defaultProps;
export default MoveToGroup;
