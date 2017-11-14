/**
 * Created by yuzhao on 2017/5/31.
 */

import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {Button,Con,Col,Icon} from 'tinper-bee';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import actions from 'store/root/work/actions';

const {
  setContentSrc,
  setTabsCurrent,
  getTabsList,
  delTabs,
} = actions;

class TabsContainer extends Component {
  constructor(props) {
    super(props);

    var self = this;

    var value = typeof sessionStorage['tabNotice']=='undefined'?true:sessionStorage['tabNotice'];

    this.state = {
      menus:props.tabsList,
      tabNum:props.tabsList.length,
      tabNotice:JSON.parse(value),
      showNotice:props.showNotice
    };
    this.setCurrent = this.setCurrent.bind(this);
    this.del = this.del.bind(this);
    this.initCurrent();
  }
  createTabs(item){
    const {getTabsList} = this.props;
    const tabs = this.props.tabsList;
    tabs.push(item);
    sessionStorage['tabs'] = JSON.stringify(tabs);
    getTabsList(tabs);
  }
  initCurrent() {

    const {current} = this.props;
    const tabs = this.props.tabsList;
    for(let i=0;i<tabs.length;i++){
      if(tabs[i]==current.id){
          return current.id;
      }
    }

    if(!current.id){
      return false;
    }
    this.createTabs(current);
    return current;
  }
  setCurrent(id){
    //console.log(id);

    const { tabsList,setTabsCurrent,setContentSrc,delTabs } = this.props;
    const item = tabsList[id];

    setContentSrc(item.url);
    //设定tabs组件的当前值
    setTabsCurrent({
      id:item.id,
      url:item.url,
      title:item.title
    });
  }

  del (id) {
    const {delTabs} = this.props;
    delTabs(id);
  }

  notice() {
    var value = this.state.tabNotice;

    sessionStorage['tabNotice'] = !value;

    this.setState({
      tabNotice:!value
    })
  }
  componentDidUpdate(){
    //this.tabNotice();
  }
  tabNotice (){
    if(this.state.menus.length>=11) {
      var dom = ReactDOM.findDOMNode(this.refs['tabNotice']);
      if(dom){
        dom.style.display = '';
      }
      setTimeout(function () {
        if(dom){
          dom.style.display = 'none';
        }
      },2000)
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({current: nextProps.current,showNotice:nextProps.showNotice,menus:nextProps.menus,tabNum:nextProps.menus.length});
  // }
  render() {

    const self = this;
    const {current,tabsList} = this.props;


    return (
      <div>
        <div id="portalTabs" className={"tabs ui-tabs-num-"+this.state.tabNum}>
          <div className="tabs-list-box">
            {/*<span className="tabs-list-home">*/}
            {/*<i className="qy-iconfont icon-tubiao-shouye"></i>*/}
            {/*</span>*/}
            <ul className="tabs-list">
              {
                tabsList.map(function (item,index) {

                  var delIcon = (<i onClick={self.del.bind(this,item.id)} className="uf uf-close" key={item.router}></i>)

                  //var homeIcon = index==0?<i className="qy-iconfont icon-tubiao-shouye"></i>:item.title;

                  var selected = current.id==item.id?'selected':'';

                  return (
                    <li key={item.id} className={selected}>
                      <a onClick={self.setCurrent.bind(this,index)} href="javascript:;" title={item.title}>
                        {item.title}
                      </a>
                      {delIcon}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        {
          (self.state.menus.length>=11&&self.state.tabNotice&&self.state.showNotice)?(
            (<div ref="tabNotice" className="portalTabs-message" >
              <p>
                <i className="uf qy-iconfont icon-tubiao-jingshi"></i> 抱歉，页面最多展示10个窗口！
              </p>
              <span style={{display:'none'}} onClick={this.notice.bind(this)}>不再显示</span>
            </div>)
          ):null
        }

      </div>
    )
  }
}



export default connect(mapStateToProps(
  'current',
  'contentSrc',
  'tabsList',
  {
    namespace: 'work',
  },
  ),
  {
    getTabsList,
    setTabsCurrent,
    setContentSrc,
    delTabs,
  })(TabsContainer);
