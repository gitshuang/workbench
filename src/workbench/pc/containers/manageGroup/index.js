import React, { Component } from 'react';
import { connect } from 'react-redux';

//import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';

import Icon from 'components/icon';
import WidgetArea from 'components/widgetArea';
import {WidgetTitle} from './style.css';
import 'assets/style/iuapmobile.um.css';
const {
  requestStart,
  requestSuccess,
  requestError
} = rootActions;
const {
  addGroup,
  delectGroup,
  renameGroup,
  moveGroup
} = manageActions;

@connect(()=>({}),
  {
    requestStart,
    requestSuccess,
    requestError,
    addGroup,
    delectGroup,
    renameGroup,
    moveGroup
  }
)
class ManageGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workList: []
    }
  }

  componentDidMount() {

  }

  renameGroupFn =(index) =>{
    const { renameGroup } = this.props;
    renameGroup(index);
  }
  delectGroupFn =() =>{
    alert("删除")
  }
  addGroupFn =() =>{
    alert("添加文件夹")
  }
  addFolderFn = ()=> {

  }
  moveGroupFn =() => {

  }

  renderGroup = () => {
    let workList = this.props.workList;
    let list = [];
    if(!workList) return;
    this.setState({
      workList
    });
    workList.map((item, index) =>{
      let _id = item.id + "_" + index;
      let groupTitle = <div className={WidgetTitle + ' um-box-justify'}>
        <h6>{item.name}</h6>
        <div>
          <Icon type="dingzhi" onClick={()=>{this.renameGroupFn(index)}} />
          <Icon type="momozhushou" onClick={this.delectGroupFn}/>
          <Icon type="add" onClick={this.addFolderFn}/>
        </div>
      </div>;
      list.push(
        <div key={index} id={_id}>
          { groupTitle }
          <div>
            <WidgetArea data={item.widgeList} />
          </div>
          <div>
            <button className="btn" onClick={()=>{this.addGroupFn()}}>添加分组</button>
          </div>
        </div>
      );
    });
    return list;
  }

  render() {
    return (
      <div>
        {this.renderGroup()}
      </div>
    );
  }
}

export default ManageGroup;
