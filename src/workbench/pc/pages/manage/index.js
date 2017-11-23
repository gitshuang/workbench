import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import HTML5BackendGroup from 'react-dnd-html5-backend';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import manageActions from 'store/root/manage/actions';

import Header from 'containers/header';
import ManageGroup from 'containers/manageGroup';

import 'assets/style/iuapmobile.um.css';
import { HeaderLeft } from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const {changeUserInfoDisplay} = homeActions;
const { setManageList,getManageList,batchDelect } = manageActions;

@withRouter
@connect(
  mapStateToProps(
    'manageList',
    'isEdit',
    {
      namespace: 'manage',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    changeUserInfoDisplay,
    setManageList,
    getManageList,
    batchDelect
  }
)

class Home extends Component {

  constructor(props) {
    super(props);

   // this.moveItem = this.moveItem.bind(this);
    this.state ={
      selectGroup: []
    }
    this.moveGroupDrag = this.moveGroupDrag.bind(this);
  }

  moveGroupDrag(id, afterId) {
    const { data } = this.state;

    const item = data.filter(i => i.id === id)[0];
    const afterItem = data.filter(i => i.id === afterId)[0];
    const itemIndex = data.indexOf(item);
    const afterIndex = data.indexOf(afterItem);

    this.setState(update(this.state, {
      data: {
        $splice: [
          [itemIndex, 1],
          [afterIndex, 0, item]
        ]
      }
    }));
  }

  componentDidMount() {
    const { requestError, requestSuccess, getManageList } = this.props;
    getManageList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
      }
    });
  }
  // 将此方法传递给manageGroup 组件中
  selectGroupFn = (flag, index) => {
    let selectGroup = this.state.selectGroup;
    if(flag){
      selectGroup.push(index);
    }else{
      selectGroup =  selectGroup.filter((item,i) => {
        return index !== item;
      });
    }
    console.log(selectGroup);
    this.setState({
      selectGroup
    });
  }
  // 批量删除
  batchDelect =() => {
    const { batchDelect } = this.props;
    let selectGroup = this.state.selectGroup;
    this.setState({
      selectGroup:[]
    });
    batchDelect(selectGroup);
  }
  // 保存
  save =() => {
    const {setManageList,manageList} = this.props;
    setManageList(manageList).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
      }
    });
  }
  // 取消
  cancelFn = () => {
    const {isEdit,getManageList} = this.props;
    if(isEdit){
      getManageList().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        } else {
          requestSuccess();
        }
      });
    }else{
      this.props.history.goBack();
    }
  }

  getLeftContent() {
    let logoUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510562718599&di=2c650c278296b97dcab3e594f49330f4&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fcms%2F2008-2-25%2FImage%2F2008225113034.jpg";
    return (
      <div className={HeaderLeft}>
        <img src={logoUrl}/>
      </div>
    )
  }

  renderContent =() => {
    let { manageList } = this.props;
    const data = {};
    data.data = manageList;

    //(typeof this.state === "undefined" || this.state===null || typeof this.state.data === "undefined" || (this.state.data && this.state.data.length===0)) ? (this.state = data) : (manageList=this.state.data);
    let list = [];
    if(manageList.length == 0) return;
    manageList.map((item, index) =>{
      list.push(
        <ManageGroup manageData={item} index={index} key={item.name+index} selectGroupFn={this.selectGroupFn}  id={item.id} moveGroupDrag={this.moveGroupDrag}/>
      )
    });
    return list;
  }

  render() {
    const { changeUserInfoDisplay,isEdit } = this.props;
    return (
      <div className="um-win">
        <div className="um-header">
          <Header onLeftClick={ changeUserInfoDisplay } leftContent={this.getLeftContent()} iconName={'wode'}>
            <span>首页编辑</span>
          </Header>
        </div>
        <div className="um-content">
          {this.renderContent()}
        </div>
        <div className="um-footer">
          <div className="um-box-justify">
            <div>
              <button className="btn btn-inline" disabled={this.state.selectGroup.length ? false : true } onClick={this.batchDelect}>批量删除</button>
            </div>
            <div>
              <button className="btn btn-inline" disabled={!isEdit} onClick={this.save}>保存</button>
              <button className="btn btn-inline" onClick={this.cancelFn}>取消</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5BackendGroup)(Home);
