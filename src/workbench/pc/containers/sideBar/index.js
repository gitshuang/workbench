import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noop } from '@u';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee-menus';
import { sideBar } from './style.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { mapStateToProps } from '@u';


const SideContainer = Menu.SideContainer;


const { setContentSrc,setTabsCurrent } = actions;

class SideBarContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: 1,
      expanded:false,
      openKeys: [],
      menu:[],
      firstUrl:'',
      curentOpenKeys: [],
      submenuSelected:'',
      robot:0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const { data, setContentSrc,setTabsCurrent } = this.props;
    //const item = data[o.key];
    const item = e.keyPath.length>1?data[e.keyPath[1]].children[e.keyPath[0]]:data[e.keyPath[0]];
    if (item) {
      //设定iframe内容
      setContentSrc(item.location);
      //设定tabs组件的当前值
      setTabsCurrent({
        id:item.id,
        url:item.location,
        title:item.name
      });
      const st = (e.keyPath.length==1)?{
        current: item.id,
        openKeys: [],
        submenuSelected:'',
        curentOpenKeys:[],
        userMenu:false
      }:{
        current: item.id
      };
      this.setState(st);
    }
  }
  onOpenChange(openKeys) {

    const state = this.state;

    const latestOpenKey = this.myfilter(openKeys,state.openKeys);
    const latestCloseKey = this.myfilter(state.openKeys,openKeys);

    /*   const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
     const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));*/

    let nextOpenKeys = [];

    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({current:openKeys,submenuSelected:openKeys,openKeys: nextOpenKeys,expanded:false});
  }
  //IE下 array.find（）方法不可用
  myfilter(arr1,arr2) {
    if(arr2.length == 0 || !arr2) {
      return arr1[0];
    }

    for(var i=0;i<arr1.length;i++)
    {
      if(arr2.indexOf(arr1[i].toString())==-1)
      {
        return arr1[i];
      }
    }
    return false;
  }
  onToggle(value) {
    //this.setState({expanded: value});
    if (value) {
      var keys = this.state.openKeys;
      this.setState({ expanded: value, openKeys: [], curentOpenKeys: keys });
    } else {
      var _keys = this.state.curentOpenKeys;
      this.setState({ expanded: value, openKeys: _keys, curentOpenKeys: _keys });
    }
  }
  formmaterUrl(item) {
    var uri = " ";
    if (item.urltype === 'url') {
      var target=item.openview=="blank"?"_blank":"";
      if(target){
        uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.location));
      }else{
        uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
      }
      return  uri;
    } else if (item.urltype === 'plugin') {
      uri = item.id ? ('#/' + item.id) : "#/index_plugin";
      window.registerRouter(uri.replace("#", ""), item.location);
      return  uri;
    } else if (item.urltype === 'view') {
      uri = item.location;
      uri= uri.replace("#", "/");
      window.addRouter(uri);
      return  "#"+uri;
    }else if(item.urltype == undefined){
      item.location = '404';
      return  '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
    }
    else {
      return item.location;
    }
  }
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  }
  render() {
    const { data,expanded } = this.props;
    const self = this;

    console.log(expanded);

    return (


      <div id="portal" className={`sideBar`} >


        <SideContainer onToggle={this.onToggle.bind(this)} expanded={expanded}>
          <div className="scroll-height">
            <Scrollbars>
              <Menu  onOpenChange={this.onOpenChange.bind(this)} onClick={this.handleClick.bind(this)} className="u-menu-max1" style={{ width: '100%' }}  openKeys={this.state.openKeys} selectedKeys={[this.state.current]} mode="inline">

                {

                  data.map(function (item,s) {
                    let blank = item.openview=="blank"?"_blank":"";


                    if(Array.isArray(item.children)&&item.children.length>0){
                      let list = [];
                      let title = (<a href="javascript:;"><i className={'icon '+item.icon}></i><span>{item.name}</span></a>);

                      item.children.map(function(it,i){
                        let blank =it.openview=="blank"?"_blank":"";
                        list.push(<Menu.Item key={i}><a target={blank} ref="child" href={'javascript:;'}>{it.name}</a></Menu.Item>)
                      });


                      return (
                        <SubMenu key={s} children={item.children} title={title}>
                          {list}
                        </SubMenu>
                      )
                    }
                    else {
                      let title = (<a target={blank} href={'javascript:;'}><i className={'icon '+item.icon}></i><span>{item.name}</span></a>);
                      return (
                        <Menu.Item key={s} >{title}</Menu.Item>
                      )

                    }
                  })
                }
              </Menu>
            </Scrollbars>
          </div>
        </SideContainer>


      </div>
    );
  }
}

export default connect(mapStateToProps(
  'expanded',
  {
    namespace: 'work',
  },
  ),
  {
    setContentSrc,
    setTabsCurrent,
  },
)(SideBarContainer);
